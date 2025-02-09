export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  PATCH = 'PATCH',
}

export interface OptionItem {
  isChecked: boolean;
}

export { type EditableHeader, type PureHeader } from './header';
export { type HttpText, TextType } from './text';
export { type CookieSameSite, type PureCookie } from './cookie';
