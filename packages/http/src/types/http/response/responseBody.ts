import { Enum } from 'types';
import { HttpText } from '../text';

export type ResponseBody =
  | Enum<'text', HttpText>
  | Enum<'image', string>
  | Enum<'none'>
  | Enum<'audio', string>
  | Enum<'video', string>;
