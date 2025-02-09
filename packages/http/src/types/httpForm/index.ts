import type { RequestForm } from './request';
import type { ResponseForm } from './response';

export enum TabType {
  request = 'request',
  response = 'response',
}
export interface HttpForm {
  name: string;
  tab: TabType;
  request: RequestForm;
  response: ResponseForm;
}

export * from './request';
export * from './response';
export * from './common';
