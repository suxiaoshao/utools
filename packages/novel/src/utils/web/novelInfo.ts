// eslint-disable namespace
import * as cheerio from 'cheerio';
import { getHtml } from './util';
import { UrlUtil } from './urlUtil';
import { RegexUtil } from './regexUtil';
import type { TotalConfig } from '@novel/page/EditConfig/const';
import type { DirectoryConfig, InfoConfig } from '@novel/types/config';
import { match, P } from 'ts-pattern';

//章节信息
export interface Chapter {
  name: string;
  chapterId: string;
}

export interface NovelData {
  /**
   * 小说名
   * */
  name: string;
  /**
   * 作者
   * */
  author: string;
  /**
   * 最后更新时间
   * */
  lastUpdateTime: string;
  /**
   * 最新章节
   * */
  latestChapter: Chapter;
  /**
   * 图片
   * */
  image: string | undefined;
  /**
   * 小说描述
   * */
  desc: string;
}

export interface NovelAllData extends NovelData {
  directories: Chapter[];
}

export class NovelInfo {
  directory: DirectoryConfig;
  info: InfoConfig;
  /**
   * url 配置
   * */
  url: UrlUtil;
  /**
   * 正则配置
   * */
  regex: RegexUtil;
  mainUrl: string;

  constructor(config: TotalConfig) {
    this.directory = config.novel.directory;
    this.info = config.novel.info;
    this.url = new UrlUtil(config.url);
    this.regex = new RegexUtil(config.regex);
    this.mainUrl = config.mainPageUrl;
  }

  /**
   * 获取信息
   * */
  public async getDirectoryAndInfo(novelId: string): Promise<NovelAllData> {
    const directoryUrl = this.url.getDirectoryUrl(novelId);
    const infoUrl = this.url.getNovelInfoUrl(novelId);
    if (infoUrl === directoryUrl) {
      const htmlString = await getHtml(directoryUrl, this.info.encoding);
      const $ = cheerio.load(htmlString, { xml: { decodeEntities: false, xmlMode: true } });
      return {
        ...this.getInfo($),
        directories: this.getDirectory($),
      };
    }
    const [infoHtml, directoryHtml] = await Promise.all([
      getHtml(infoUrl, this.info.encoding),
      getHtml(directoryUrl, this.directory.encoding),
    ]);
    return {
      ...this.getInfo(cheerio.load(infoHtml, { xml: { decodeEntities: false, xmlMode: true } })),
      directories: this.getDirectory(cheerio.load(directoryHtml, { xml: { decodeEntities: false, xmlMode: true } })),
    };
  }

  /**
   * 获取章节信息
   * */
  private getDirectory($directory: cheerio.CheerioAPI): Chapter[] {
    return Array.from($directory(this.directory.chapterId))
      .map((element) => {
        const $element = $directory(element);
        const name = $element.text();
        const chapterId = this.regex.getChapter($element.attr('href'));
        return match(chapterId)
          .with(P.nullish, () => null)
          .otherwise(() => ({ name, chapterId }));
      })
      .filter((value) => value !== null) as Chapter[];
  }

  getImgUrl($searchItem: cheerio.CheerioAPI): string | undefined {
    const imgUrl = $searchItem(this.info.image).attr('src');
    if (!imgUrl) {
      return undefined;
    }
    const url = new URL(imgUrl, this.mainUrl);
    return url.href;
  }

  /**
   * 获取小说基本信息
   * */
  private getInfo($info: cheerio.CheerioAPI): NovelData {
    const novelName = $info(this.info.name).text();
    const authorName = $info(this.info.author).text().split('：').reverse()[0];
    const lastUpdateTime = $info(this.info.lastUpdateTime).text().split('：').reverse()[0];
    const image = this.getImgUrl($info);
    const desc = $info(this.info.desc).text();
    const latestChapterName = $info(this.info.latestChapterId).text().split('：').reverse()[0];
    const lastId = this.regex.getChapter($info(this.info.latestChapterId).attr('href'));
    if (lastId === undefined) {
      throw new Error('网站解析错误');
    }
    return {
      name: novelName,
      author: authorName,
      lastUpdateTime,
      latestChapter: {
        name: latestChapterName,
        chapterId: lastId,
      },
      image,
      desc,
    };
  }
}
