export enum TextType {
  plain = 'plain',
  json = 'json',
  html = 'html',
  xml = 'xml',
  javascript = 'javascript',
  css = 'css',
}

export interface HttpText {
  text: string;
  textType: TextType;
}
