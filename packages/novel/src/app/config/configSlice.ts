import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TotalDataBuild } from '../../utils/data/totalData';
import { TotalConfig } from '../../utils/web/config/totalConfig';
import { enqueueSnackbar } from 'notify';

export interface ConfigSliceType {
  value: TotalConfig[];
}

export const configSlice = createSlice({
  name: 'config',
  initialState: {
    value: [],
  } as ConfigSliceType,
  reducers: {
    deleteByMainPageUrl: (state, action: PayloadAction<string>) => {
      const totalData = TotalDataBuild.getTotalData();
      totalData.deleteConfig(action.payload);
      state.value = totalData.getAllConfig();
    },
    addConfig: (state, action: PayloadAction<string>) => {
      const totalData = TotalDataBuild.getTotalData();
      const message = totalData.addConfig(action.payload);
      if (message) {
        enqueueSnackbar(message, {
          variant: 'error',
        });
      }
      state.value = totalData.getAllConfig();
    },
    initConfig: (state) => {
      const totalData = TotalDataBuild.getTotalData();
      state.value = totalData.getAllConfig();
    },
  },
});

export const { initConfig } = configSlice.actions;

export const SelectConfig = (state: RootState) => state.config.value;
