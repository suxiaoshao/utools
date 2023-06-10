import { UploadFileProps } from './formData';
import { Header } from '../../http/header';
import { HttpText } from '../../http/text';
import { XForm } from './xForm';
import { HttpMethod } from '@http/types/http';

export enum BodyType {
  none = 'none',
  text = 'text',
  data = 'data',
  xForm = 'x-www-form-urlencoded',
  formData = 'formData',
}

export interface HttpRequest {
  url: string;
  method: HttpMethod;
  bodyType: BodyType;
  text: HttpText;
  formData: UploadFileProps[];
  xForm: XForm[];
  headers: Header[];
}
