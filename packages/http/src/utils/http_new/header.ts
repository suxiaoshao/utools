import { Header } from '@http/types/http/header';

export function newHeader(): Header {
  return {
    key: '',
    value: '',
  };
}
