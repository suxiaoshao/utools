import { CookieSameSite, type PureCookie } from '@http/types/httpForm/common/cookie';
import type { Response as NodeResponse } from 'node-fetch';
import setCookieParse, { type Cookie } from 'set-cookie-parser';
import { match } from 'ts-pattern';
export function getCookiesFromResponse(response: NodeResponse) {
  const cookies: PureCookie[] = [];
  response.headers.forEach((value, name) => {
    if (name.toLowerCase() === 'set-cookie') {
      cookies.push(...setCookieParse(value).map((cookie) => translateCookie(cookie, response)));
    }
  });
  return cookies;
}

function translateCookie(
  { name, value, domain, expires, httpOnly, maxAge, path, sameSite, secure }: Cookie,
  response: NodeResponse,
): PureCookie {
  const url = new URL(response.url);
  return {
    name,
    value,
    domain: domain ?? url.hostname,
    expires,
    httpOnly: httpOnly ?? false,
    maxAge,
    path: path ?? url.pathname,
    sameSite: getSameSite(sameSite),
    secure: secure ?? false,
  };
}

function getSameSite(sameSite?: Cookie['sameSite']): CookieSameSite {
  return match(sameSite)
    .with('lax', () => CookieSameSite.lax)
    .with('strict', () => CookieSameSite.strict)
    .with('none', () => CookieSameSite.none)
    .otherwise(() => CookieSameSite.lax);
}
