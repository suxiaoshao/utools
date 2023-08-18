import { UploadFileProps, UploadFileType } from '@http/types/httpForm';
import type FormData from 'form-data';

export function newFormData(): UploadFileProps {
  return {
    key: '',
    text: '',
    type: UploadFileType.text,
    file: null,
    isChecked: true,
  };
}

export function getFormData(formData: UploadFileProps[]): FormData {
  const fd = new window.nodeFormData();
  formData.forEach(({ key, text, type, file, isChecked }) => {
    if (isChecked) {
      switch (type) {
        case UploadFileType.text:
          fd.append(key, text);
          break;
        case UploadFileType.file:
          if (file) {
            fd.append(key, file);
          }
          break;
      }
    }
  });
  return fd;
}
