import React, { MutableRefObject } from 'react';
import { IconButton, InputBase, TableCell, TableRow } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useForceUpdate } from '@http/hooks/useForceUpdate';
import { CommonStyle } from '@http/hooks/useRestyle';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 添加数据的表格的数据部分
 * */
export default function UpdateTable(props: {
  /**
   * 键值对数据列表
   * */
  mapList: { value: string; key: string }[];
  /**
   * 最后一个 key input 的引用
   * */
  keyRef: MutableRefObject<HTMLInputElement | null>;
  /**
   * 最后一个 value input 的引用
   * */
  valueRef: MutableRefObject<HTMLInputElement | null>;
}): JSX.Element {
  const forceUpdate = useForceUpdate();
  return (
    <>
      {props.mapList.map((value, index) => (
        <TableRow key={index}>
          <TableCell padding="none">
            <IconButton
              onClick={() => {
                props.mapList.splice(index, 1);
                forceUpdate();
              }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </TableCell>
          <TableCell>
            <InputBase
              sx={CommonStyle.tableInput}
              placeholder="key"
              value={value.key}
              inputRef={index === props.mapList.length - 1 ? props.keyRef : undefined}
              onChange={(event) => {
                value.key = event.target.value;
                forceUpdate();
              }}
            />
          </TableCell>
          <TableCell>
            <InputBase
              sx={CommonStyle.tableInput}
              placeholder="value"
              value={value.value}
              inputRef={index === props.mapList.length - 1 ? props.valueRef : undefined}
              onChange={(event) => {
                value.value = event.target.value;
                forceUpdate();
              }}
            />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
