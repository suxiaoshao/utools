import { type RequestForm, RequestTab, HttpMethod, BodyType, TextType } from '@http/types/httpForm';
import { getHttpParamsFromParams } from './params';
import { getAllHeadersFromRequestForm } from '../headers';
import { getHttpBody } from './body';
import type { Request as NodeRequest } from 'node-fetch';
import type { AbortSignal } from 'node-fetch/externals';

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
        textType: TextType.plaintext,
      },
      formData: [],
      xForm: [],
    },
    params: [],
  };
}

export function getHttpRequestFromRequestForm(requestForm: RequestForm, signal: AbortSignal): NodeRequest {
  const { method, params } = requestForm;
  // url
  const url = new URL(requestForm.url);
  url.search = getHttpParamsFromParams(params).toString();

  // headers
  const httpHeaders = getAllHeadersFromRequestForm(requestForm);

  // body
  const body = getHttpBody(requestForm.body);

  // request
  const request = new window.nodeFetch.Request(url, {
    method,
    headers: httpHeaders,
    body,
    signal: signal as AbortSignal,
  });
  return request;
}

export * from './params';
export * from './body';
