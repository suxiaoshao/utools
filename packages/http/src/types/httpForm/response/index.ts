import type { Enum } from 'types';
import type { ResponseBody } from './responseBody';
import type { PureHeader } from '../common';
import type { PureCookie } from '../common/cookie';
export type ResponseForm =
  | Enum<'error', string>
  | Enum<'loading', AbortController>
  | Enum<'init'>
  | Enum<'success', SuccessResponse>;

export enum ResponseTab {
  body = 'body',
  header = 'header',
  cookie = 'cookie',
}

export interface SuccessResponse {
  status: number;
  statusText: string;
  headers: PureHeader[];
  startTime: number;
  endTime: number;
  body: ResponseBody;
  tab: ResponseTab;
  cookies: PureCookie[];
}

export { type ResponseBody } from './responseBody';
