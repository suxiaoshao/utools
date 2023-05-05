import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { writeToFile } from './utils/data/util';
import { configStore } from './store/config.store';
import { TotalDataBuild, TotalDataProp } from './utils/data/totalData';
import init from '../data/pkg/data';
async function main() {
  if (window.utools) {
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
    totalData.addOnChangeFunc((data: TotalDataProp) => {
      configStore.setData(data.totalConfig);
    });
    // 初始化配置
    configStore.setData(totalData.getAllConfig());
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
