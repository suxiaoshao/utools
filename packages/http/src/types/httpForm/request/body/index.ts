import { HttpText } from '@http/types/http/text';
import { UploadFileProps } from './formData';
import { XForm } from './xForm';

export enum BodyType {
  none = 'none',
  text = 'text',
  xForm = 'x-www-form-urlencoded',
  formData = 'formData',
}

export interface RequestBody {
  bodyType: BodyType;
  text: HttpText;
  formData: UploadFileProps[];
  xForm: XForm[];
}

export * from './formData';
export * from './xForm';
