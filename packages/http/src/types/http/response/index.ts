import { Enum } from 'types';
import { Header } from '../header';
import { ResponseBody } from './responseBody';
export type HttpResponse = Enum<'error', string> | Enum<'loading'> | Enum<'init'> | Enum<'success', SuccessResponse>;

export interface SuccessResponse {
  status: number;
  statusText: string;
  headers: Header[];
  startTime: number;
  endTime: number;
  body: ResponseBody;
}
