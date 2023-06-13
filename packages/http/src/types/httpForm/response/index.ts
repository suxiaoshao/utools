import { Enum } from 'types';
import { ResponseBody } from './responseBody';
import { Header } from '@http/utils/http/header';
export type ResponseForm = Enum<'error', string> | Enum<'loading'> | Enum<'init'> | Enum<'success', SuccessResponse>;

export interface SuccessResponse {
  status: number;
  statusText: string;
  headers: Header[];
  startTime: number;
  endTime: number;
  body: ResponseBody;
}

export * from './responseBody';
