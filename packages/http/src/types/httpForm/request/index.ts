import { HttpMethod } from '../common';
import { EditableHeader } from '../common/header';
import { RequestBodyForm as RequestBodyForm } from './body';
import { RequestParams } from './params';

export enum RequestTab {
  params = 'params',
  headers = 'headers',
  body = 'body',
}

export interface RequestForm {
  url: string;
  method: HttpMethod;
  headers: EditableHeader[];
  body: RequestBodyForm;
  tab: RequestTab;
  params: RequestParams[];
}

export * from './body';
export * from './params';
