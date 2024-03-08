/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2024-01-06 01:37:31
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2024-03-08 20:50:05
 * @FilePath: /self-tools/Users/sushao/Documents/code/utools/packages/http/src/app/features/tabsSlice.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { newHttp } from '@http/utils/http_new';
import { HttpForm } from '@http/types/httpForm';

export type TabsSliceType = {
  tabs: HttpForm[];
  activeTab: number;
};

export const colorSchemaMatch = window.matchMedia('(prefers-color-scheme: dark)');

function getInitDate(): TabsSliceType {
  return {
    tabs: [newHttp()],
    activeTab: 0,
  };
}

export const tabsSlice = createSlice({
  name: 'tabs',
  initialState: getInitDate(),
  reducers: {
    addTab(state) {
      state.tabs.push(newHttp());
      state.activeTab = state.tabs.length - 1;
    },
    deleteTab(state, action: PayloadAction<number>) {
      state.tabs.splice(action.payload, 1);
      state.activeTab = Math.min(state.tabs.length - 1, state.activeTab);
    },
    updateActiveTab(state, action: PayloadAction<number>) {
      state.activeTab = action.payload;
    },
    addFromHttpManager(state, action: PayloadAction<HttpForm>) {
      state.tabs.push(action.payload);
      state.activeTab = state.tabs.length - 1;
    },
    editHttp(state, action: PayloadAction<{ index: number; http: HttpForm }>) {
      if (action.payload.index < state.tabs.length && action.payload.index >= 0) {
        state.tabs[action.payload.index] = action.payload.http;
      }
    },
  },
  selectors: {
    SelectIndex: (state) => state.activeTab,
    SelectActiveTab: (state) => state.tabs[state.activeTab],
    SelectTabs: (state) => state.tabs,
    SelectTabCanDelete: (state) => state.tabs.length > 1,
  },
});
export const { addFromHttpManager, addTab, deleteTab, updateActiveTab, editHttp } = tabsSlice.actions;

export const { SelectActiveTab, SelectIndex, SelectTabCanDelete, SelectTabs } = tabsSlice.selectors;
