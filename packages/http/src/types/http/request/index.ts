import { UploadFileProps } from './formData';
import { Header } from '../header';
import { HttpText } from '../text';
import { XForm } from './xForm';

export enum BodyType {
  none = 'none',
  text = 'text',
  data = 'data',
  xForm = 'x-www-form-urlencoded',
  formData = 'formData',
}

export interface HttpRequest {
  bodyType: BodyType;
  text: HttpText;
  formData: UploadFileProps[];
  xForm: XForm[];
  headers: Header[];
}
