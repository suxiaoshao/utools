import { HttpForm, TabType } from '@http/types/httpForm';
import { ResponseForm } from '@http/types/httpForm/response';
import { newRequest } from './request';

export function newHttp(): HttpForm {
  return {
    name: '',
    request: newRequest(),
    response: newResponse(),
    tab: TabType.request,
  };
}

export function newResponse(): ResponseForm {
  return {
    tag: 'init',
    data: undefined,
  };
}

export * from './header';
export * from './params';
export * from './request';
export * from './body';
