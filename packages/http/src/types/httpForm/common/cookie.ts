export interface PureCookie {
  name: string;
  value: string;
  domain: string;
  expires?: Date;
  httpOnly: boolean;
  maxAge?: number;
  path: string;
  sameSite: CookieSameSite;
  secure: boolean;
}

export enum CookieSameSite {
  lax = 'lax',
  strict = 'strict',
  none = 'none',
}
