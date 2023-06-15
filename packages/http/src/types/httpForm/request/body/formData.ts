export enum UploadFileType {
  file = 'file',
  text = 'text',
}
export interface UploadFileProps {
  file: File | null;
  key: string;
  type: UploadFileType;
  text: string;
}
