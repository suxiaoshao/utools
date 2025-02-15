import type { HttpMethod } from '@http/utils/http/httpManager';
import type { RequestEntity } from './request.entity';
import type { TagEntity } from './tag.entity';
import { sqlStore } from '@http/store/sqlStore';
import { execSql, execSqlAndReturn, readFromQueryResult } from '../mapper/util';
import { HttpTagEntity } from './httpTag.entity';

export interface HttpProp {
  httpId: number;
  url: string;
  name: string;
  method: HttpMethod;
  requestId: number;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 数据库中保存的 http 的抽象
 * */
export class HttpEntity {
  /**
   * 数据库中自增的 id
   * */
  httpId: number | null;
  url: string;
  /**
   * 数据库中保存的名字
   * */
  name: string;
  method: HttpMethod;
  /**
   * 数据库中和这个 http 相对应的 request 数据
   * */
  request: RequestEntity;
  /**
   * 数据库中保存的 tags
   * */
  tags: TagEntity[];

  constructor(
    httpId: number | null,
    url: string,
    name: string,
    method: HttpMethod,
    request: RequestEntity,
    tags: TagEntity[],
  ) {
    this.url = url;
    this.name = name;
    this.method = method;
    this.httpId = httpId;
    this.request = request;
    this.tags = tags;
  }

  /**
   * 从原始 http 数据获取这个 http 数据库抽象
   * */
  public static from(httpProp: HttpProp, request: RequestEntity, tags: TagEntity[]): HttpEntity {
    return new HttpEntity(httpProp.httpId, httpProp.url, httpProp.name, httpProp.method, request, tags);
  }

  /**
   * 从数据库中删除和这个 http 相关的, request,tagHttp 数据
   * */
  public delete(): void {
    sqlStore.deleteHttpTagByHttpId(this.httpId ?? -1);
    execSql(`delete from http where httpId=${this.httpId};`);
    this.request.delete();
  }

  /**
   * 从数据库中保存 http ,并保存相对应的 request, tagHttp,并更新httpId,requestId
   * */
  public async save(): Promise<void> {
    sqlStore.deleteHttpTagByHttpId(this.httpId ?? -1);
    await this.request.save();
    if (this.httpId === null) {
      const results = execSqlAndReturn(`insert into http(url, name, method, requestId)
                VALUES ('${this.url}', '${this.name}', '${this.method}', ${this.request.requestId});
          select max(httpId) AS count
          from http;`);
      if (results) {
        const [{ count }] = readFromQueryResult<{ count: number }>(results[0]);
        this.httpId = count;
      }
    } else {
      execSql(`update http
                set url='${this.url}',
                    name='${this.name}',
                    method='${this.method}',
                    requestId=${this.request.requestId}
                where httpId = ${this.httpId};`);
    }
    this.tags
      .map((value) => new HttpTagEntity(this.httpId as number, value.tagId as number))
      .forEach((value) => value.save());
  }

  /**
   * 保存多个 http
   * */
  public static saves(httpEntities: HttpEntity[]) {
    for (const httpEntity of httpEntities) {
      httpEntity.save();
    }
  }
}
