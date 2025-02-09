import React, { useContext, useEffect } from 'react';
import {
  IconButton,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Header, type OtherHeader } from '@http/utils/http/header';
import { Check, Clear } from '@mui/icons-material';
import { useTableAdd } from '@http/hooks/useTableAdd';
import UpdateTable from './updateTable';
import { useForceUpdate } from '@http/hooks/useForceUpdate';
import { RequestContext } from './RequestContext';
import { HttpContext } from '../HttpContext';
import { CommonStyle } from '@http/hooks/useRestyle';
import { match } from 'ts-pattern';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 修改 request 部分的头部
 * */
export default function ReqHeaders() {
  const { request } = useContext(RequestContext);
  const {
    httpManager: { url },
  } = useContext(HttpContext);
  /**
   * 由其他属性推断出来的头部,可被覆盖
   * */
  const [otherHeaders, setOtherHeaders] = React.useState<OtherHeader[]>([]);
  const { setKeyFlag, setValueFlag, keyRef, valueRef } = useTableAdd([request.headers.length]);
  const forceUpdate = useForceUpdate();
  /**
   * url,request 更新时更新其他头部
   * */
  useEffect(() => {
    const updateOtherHeaders = async () => {
      const value = await request.getOtherHeaders(url);
      setOtherHeaders(value);
    };

    updateOtherHeaders();
  }, [url, request]);
  return (
    <TableContainer sx={CommonStyle.tableContainer} component={Paper}>
      <Table stickyHeader size="small" sx={CommonStyle.table}>
        {/* 表头 */}
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" />
            <TableCell>key</TableCell>
            <TableCell>value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {otherHeaders.map((value) => (
            <TableRow key={value.key}>
              <TableCell padding="none">
                <IconButton disabled>
                  {match(value.isDelete)
                    .with(true, () => <Clear fontSize="small" />)
                    .with(false, () => <Check fontSize="small" />)
                    .otherwise(() => null)}
                </IconButton>
              </TableCell>
              <TableCell>
                <InputBase sx={CommonStyle.tableInput} value={value.key} />
              </TableCell>
              <TableCell>
                <InputBase
                  sx={match(value.isDelete)
                    .with(true, () => ({ ...CommonStyle.tableInput, ...CommonStyle.tableInputDelete }))
                    .otherwise(() => ({ ...CommonStyle.tableInput }))}
                  value={value.value}
                />
              </TableCell>
            </TableRow>
          ))}
          <UpdateTable mapList={request.headers} keyRef={keyRef} valueRef={valueRef} />
          <TableRow>
            <TableCell padding="checkbox" />
            <TableCell>
              <InputBase
                value=""
                placeholder="key"
                onChange={(event) => {
                  setKeyFlag();
                  request.headers.push(new Header(event.target.value, ''));
                  forceUpdate();
                }}
              />
            </TableCell>
            <TableCell>
              <InputBase
                value=""
                placeholder="value"
                onChange={(event) => {
                  setValueFlag();
                  request.headers.push(new Header('', event.target.value));
                  forceUpdate();
                }}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
