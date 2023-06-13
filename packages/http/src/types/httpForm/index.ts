import { HttpRequest } from './request';
import { ResponseForm } from './response';

export enum TabType {
  request = 'request',
  response = 'response',
}
export interface HttpForm {
  name: string;
  tab: TabType;
  request: HttpRequest;
  response: ResponseForm;
}

export * from './request';
export * from './response';
