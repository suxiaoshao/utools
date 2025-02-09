import { type UploadFileProps, UploadFileType } from '@http/types/httpForm';
import type FormData from 'form-data';
import { match } from 'ts-pattern';

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
  const fd = new window.NodeFormData();
  formData.forEach(({ key, text, type, file, isChecked }) => {
    if (isChecked) {
      match(type)
        .with(UploadFileType.text, () => {
          fd.append(key, text);
        })
        .with(UploadFileType.file, () => {
          if (file) {
            fd.append(key, file);
          }
        })
        .exhaustive();
    }
  });
  return fd;
}
