import { ResponseBody } from '@http/types/httpForm';
import { getTextFromResponse } from '../text';

export async function getResponseBodyFromResponse(response: Response): Promise<ResponseBody> {
  const contentType = response.headers.get('content-type');
  if (!contentType) {
    return {
      tag: 'none',
      data: undefined,
    };
  }
  switch (true) {
    case contentType.includes('text') ||
      contentType.includes('json') ||
      contentType.includes('xml') ||
      contentType.includes('html') ||
      contentType.includes('css') ||
      contentType.includes('javascript'):
      const text = await response.text();
      return { tag: 'text', data: getTextFromResponse(contentType, text) };
    case contentType.includes('image'):
      const blob = await response.blob();
      return { tag: 'image', data: URL.createObjectURL(blob) };
    case contentType.includes('audio'):
      const audioBlob = await response.blob();
      return { tag: 'audio', data: URL.createObjectURL(audioBlob) };
    case contentType.includes('video'):
      const videoBlob = await response.blob();
      return { tag: 'video', data: URL.createObjectURL(videoBlob) };
    default:
      return {
        tag: 'none',
        data: undefined,
      };
  }
}
