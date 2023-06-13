import { Header } from '../../http/header';
import { HttpMethod } from '@http/types/http';
import { RequestBody } from './body';

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
}
