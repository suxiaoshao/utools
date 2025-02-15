import { Store } from './classStore';
import { HttpEntity, type HttpProp } from '../database/entity/http.entity';
import { TagEntity, type TagProp } from '../database/entity/tag.entity';
import { RequestEntity, type RequestProp } from '../database/entity/request.entity';
import { CookieEntity, type CookieProp } from '../database/entity/cookie.entity';
import { HttpTagEntity, type HttpTagProp } from '../database/entity/httpTag.entity';
import type { QueryExecResult } from 'sql.js';
import { readFromQueryResult } from '../database/mapper/util';
import { httpArray } from './httpArray';
import { Header } from '@http/utils/http/header';

export interface SqlData {
  https: HttpEntity[];
  tags: TagEntity[];
  requests: RequestEntity[];
  cookies: CookieEntity[];
  httpTags: HttpTagEntity[];
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 数据库数据
 * */
export class SqlStore extends Store<SqlData> {
  constructor() {
    super({
      https: [],
      tags: [],
      httpTags: [],
      requests: [],
      cookies: [],
    });
  }

  /**
   * 从 sqlWorker 中获取的数据读取
   * */
  public readData(results: QueryExecResult[]): void {
    const cookies = readFromQueryResult<CookieProp>(results.find((value) => value.columns[0] === 'domain')).map(
      (value) => CookieEntity.from(value),
    );
    const requests = readFromQueryResult<RequestProp>(results.find((value) => value.columns[0] === 'requestId')).map(
      (value) => RequestEntity.from(value),
    );
    const tags = readFromQueryResult<TagProp>(results.find((value) => value.columns[0] === 'tagId')).map((value) =>
      TagEntity.from(value),
    );
    const httpTags = readFromQueryResult<HttpTagProp>(results.find((value) => value.columns[0] === 'httpHttpId')).map(
      (value) => HttpTagEntity.from(value),
    );
    const https = readFromQueryResult<HttpProp>(results.find((value) => value.columns[0] === 'httpId')).map((value) =>
      HttpEntity.from(
        value,
        requests.find((value1) => value1.requestId === value.requestId) ??
          new RequestEntity(
            null,
            'none',
            'plaintext',
            '',
            JSON.stringify([]),
            JSON.stringify([]),
            JSON.stringify([
              new Header(
                'User-Agent',
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36 Edg/83.0.478.45',
              ),
              new Header('Accept', '*/*'),
              new Header('Accept-Encoding', 'gzip, deflate, br'),
              new Header('Connection', 'keep-alive'),
            ]),
          ),
        httpTags
          .filter((value1) => value1.httpHttpId === value.httpId)
          .map((value1) => tags.find((value2) => value1.tagTagId === value2.tagId))
          .filter((value1) => value1 !== undefined) as TagEntity[],
      ),
    );
    this.setData({
      cookies: cookies,
      https: https,
      requests: requests,
      tags: tags,
      httpTags: httpTags,
    });
    httpArray.asyncBySqlUpdate(this.getData().https);
  }

  /**
   * 根据 url 读取 cookie
   * */
  public getCookieByUrl(url: string): string {
    const match = url.split('?')[0].match(/https?:\/\/(?<domain>[^/]+)(?<path>\/.+)$/);
    const domain = match?.groups?.domain ?? '//';
    const path = match?.groups?.path ?? '/';
    return this.getData()
      .cookies.filter((value) => {
        let cookieDomain = value.domain ?? '';
        const cookiePath = value.path ?? '/';
        if (cookieDomain[0] === '.') {
          cookieDomain = cookieDomain.slice(1);
        }
        return new RegExp(`${cookieDomain}$`).test(domain) && new RegExp(`^${cookiePath}`).test(path);
      })
      .map((value) => `${value.name}=${value.value}`)
      .join('; ');
  }

  /**
   * 根据 httpId 删除 tagHttp
   * */
  public deleteHttpTagByHttpId(httpId: number): void {
    this.getData()
      .httpTags.filter((value) => value.httpHttpId === httpId)
      .forEach((value) => value.delete());
  }

  /**
   * 根据 tagId 删除 tagHttp
   * */
  public deleteHttpTagByTagId(tagId: number): void {
    this.getData()
      .httpTags.filter((value) => value.tagTagId === tagId)
      .filter((value) => value.delete());
  }
}

export const sqlStore = new SqlStore();

export const useSqlData = sqlStore.getFunc();
