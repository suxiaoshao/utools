import { BodyType, RequestBodyForm } from '@http/types/httpForm';
import { getSearchParams } from './xForm';
import { getFormData } from './formData';
import type { BodyInit as NodeBodyInit } from 'node-fetch';

export function getHttpBody({ bodyType, text, formData, xForm }: RequestBodyForm): NodeBodyInit | undefined {
  switch (bodyType) {
    case BodyType.none:
      return undefined;
    case BodyType.text:
      return text.text;
    case BodyType.xForm:
      return getSearchParams(xForm);
    case BodyType.formData:
      return getFormData(formData);
  }
}

export * from './formData';
export * from './xForm';
