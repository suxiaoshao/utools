import { RequestParams } from '@http/types/httpForm/request';

export function newParams(): RequestParams {
  return {
    key: '',
    value: '',
    isChecked: true,
  };
}

export function getHttpParamsFromParams(params: RequestParams[]): URLSearchParams {
  const searchParams = new URLSearchParams();
  params.forEach(({ key, value, isChecked }) => {
    if (isChecked) {
      searchParams.append(key, value);
    }
  });
  return searchParams;
}
