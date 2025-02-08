/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2024-01-06 01:37:31
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2024-03-08 20:50:05
 * @FilePath: /self-tools/Users/sushao/Documents/code/utools/packages/http/src/app/features/tabsSlice.ts
 */
import { create } from 'zustand';
import { newHttp } from '@http/utils/http_new';
import type { HttpForm } from '@http/types/httpForm';

export interface TabsSliceType {
  tabs: HttpForm[];
  activeTab: number;
}

export const colorSchemaMatch = window.matchMedia('(prefers-color-scheme: dark)');

export const useTabsStore = create<
  TabsSliceType & {
    addTab: () => void;
    deleteTab: (index: number) => void;
    updateActiveTab: (index: number) => void;
    addFromHttpManager: (http: HttpForm) => void;
    editHttp: (index: number, http: HttpForm) => void;
  }
>((set) => ({
  tabs: [newHttp()],
  activeTab: 0,
  addTab: () =>
    set((state) => {
      const newTabs = [...state.tabs, newHttp()];
      return { tabs: newTabs, activeTab: newTabs.length - 1 };
    }),
  deleteTab: (index) =>
    set((state) => {
      const newTabs = state.tabs.slice();
      newTabs.splice(index, 1);
      return { tabs: newTabs, activeTab: Math.min(newTabs.length - 1, state.activeTab) };
    }),
  updateActiveTab: (index) => set({ activeTab: index }),
  addFromHttpManager: (http) =>
    set((state) => {
      const newTabs = [...state.tabs, http];
      return { tabs: newTabs, activeTab: newTabs.length - 1 };
    }),
  editHttp: (index, http) =>
    set((state) => {
      const newTabs = state.tabs.slice();
      if (index < newTabs.length && index >= 0) {
        newTabs[index] = http;
      }
      return { tabs: newTabs };
    }),
}));

export const selectTabs = (data: TabsSliceType) => data.tabs;
export const SelectActiveTab = (data: TabsSliceType) => data.tabs[data.activeTab];
export const selectIndex = (data: TabsSliceType) => data.activeTab;
export const selectTabCanDelete = (data: TabsSliceType) => data.tabs.length > 1;
