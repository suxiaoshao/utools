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

export * from './header';
export * from './text';
export * from './cookie';
