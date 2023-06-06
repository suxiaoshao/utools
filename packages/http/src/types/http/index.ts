import { HttpRequest } from './request';

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  PATCH = 'PATCH',
}

export interface Http {
  url: string;
  name: string;
  method: HttpMethod;
  request: HttpRequest;
}
