import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'fontsource-roboto';
import init from '../data/pkg';
import { writeToFile } from './utils/data/util';
import { configStore } from './store/config.store';
import { TotalDataBuild, TotalDataProp } from './utils/data/totalData';
import { settingStore } from './store/setting.store';
import { redirect } from 'react-router-dom';
async function main() {
  if (window.utools) {
    utools.onPluginEnter((params) => {
      if (params.code === 'bookshelf') {
        redirect('/bookshelf');
      }
    });
    /**
     * 插件退出时
     * */
    utools.onPluginOut(() => {
      const totalData = TotalDataBuild.getTotalData();
      writeToFile(totalData.toData());
    });
    await init();
    const totalData = TotalDataBuild.getTotalData();
    writeToFile(totalData.toData());
    totalData.addOnchangeFunc((data: TotalDataProp) => {
      configStore.setData(data.totalConfig);
      settingStore.setData(data.setting);
    });
    // 初始化配置
    configStore.setData(totalData.getAllConfig());
    settingStore.setData(totalData.getSetting());
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  } else {
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  }
}

main();
