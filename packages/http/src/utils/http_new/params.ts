import { RequestParams } from '@http/types/httpForm/request';

export function newParams(): RequestParams {
  return {
    key: '',
    value: '',
  };
}
