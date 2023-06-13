import { Header } from '../../http/header';
import { HttpMethod } from '@http/types/http';
import { RequestBody } from './body';
import { RequestParams } from './params';

export enum RequestTab {
  params = 'params',
  headers = 'headers',
  body = 'body',
}

export interface HttpRequest {
  url: string;
  method: HttpMethod;
  headers: Header[];
  body: RequestBody;
  tab: RequestTab;
  params: RequestParams[];
}

export * from './body';
export * from './params';
