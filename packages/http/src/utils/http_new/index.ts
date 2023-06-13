import { HttpMethod } from '@http/types/http';
import { HttpRequest, RequestTab } from '@http/types/httpForm/request';
import { TextType } from '@http/types/http/text';
import { HttpForm, TabType } from '@http/types/httpForm';
import { ResponseForm } from '@http/types/httpForm/response';
import { BodyType } from '@http/types/httpForm/request/body';

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
  };
}

export function newResponse(): ResponseForm {
  return {
    tag: 'init',
    data: undefined,
  };
}
