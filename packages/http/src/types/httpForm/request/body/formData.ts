import { OptionItem } from '../../common';

export enum UploadFileType {
  file = 'file',
  text = 'text',
}
export interface UploadFileProps extends OptionItem {
  file: File | null;
  key: string;
  type: UploadFileType;
  text: string;
}
