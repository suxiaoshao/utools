import { BodyType, type RequestBodyForm } from '@http/types/httpForm';
import { getSearchParams } from './xForm';
import { getFormData } from './formData';
import type { BodyInit as NodeBodyInit } from 'node-fetch';
import { match } from 'ts-pattern';

export function getHttpBody({ bodyType, text, formData, xForm }: RequestBodyForm): NodeBodyInit | undefined {
  return match(bodyType)
    .with(BodyType.none, () => undefined)
    .with(BodyType.text, () => text.text)
    .with(BodyType.xForm, () => getSearchParams(xForm))
    .with(BodyType.formData, () => getFormData(formData))
    .exhaustive();
}

export * from './formData';
export * from './xForm';
