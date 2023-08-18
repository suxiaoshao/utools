import { ResponseBody } from '@http/types/httpForm';
import { getTextFromResponse, verifyTextTypeByContentType } from '../text';
import type { Response as NodeResponse } from 'node-fetch';

export async function getResponseBodyFromResponse(response: NodeResponse): Promise<ResponseBody> {
  const contentType = response.headers.get('content-type');
  if (!contentType) {
    return {
      tag: 'none',
      data: undefined,
    };
  }
  switch (true) {
    case verifyTextTypeByContentType(contentType):
      const text = await response.text();
      return { tag: 'text', data: getTextFromResponse(contentType, text) };
    case contentType.includes('image'):
      const buffer = await response.arrayBuffer();
      const blob = new Blob([buffer]);
      return { tag: 'image', data: URL.createObjectURL(blob) };
    case contentType.includes('audio'):
      const audioBuffer = await response.arrayBuffer();
      const audioBlob = new Blob([audioBuffer]);
      return { tag: 'audio', data: URL.createObjectURL(audioBlob) };
    case contentType.includes('video'):
      const videoBuffer = await response.arrayBuffer();
      const videoBlob = new Blob([videoBuffer]);
      return { tag: 'video', data: URL.createObjectURL(videoBlob) };
    default:
      return {
        tag: 'none',
        data: undefined,
      };
  }
}
