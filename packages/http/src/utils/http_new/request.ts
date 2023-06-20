import { RequestForm, RequestTab, HttpMethod, BodyType, TextType } from '@http/types/httpForm';
import { getHttpParamsFromParams } from './params';
import { getHeadersFromRequestForm } from './header';
import { getHttpBody } from './body';

export function newRequest(): RequestForm {
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

export function getHttpRequestFromRequestForm(requestForm: RequestForm): Request {
  const { method, params } = requestForm;
  // url
  const url = new URL(requestForm.url);
  url.search = getHttpParamsFromParams(params).toString();

  // headers
  const httpHeaders = getHeadersFromRequestForm(requestForm);

  // body
  const body = getHttpBody(requestForm.body);

  // request
  const request = new Request(url, { method, headers: httpHeaders, body });
  return request;
}
