import { create } from 'zustand';
import { TotalDataBuild } from '@novel/utils/data/totalData';
import { enqueueSnackbar } from 'notify';
import type { TotalConfig } from '@novel/page/EditConfig/const';

interface ConfigState {
  value: TotalConfig[];
  deleteByMainPageUrl: (url: string) => void;
  addConfig: (config: string) => void;
  initConfig: () => void;
}

export const useConfigStore = create<ConfigState>((set) => ({
  value: [],
  deleteByMainPageUrl: (url: string) => {
    const totalData = TotalDataBuild.getTotalData();
    totalData.deleteConfig(url);
    set({ value: totalData.getAllConfig() });
  },
  addConfig: (config: string) => {
    const totalData = TotalDataBuild.getTotalData();
    const message = totalData.addConfig(config);
    if (message) {
      enqueueSnackbar(message, {
        variant: 'error',
      });
    }
    set({ value: totalData.getAllConfig() });
  },
  initConfig: () => {
    const totalData = TotalDataBuild.getTotalData();
    set({ value: totalData.getAllConfig() });
  },
}));
