import { HttpText } from '@http/types/http/text';
import { Enum } from 'types';

export type ResponseBody =
  | Enum<'text', HttpText>
  | Enum<'image', string>
  | Enum<'none'>
  | Enum<'audio', string>
  | Enum<'video', string>;
