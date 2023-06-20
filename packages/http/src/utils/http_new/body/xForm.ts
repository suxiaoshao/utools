import { XForm } from '@http/types/httpForm';

export function newXForm(): XForm {
  return {
    key: '',
    value: '',
    isChecked: true,
  };
}

export function getSearchParams(xForm: XForm[]): URLSearchParams {
  const searchParams = new URLSearchParams();
  xForm.forEach(({ key, value, isChecked }) => {
    if (isChecked) {
      searchParams.append(key, value);
    }
  });
  return searchParams;
}
