import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { writeToFile } from './utils/data/util';
import { TotalDataBuild } from './utils/data/totalData';
import init from '../data/pkg/data';
import { useConfigStore } from './app/config/configSlice';
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
    useConfigStore.getState().initConfig();
    ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  } else {
    ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  }
}

main();
