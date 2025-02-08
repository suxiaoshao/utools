import type { HttpText } from '../../common/text';
import type { UploadFileProps } from './formData';
import type { XForm } from './xForm';

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

export { type UploadFileProps, UploadFileType } from './formData';
export { type XForm } from './xForm';
