import { HttpMethod } from '@http/types/http';
import { BodyType, HttpRequest } from '@http/types/httpForm/request';
import { TextType } from '@http/types/http/text';
import { HttpForm, TabType } from '@http/types/httpForm';
import { ResponseForm } from '@http/types/httpForm/response';

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
    bodyType: BodyType.none,
    formData: [],
    headers: [],
    text: {
      text: '',
      textType: TextType.plain,
    },
    xForm: [],
    method: HttpMethod.GET,
    url: '',
  };
}

export function newResponse(): ResponseForm {
  return {
    tag: 'init',
    data: undefined,
  };
}
