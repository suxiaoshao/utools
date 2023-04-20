import { sqlStore } from '../../store/sqlStore';
import { getDataFile } from '../../utils/update/localPath';
import sqlInit, { Database } from 'sql.js';

export let database: Database | undefined = undefined;

export async function initDatabase() {
  const sqlWasm = new URL('sql.js/dist/sql-wasm.wasm', import.meta.url);
  const unit = new Uint8Array(window.nodeFs.readFileSync(getDataFile()));
  const sql = await sqlInit({
    locateFile: () => sqlWasm.href,
  });
  database = new sql.Database(unit);
  initDatabaseTable();
  updateByCookieTimeoutAndSession();
  updateData();
  saveToFile();
}

export function saveToFile() {
  const data = database?.export();
  if (data) {
    window.nodeFs.writeFileSync(getDataFile(), data);
  }
}

export function initDatabaseTable(): void {
  const sql = `create table if not exists cookie
               (
                   domain     text,
                   path       text,
                   name       text,
                   value      text    not null,
                   createTime integer not null,
                   maxAge     integer,
                   expires    datetime,
                   primary key (domain, path, name)
               );
  create table if not exists request
  (
      requestId  integer primary key autoincrement,
      bodyChoose varchar(50) not null,
      textChoose varchar(50) not null,
      \`text\`   text        not null,
      dataForms  text        not null,
      xForms     text        not null,
      headers    text        not null
  );

  create table if not exists http
  (
      httpId    integer primary key autoincrement,
      url       text    not null,
      name      text    not null,
      method    text    not null,
      requestId integer not null,
      foreign key (requestId) references request (requestId)
  );
  create table if not exists tag
  (
      tagId   integer primary key autoincrement,
      tagName text not null
  );
  create table if not exists httpTag
  (
      httpHttpId integer,
      tagTagId   integer,
      primary key (httpHttpId, tagTagId),
      foreign key (httpHttpId) references http (httpId),
      foreign key (tagTagId) references tag (tagId)
  );`;
  database?.exec(sql);
}

export function updateByCookieTimeoutAndSession(): void {
  database?.exec(`delete 
       from cookie
       where (maxAge IS NOT NULL and (maxAge * 1000 + cookie.createTime) < ${Date.now()})
          or (expires is not null and expires < '${new Date(
            Date.now(),
          ).toISOString()}' and maxAge is null ) or(maxAge is null and expires is null);`);
}

export function updateByCookieTimeout(): void {
  database?.exec(`delete 
       from cookie
       where (maxAge IS NOT NULL and (maxAge * 1000 + cookie.createTime) < ${Date.now()})
          or (expires is not null and expires < '${new Date(Date.now()).toISOString()}' and maxAge is null );`);
}

export function updateData(): void {
  database?.exec(`delete 
       from cookie
       where (maxAge IS NOT NULL and (maxAge * 1000 + cookie.createTime) < ${Date.now()})
          or (expires is not null and expires < '${new Date(Date.now()).toISOString()}' and maxAge is null );`);
  const results = database?.exec(`
      select domain, path, name, value, createTime, maxAge, expires
      from cookie;
      select httpId, url, name, method, requestId
      from http;
      select requestId, bodyChoose, textChoose, text, dataForms, xForms, headers
      from request;
      select tagId, tagName
      from tag;
      select httpHttpId, tagTagId
      from httpTag;`);
  if (results) {
    sqlStore.readData(results);
  }
}
