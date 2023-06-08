import { Http, HttpMethod } from '@http/types/http';
import { BodyType, HttpRequest } from '@http/types/http/request';
import { HttpResponse } from '@http/types/http/response';
import { TextType } from '@http/types/http/text';

export function newHttp(): Http {
  return {
    url: '',
    name: '',
    method: HttpMethod.GET,
    request: newRequest(),
    response: newResponse(),
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
  };
}

export function newResponse(): HttpResponse {
  return {
    tag: 'init',
    data: undefined,
  };
}
