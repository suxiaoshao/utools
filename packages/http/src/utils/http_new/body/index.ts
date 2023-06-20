import { BodyType, RequestBodyForm } from '@http/types/httpForm';
import { getSearchParams } from './xForm';
import { getFormData } from './formData';

export function getHttpBody({ bodyType, text, formData, xForm }: RequestBodyForm): BodyInit | null {
  switch (bodyType) {
    case BodyType.none:
      return null;
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
