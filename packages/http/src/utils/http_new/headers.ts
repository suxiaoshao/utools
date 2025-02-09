import type { EditableHeader, PureHeader } from '@http/types/httpForm/common/header';
import { BodyType, type RequestForm } from '@http/types/httpForm';
import { TextType } from '@http/types/httpForm/common/text';
import type { Headers as NodeHeaders } from 'node-fetch';
import { match } from 'ts-pattern';

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
  return match(textType)
    .with(TextType.json, () => ({
      key: HeaderName.contentType,
      value: 'application/json',
    }))
    .with(TextType.xml, () => ({
      key: HeaderName.contentType,
      value: 'application/xml',
    }))
    .with(TextType.html, () => ({
      key: HeaderName.contentType,
      value: 'text/html',
    }))
    .with(TextType.plaintext, () => ({
      key: HeaderName.contentType,
      value: 'text/plain',
    }))
    .with(TextType.javascript, () => ({
      key: HeaderName.contentType,
      value: 'application/javascript',
    }))
    .with(TextType.css, () => ({
      key: HeaderName.contentType,
      value: 'text/css',
    }))
    .exhaustive();
}

function getExtraHeaderFromContentType(bodyType: BodyType, textType: TextType): PureHeader | null {
  return match(bodyType)
    .with(BodyType.formData, () => ({
      key: HeaderName.contentType,
      value: 'multipart/form-data',
    }))
    .with(BodyType.xForm, () => ({
      key: HeaderName.contentType,
      value: 'application/x-www-form-urlencoded',
    }))
    .with(BodyType.text, () => getExtraHeadersFromTextType(textType))
    .with(BodyType.none, () => null)
    .exhaustive();
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

export function getAllHeadersFromRequestForm(request: RequestForm): NodeHeaders {
  const extraHeaders = getExtraHeaders(request);
  const headers = new window.nodeFetch.Headers();
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

export function getPureHeadersFromHeaders(headers: NodeHeaders): PureHeader[] {
  const pureHeaders: PureHeader[] = [];
  headers.forEach((value, key) => {
    pureHeaders.push({ key, value });
  });
  return pureHeaders;
}
