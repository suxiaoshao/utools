import { HttpForm, TabType } from '@http/types/httpForm';
import { ResponseForm } from '@http/types/httpForm/response';
import { newRequest } from './request';
import { getResponseFormFromHttp } from './response';

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

export async function fetchHttp(request: Request): Promise<ResponseForm> {
  try {
    const startTime = Date.now();
    const response = await fetch(request);
    const endTime = Date.now();
    return {
      tag: 'success',
      data: await getResponseFormFromHttp(response, startTime, endTime),
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        tag: 'error',
        data: err.message,
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
