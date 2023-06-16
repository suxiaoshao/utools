import { HttpRequest, RequestTab } from '@http/types/httpForm/request';
import { HttpForm, TabType } from '@http/types/httpForm';
import { ResponseForm } from '@http/types/httpForm/response';
import { BodyType } from '@http/types/httpForm/request/body';
import { HttpMethod } from '@http/types/httpForm/common';
import { TextType } from '@http/types/httpForm/common/text';

export function newHttp(): HttpForm {
  return {
    name: '',
    request: newRequest(),
    response: newResponse(),
    tab: TabType.request,
  };
}

export function newRequest(): HttpRequest {
  return {
    headers: [],
    tab: RequestTab.params,
    method: HttpMethod.GET,
    url: '',
    body: {
      bodyType: BodyType.none,
      text: {
        text: '',
        textType: TextType.plain,
      },
      formData: [],
      xForm: [],
    },
    params: [],
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
export * from './xForm';
export * from './formData';
