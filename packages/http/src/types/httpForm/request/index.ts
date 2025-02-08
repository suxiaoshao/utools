/*
 * @Author: suxiaoshao 48886207+suxiaoshao@users.noreply.github.com
 * @Date: 2025-02-06 19:31:40
 * @LastEditors: suxiaoshao 48886207+suxiaoshao@users.noreply.github.com
 * @LastEditTime: 2025-02-08 01:42:48
 * @FilePath: /utools/packages/http/src/types/httpForm/request/index.ts
 */
import type { HttpMethod } from '../common';
import type { EditableHeader } from '../common/header';
import type { RequestBodyForm } from './body';
import type { RequestParams } from './params';

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

export { type RequestBodyForm, BodyType, type XForm, type UploadFileProps, UploadFileType } from './body';
export { type RequestParams } from './params';
