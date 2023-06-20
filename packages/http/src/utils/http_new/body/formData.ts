import { UploadFileProps, UploadFileType } from '@http/types/httpForm';

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
  const fd = new FormData();
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
