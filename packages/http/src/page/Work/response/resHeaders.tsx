import React from 'react';
import { InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ResponseContext } from './response';
import { CommonStyle } from '../../../hooks/useRestyle';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 显示头部表格
 * */
export default function ResHeaders(): JSX.Element {
  const {
    response: { headers },
  } = React.useContext(ResponseContext);
  return (
    <TableContainer sx={CommonStyle.tableContainer} component={Paper}>
      <Table sx={CommonStyle.table} size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" />
            <TableCell>key</TableCell>
            <TableCell>value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {headers.map((value, index) => (
            <TableRow key={index}>
              <TableCell padding="checkbox" />
              <TableCell>
                <InputBase sx={CommonStyle.tableInput} value={value.key} />
              </TableCell>
              <TableCell>
                <InputBase sx={CommonStyle.tableInput} value={value.value} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
