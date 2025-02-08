import { TextType } from '@http/types/httpForm';
import { match } from 'ts-pattern';

export function getTextFromResponse(contentType: string, text: string) {
  return match(contentType)
    .when(
      (ct) => ct.includes('json'),
      () => ({ textType: TextType.json, text }),
    )
    .when(
      (ct) => ct.includes('html'),
      () => ({ textType: TextType.html, text }),
    )
    .when(
      (ct) => ct.includes('xml'),
      () => ({ textType: TextType.xml, text }),
    )
    .when(
      (ct) => ct.includes('css'),
      () => ({ textType: TextType.css, text }),
    )
    .when(
      (ct) => ct.includes('javascript'),
      () => ({ textType: TextType.javascript, text }),
    )
    .otherwise(() => ({ textType: TextType.plaintext, text }));
}

export function verifyTextTypeByContentType(contentType: string): boolean {
  return (
    contentType.includes('text') ||
    contentType.includes('json') ||
    contentType.includes('xml') ||
    contentType.includes('html') ||
    contentType.includes('css') ||
    contentType.includes('javascript')
  );
}
