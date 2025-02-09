import { execSql } from '../mapper/util';
import { match } from 'ts-pattern';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 数据库中的原始 cookie
 * */
export interface CookieProp {
  domain: string;
  path: string;
  name: string;
  value: string;
  createTime: number;
  maxAge: number | null;
  expires: string | null;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description cookie 数据库对象
 * */
export class CookieEntity {
  domain: string;
  path: string;
  name: string;
  value: string;
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
    domain: string,
    path: string,
    name: string,
    value: string,
    createTime: number,
    maxAge: number | null,
    expires: Date | null,
  ) {
    this.createTime = createTime;
    this.path = path;
    this.domain = domain;
    this.maxAge = maxAge;
    this.name = name;
    this.value = value;
    this.expires = expires;
  }

  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description 冲数据库中原始对象获取 cookieEntity
   * */
  public static from(cookieProp: CookieProp): CookieEntity {
    const expires = match(cookieProp.expires)
      .with(null, () => null)
      .otherwise((expires) => new Date(expires));

    return new CookieEntity(
      cookieProp.domain,
      cookieProp.path,
      cookieProp.name,
      cookieProp.value,
      cookieProp.createTime,
      cookieProp.maxAge,
      expires,
    );
  }

  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description 克隆一个一样的 cookieEntity
   * */
  public clone(): CookieEntity {
    return new CookieEntity(this.domain, this.path, this.name, this.value, this.createTime, this.maxAge, this.expires);
  }

  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description 删除数据库中和这个匹配的 cookie
   * */
  public delete(): void {
    execSql(`delete from cookie where name = '${this.name}' and domain = '${this.domain}' and path = '${this.path}'`);
  }

  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description 保存这个 cookie 到数据库
   * */
  public save(): void {
    this.delete();
    const expiresString = match(this.expires)
      .with(null, () => null)
      .otherwise((expires) => `'${expires.toISOString()}'`);

    execSql(`insert into cookie(domain, path, name, value, createTime, maxAge, expires)
            VALUES ('${this.domain}', '${this.path}', '${this.name}', '${this.value}', ${this.createTime}, ${
              this.maxAge
            }, ${expiresString});`);
  }

  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description 保存多个 cookies 到数据库
   * */
  public static saves(cookieEntities: CookieEntity[]) {
    for (const cookieEntity of cookieEntities) {
      cookieEntity.save();
    }
  }
}
