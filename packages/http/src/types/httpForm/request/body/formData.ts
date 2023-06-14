export enum UploadFileType {
  file = 'file',
  text = 'text',
}
export interface UploadFileProps {
  path: string | null;
  key: string;
  type: UploadFileType;
  text: string;
}
