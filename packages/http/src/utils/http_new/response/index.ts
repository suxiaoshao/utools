import { ResponseTab, SuccessResponse } from '@http/types/httpForm';
import { getPureHeadersFromHeaders } from '..';
import { getResponseBodyFromResponse } from './body';

export async function getResponseFormFromHttp(
  response: Response,
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
  };
}

export * from './body';
