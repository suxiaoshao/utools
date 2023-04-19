import { QueryExecResult } from 'sql.js';
import { database, saveToFile, updateByCookieTimeout, updateData } from './sql.main';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 将 QueryResults 转化为对象列表
 * */
export function readFromQueryResult<T>(queryResult: QueryExecResult | undefined): T[] {
  return (
    queryResult?.values?.map((value) => {
      const result: T = {} as T;
      value.forEach((value1, index) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        result[queryResult.columns[index]] = value1 ?? null;
      });
      return result;
    }) ?? []
  );
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 发送 sql 语句给 sqlWorker运行,无返回值
 * */
export function execSql(sql: string): void {
  database?.exec(sql);
  updateByCookieTimeout();
  updateData();
  saveToFile();
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 发送 sql 语句给 sqlWorker运行,返回数据
 * */
export async function execSqlAndReturn(sql: string): Promise<QueryExecResult[] | undefined> {
  const results = database?.exec(sql);
  updateByCookieTimeout();
  updateData();
  saveToFile();
  return results;
}
