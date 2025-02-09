import { type HttpForm, TabType } from '@http/types/httpForm';
import type { ResponseForm } from '@http/types/httpForm/response';
import { newRequest } from './request';
import { getResponseFormFromHttp } from './response';
import type { Request as NodeRequest } from 'node-fetch';

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

export async function fetchHttp(request: NodeRequest): Promise<ResponseForm> {
  try {
    const startTime = Date.now();
    const response = await window.nodeFetch.default(request);
    const endTime = Date.now();
    return {
      tag: 'success',
      data: await getResponseFormFromHttp(response, startTime, endTime),
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        tag: 'error',
        data: error.message,
      };
    }
    return {
      tag: 'error',
      data: 'Unknown error',
    };
  }
}

export * from './headers';
export * from './request';
export * from './cookies';
