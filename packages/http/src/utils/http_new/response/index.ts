import { ResponseTab, type SuccessResponse } from '@http/types/httpForm';
import { getResponseBodyFromResponse } from './body';
import type { Response as NodeResponse } from 'node-fetch';
import { getPureHeadersFromHeaders } from '../headers';
import { getCookiesFromResponse } from '../cookies';

export async function getResponseFormFromHttp(
  response: NodeResponse,
  startTime: number,
  endTime: number,
): Promise<SuccessResponse> {
  return {
    status: response.status,
    statusText: response.statusText,
    headers: getPureHeadersFromHeaders(response.headers),
    startTime,
    endTime,
    body: await getResponseBodyFromResponse(response),
    tab: ResponseTab.body,
    cookies: getCookiesFromResponse(response),
  };
}

export * from './body';
