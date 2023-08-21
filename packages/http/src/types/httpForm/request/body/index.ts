import { HttpText } from '../../common/text';
import { UploadFileProps } from './formData';
import { XForm } from './xForm';

export enum BodyType {
  none = 'none',
  text = 'text',
  xForm = 'x-www-form-urlencoded',
  formData = 'formData',
}

export interface RequestBodyForm {
  bodyType: BodyType;
  text: HttpText;
  formData: UploadFileProps[];
  xForm: XForm[];
}

export * from './formData';
export * from './xForm';
