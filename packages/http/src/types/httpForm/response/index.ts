import { Enum } from 'types';
import { ResponseBody } from './responseBody';
import { PureHeader } from '../common';
import { PureCookie } from '../common/cookie';
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

export * from './responseBody';
