import { HttpResponse } from '@http/utils/http/httpResponse';
import { HttpRequest } from '../httpForm/request';

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
  isRequest: boolean;
}
