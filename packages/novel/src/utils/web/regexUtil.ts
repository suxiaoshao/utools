/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2023-08-21 17:58:09
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2023-11-10 19:00:19
 * @FilePath: /tauri/Users/weijie.su/Documents/code/self/utools/packages/novel/src/utils/web/regexUtil.ts
 */
import type { RegexConfig } from '@novel/types/config';
export class RegexUtil {
  private config: RegexConfig;

  public constructor(config: RegexConfig) {
    this.config = config;
  }

  /**
   * 获取 novelId
   * */
  public getNovelId(url: string | undefined): string | undefined {
    return url?.match(this.config.novel)?.groups?.[this.config.novelIdPlaceholder];
  }

  /**
   * 获取 chapterId
   * */
  public getChapter(url: string | undefined): string | undefined {
    return url?.match(this.config.chapter)?.groups?.[this.config.chapterIdPlaceholder];
  }
}
