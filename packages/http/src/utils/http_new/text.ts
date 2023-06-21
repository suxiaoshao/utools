import { HttpText, TextType } from '@http/types/httpForm';

export function getTextFromResponse(contentType: string, text: string): HttpText {
  switch (true) {
    case contentType.includes('json'):
      return {
        textType: TextType.json,
        text,
      };
    case contentType.includes('html'):
      return {
        textType: TextType.html,
        text,
      };
    case contentType.includes('xml'):
      return {
        textType: TextType.xml,
        text,
      };
    case contentType.includes('css'):
      return {
        textType: TextType.css,
        text,
      };
    case contentType.includes('javascript'):
      return {
        textType: TextType.javascript,
        text,
      };
    default:
      return {
        textType: TextType.plain,
        text,
      };
  }
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
