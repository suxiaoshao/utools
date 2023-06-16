import { HttpMethod } from '../common';
import { EditableHeader } from '../common/header';
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
  headers: EditableHeader[];
  body: RequestBody;
  tab: RequestTab;
  params: RequestParams[];
}

export * from './body';
export * from './params';
