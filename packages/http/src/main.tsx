import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { checkVersion } from './utils/update/notify';
import 'fontsource-roboto';
import { SqlInitMessage } from './database/mapper/sql.interface';
import { getDataFile } from './utils/update/localPath';
import { sqlWorker } from './database/mapper/sql.main';
import sqlInit from 'sql.js';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
if (window.utools === undefined) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root'),
  );
} else {
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
  init();
}

async function init() {
  const sqlWasm = new URL('sql.js/dist/sql-wasm.wasm', import.meta.url);
  const unit = new Uint8Array(window.nodeFs.readFileSync(getDataFile()));
  const sql = await sqlInit({
    locateFile: () => sqlWasm.href,
  });
  const db = new sql.Database(unit);
  console.log(db.exec('select * from sqlite_master;'));
}
