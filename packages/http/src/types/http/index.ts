import { HttpRequest } from './request';
import { HttpResponse } from './response';

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
  response: HttpResponse;
}
