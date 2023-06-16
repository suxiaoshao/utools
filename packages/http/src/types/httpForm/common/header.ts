import { OptionItem } from '.';

export interface PureHeader {
  key: string;
  value: string;
}

export type EditableHeader = OptionItem & PureHeader;
