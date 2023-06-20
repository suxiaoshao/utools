import { EditableHeader, PureHeader } from '@http/types/httpForm/common/header';
import { BodyType, RequestForm } from '@http/types/httpForm';
import { TextType } from '@http/types/httpForm/common/text';

export enum HeaderName {
  contentType = 'Content-Type',
}

export function newHeader(): EditableHeader {
  return {
    key: '',
    value: '',
    isChecked: true,
  };
}

function getExtraHeadersFromTextType(textType: TextType): PureHeader {
  switch (textType) {
    case TextType.json:
      return {
        key: HeaderName.contentType,
        value: 'application/json',
      };
    case TextType.xml:
      return {
        key: HeaderName.contentType,
        value: 'application/xml',
      };
    case TextType.html:
      return {
        key: HeaderName.contentType,
        value: 'text/html',
      };
    case TextType.plain:
      return {
        key: HeaderName.contentType,
        value: 'text/plain',
      };
    case TextType.javascript:
      return {
        key: HeaderName.contentType,
        value: 'application/javascript',
      };
    case TextType.css:
      return {
        key: HeaderName.contentType,
        value: 'text/css',
      };
  }
}

function getExtraHeaderFromContentType(bodyType: BodyType, textType: TextType): PureHeader | null {
  switch (bodyType) {
    case BodyType.formData:
      return {
        key: HeaderName.contentType,
        value: 'multipart/form-data',
      };
    case BodyType.xForm:
      return {
        key: HeaderName.contentType,
        value: 'application/x-www-form-urlencoded',
      };
    case BodyType.text:
      return getExtraHeadersFromTextType(textType);
    case BodyType.none:
      return null;
  }
}

function headersHas(key: string, headers: PureHeader[]): boolean {
  return headers.some((header) => header.key.toLowerCase() === key.toLowerCase());
}

export function getExtraHeaders({
  body: {
    bodyType,
    text: { textType },
  },
  headers,
}: RequestForm): PureHeader[] {
  const extraHeaders: PureHeader[] = [];
  const contentTypeHeader = getExtraHeaderFromContentType(bodyType, textType);
  if (contentTypeHeader && !headersHas(contentTypeHeader.key, headers)) {
    extraHeaders.push(contentTypeHeader);
  }
  return extraHeaders;
}

export function getHeadersFromRequestForm(request: RequestForm): Headers {
  const extraHeaders = getExtraHeaders(request);
  const headers = new Headers();
  request.headers.forEach((header) => {
    if (header.isChecked) {
      headers.append(header.key, header.value);
    }
  });
  extraHeaders.forEach((header) => {
    headers.append(header.key, header.value);
  });
  return headers;
}
