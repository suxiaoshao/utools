import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ResponseContext } from './ResponseContext';
import { CommonStyle } from '@http/hooks/useRestyle';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 显示 response 的 cookies 的数据表格
 * */
export default function ResCookie() {
  const { response } = React.useContext(ResponseContext);
  return (
    <TableContainer sx={CommonStyle.tableContainer} component={Paper}>
      <Table sx={CommonStyle.table}>
        <TableHead>
          <TableRow>
            <TableCell>name</TableCell>
            <TableCell>value</TableCell>
            <TableCell>domain</TableCell>
            <TableCell>path</TableCell>
            <TableCell>expires</TableCell>
            <TableCell>max-age</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {response.getCookies().map((value, index) => (
            <TableRow key={`${value.name}${index}`}>
              <TableCell>{value.name}</TableCell>
              <TableCell>{value.value}</TableCell>
              <TableCell>{value.domain}</TableCell>
              <TableCell>{value.path}</TableCell>
              <TableCell>{value.expires?.toUTCString() ?? 'session'}</TableCell>
              <TableCell>{value.maxAge ?? 'session'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
