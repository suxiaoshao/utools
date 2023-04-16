import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { checkVersion } from './utils/update/notify';
import 'fontsource-roboto';
import { SqlInitMessage } from './database/mapper/sql.interface';
import { getDataFile } from './utils/update/localPath';
import { sqlWorker } from './database/mapper/sql.main';

if (window.utools === undefined) {
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

  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description 进入插件时应该做的事: 1. 检查插件版本 2. 初始化数据库
   * */
  checkVersion();
  const message: SqlInitMessage = {
    code: 1,
    date: window.nodeFs.readFileSync(getDataFile()),
  };
  sqlWorker.postMessage(message);
}
