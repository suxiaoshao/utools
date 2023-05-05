import { Store } from './store';
import { TotalDataBuild } from '../utils/data/totalData';

export type FontSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface SettingConfig {
  fontSize: FontSize;
}

export class SettingStore extends Store<SettingConfig> {
  constructor() {
    super({
      fontSize: 1,
    });
  }

  /**
   * 更新字体
   * */
  public updateFontSize(fontSize: FontSize): void {
    const newSetting = { ...this.data, fontSize };
    const totalData = TotalDataBuild.getTotalData();
    totalData.updateSetting(newSetting);
  }
}

/**
 * 设置
 * */
export const settingStore = new SettingStore();

/**
 * 获取 font-size
 * */
export const useFontSize = settingStore.getComputeFunc(
  (data) => data.fontSize,
  (fontSize) => {
    settingStore.updateFontSize(fontSize);
  },
);
