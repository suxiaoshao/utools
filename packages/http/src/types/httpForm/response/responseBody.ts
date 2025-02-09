import type { Enum } from 'types';
import type { HttpText } from '../common/text';

export type ResponseBody =
  | Enum<'text', HttpText>
  | Enum<'image', string>
  | Enum<'none'>
  | Enum<'audio', string>
  | Enum<'video', string>;
