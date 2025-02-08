import type { ResponseBody } from '@http/types/httpForm';
import { getTextFromResponse, verifyTextTypeByContentType } from '../text';
import type { Response as NodeResponse } from 'node-fetch';
import { match, P } from 'ts-pattern';

export async function getResponseBodyFromResponse(response: NodeResponse): Promise<ResponseBody> {
  const contentType = response.headers.get('content-type');
  return await match(contentType)
    .with(P.nullish, () => ({ tag: 'none', data: undefined }) as ResponseBody)
    .when(
      (contentType) => verifyTextTypeByContentType(contentType),
      async (contentType) => {
        const text = await response.text();
        return { tag: 'text', data: getTextFromResponse(contentType, text) } as ResponseBody;
      },
    )
    .when(
      (contentType) => contentType.includes('image'),
      async () => {
        const buffer = await response.arrayBuffer();
        const blob = new Blob([buffer]);
        return { tag: 'image', data: URL.createObjectURL(blob) } as ResponseBody;
      },
    )
    .when(
      (contentType) => contentType.includes('audio'),
      async () => {
        const audioBuffer = await response.arrayBuffer();
        const audioBlob = new Blob([audioBuffer]);
        return { tag: 'audio', data: URL.createObjectURL(audioBlob) } as ResponseBody;
      },
    )
    .when(
      (contentType) => contentType.includes('video'),
      async () => {
        const videoBuffer = await response.arrayBuffer();
        const videoBlob = new Blob([videoBuffer]);
        return { tag: 'video', data: URL.createObjectURL(videoBlob) } as ResponseBody;
      },
    )
    .otherwise(
      () =>
        ({
          tag: 'none',
          data: undefined,
        }) as ResponseBody,
    );
}
