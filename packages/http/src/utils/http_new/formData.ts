import { UploadFileProps, UploadFileType } from '@http/types/httpForm';

export function newFormData(): UploadFileProps {
  return {
    key: '',
    text: '',
    type: UploadFileType.text,
    path: null,
  };
}
