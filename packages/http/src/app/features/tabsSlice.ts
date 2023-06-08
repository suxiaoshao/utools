import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Http } from '@http/types/http';
import { newHttp } from '@http/utils/http_new';

export type TabsSliceType = {
  tabs: Http[];
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
      state.activeTab = Math.max(state.tabs.length - 1, state.activeTab);
    },
    updateActiveTab(state, action: PayloadAction<number>) {
      state.activeTab = action.payload;
    },
    addFromHttpManager(state, action: PayloadAction<Http>) {
      state.tabs.push(action.payload);
      state.activeTab = state.tabs.length - 1;
    },
  },
});
export const { addFromHttpManager, addTab, deleteTab, updateActiveTab } = tabsSlice.actions;

export const SelectIndex = (state: RootState) => state.tabs.activeTab;
export const SelectActiveTab = (state: RootState) => state.tabs.tabs[state.tabs.activeTab];
export const SelectTabs = (state: RootState) => state.tabs.tabs;
