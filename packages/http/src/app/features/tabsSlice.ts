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
      state.tabs[action.payload.index] = action.payload.http;
    },
  },
});
export const { addFromHttpManager, addTab, deleteTab, updateActiveTab, editHttp } = tabsSlice.actions;

export const SelectIndex = (state: RootState) => state.tabs.activeTab;
export const SelectActiveTab = (state: RootState) => state.tabs.tabs[state.tabs.activeTab];
export const SelectTabs = (state: RootState) => state.tabs.tabs;
export const SelectTabCanDelete = (state: RootState) => state.tabs.tabs.length > 1;
