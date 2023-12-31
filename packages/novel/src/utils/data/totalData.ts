/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2023-08-21 18:17:36
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2023-11-10 18:39:53
 * @FilePath: /tauri/Users/weijie.su/Documents/code/self/utools/packages/novel/src/utils/data/totalData.ts
 */
import { Chapter } from '../web/novelInfo';
import { getBuffer } from './util';
import { TotalData } from '../../../data/pkg';
import { TotalConfig } from '@novel/page/EditConfig/const';

export class TotalDataBuild {
  private static totalData?: TotalData;

  public static getTotalData(): TotalData {
    if (this.totalData !== undefined) {
      return this.totalData;
    } else {
      this.totalData = TotalData.load(getBuffer());
      return this.totalData;
    }
  }
}

export interface TotalDataProp {
  totalConfig: TotalConfig[];
  readRecord: ReadRecord[];
}

export interface ReadRecord {
  author: string;
  name: string;
  chapter: Chapter;
  mainPageUrl: string;
  novelId: string;
  /**
   * 图片
   * */
  image: string | null;
  /**
   * 小说描述
   * */
  desc: string;
}
