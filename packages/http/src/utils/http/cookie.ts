import { CookieEntity } from '@http/database/entity/cookie.entity';
import { match } from 'ts-pattern';

export class Cookie {
  name: string;
  value: string;
  domain: string;
  path: string;
  /**
   * cookie 创建时间
   * */
  createTime: number;
  /**
   * 此项为 null 时说明没有定义
   * */
  maxAge: number | null;
  /**
   * 此项为 null 说明没定义
   * */
  expires: Date | null;

  constructor(
    name: string,
    value: string,
    domain: string,
    path: string,
    createTime: number,
    maxAge: number | null,
    expires: Date | null,
  ) {
    this.createTime = createTime;
    this.expires = expires;
    this.domain = domain;
    this.value = value;
    this.name = name;
    this.maxAge = maxAge;
    this.path = path;
  }

  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description 从 set-cookie 的 http 头部和 url ,createTime 来创造一个新的 cookie
   * */
  static getNewCookies(setCookieContent: string, url: string, createTime: number): Cookie {
    const cookieKV = setCookieContent
      .split(/; ?/)
      .map((value) => {
        const match = value.match(/^(?<name>[^=]+)=(?<value>[^=]+)$/);
        return {
          value: match?.groups?.value,
          name: match?.groups?.name,
        };
      })
      .filter((value) => value.value !== undefined && value.name !== undefined) as { value: string; name: string }[];
    const matchData = url.split('?')[0].match(/https?:\/\/(?<domain>[^/]+)(?<path>\/.+)$/);
    let domain: string = matchData?.groups?.domain ?? '';
    let maxAge: number | null = null;
    let path: string = matchData?.groups?.path ?? '/';
    let expires: null | Date = null;
    const value = cookieKV[0].value;
    const name = cookieKV[0].name;

    cookieKV.forEach((value1) => {
      match(value1.name)
        .with('Expires', 'expires', () => {
          expires = new Date(Date.parse(value1.value));
        })
        .with('Max-Age', 'max-age', () => {
          maxAge = Number.parseInt(value1.value, 10);
        })
        .with('Domain', 'domain', () => {
          domain = value1.value;
        })
        .with('Path', 'path', () => {
          path = value1.value;
        });
    });
    return new Cookie(name, value, domain, path, createTime, maxAge, expires);
  }

  static fromCookieEntity(cookieEntity: CookieEntity): Cookie {
    return new Cookie(
      cookieEntity.name,
      cookieEntity.value,
      cookieEntity.domain,
      cookieEntity.path,
      cookieEntity.createTime,
      cookieEntity.maxAge,
      cookieEntity.expires,
    );
  }

  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description 获取 cookie 数据库抽象数据
   * */
  public getCookieEntity(): CookieEntity {
    return new CookieEntity(this.domain, this.path, this.name, this.value, this.createTime, this.maxAge, this.expires);
  }

  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description 克隆一个新的 cookie 对象
   * */
  public clone(): Cookie {
    return new Cookie(this.name, this.value, this.domain, this.path, this.createTime, this.maxAge, this.expires);
  }

  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description 验证 cookie 是否合法
   * */
  public check(): boolean {
    return this.domain !== '' && this.name !== '' && this.path.match(/^\//) !== null && this.value !== '';
  }
}
