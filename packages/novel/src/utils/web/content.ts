/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2023-08-21 17:58:09
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2023-11-10 18:49:11
 * @FilePath: /tauri/Users/weijie.su/Documents/code/self/utools/packages/novel/src/utils/web/content.ts
 */
import { getHtml } from './util';
import * as cheerio from 'cheerio';
import { UrlUtil } from './urlUtil';
import { RegexUtil } from './regexUtil';
import { TotalConfig } from '@novel/page/EditConfig/const';
import { ContentConfig } from '@novel/types/config';

/**
 * 文章内容数据
 * */
export interface ContentData {
  novelName: string;
  chapterName: string;
  contentList: string[];
  preChapterId: string | undefined;
  nextChapterId: string | undefined;
}

/**
 * @author sushao
 * @since 0.4.0
 * @version 0.4.0
 * @description 章节内容类,用于读取配置
 * */
export class Content {
  /**
   * 搜索配置
   * */
  config: ContentConfig;
  /**
   * url 配置
   * */
  url: UrlUtil;
  /**
   * 正则配置
   * */
  regex: RegexUtil;

  constructor(config: TotalConfig) {
    this.config = config.content;
    this.url = new UrlUtil(config.url);
    this.regex = new RegexUtil(config.regex);
  }

  /**
   * 获取文章
   * */
  async getContent(novelId: string, chapterId: string): Promise<ContentData> {
    const url = this.url.getChapterUrl(novelId, chapterId);
    const htmlString = await getHtml(url, this.config.encoding);
    const $content = cheerio.load(htmlString, { decodeEntities: false, xmlMode: true });
    const chapterName = $content(this.config.chapterName).text();
    const novelName = $content(this.config.novelName).text();
    const preChapterId = this.regex.getChapter($content(this.config.preChapterId).attr('href'));
    const nextChapterId = this.regex.getChapter($content(this.config.nextChapterId).attr('href'));
    const contentList = this.config.contentSplit
      ? $content(this.config.content)
          .text()
          .split(this.config.contentSplit)
          .filter((value) => value !== '')
      : Array.from($content(this.config.content)).map((element) => $content(element).text());
    return {
      contentList,
      chapterName,
      preChapterId,
      nextChapterId,
      novelName,
    };
  }
}
