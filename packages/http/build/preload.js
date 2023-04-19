const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js/dist/sql-wasm.js');

window.nodeFs = fs;

window.nodePath = path;

window.nodeDirname = __dirname;

// const filebuffer = fs.readFileSync('/Users/weijie.su/Library/Application Support/uTools/database/http/http.db');

// initSqlJs().then(function (SQL) {
//   // Load the db
//   const db = new SQL.Database(filebuffer);
//   console.log('db', db);
//   window.db = db;
// });

// window.sql = initSqlJs;
