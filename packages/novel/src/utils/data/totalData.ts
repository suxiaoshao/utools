import { Chapter } from '../web/novelInfo';
import { getBuffer } from './util';
import { SettingConfig } from '../../store/setting.store';
import { TotalConfig } from '../web/config/totalConfig';
import { TotalData } from '../../../data/pkg/data';

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
  setting: SettingConfig;
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
