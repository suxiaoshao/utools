import { CommonStyle } from '@http/hooks/useRestyle';
import { PureHeader } from '@http/types/httpForm';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

export interface HeadersProps {
  headers: PureHeader[];
}

export default function Headers({ headers }: HeadersProps) {
  return (
    <TableContainer sx={CommonStyle.tableContainer} component={Paper}>
      <Table stickyHeader size="small" sx={CommonStyle.table}>
        {/* 表头 */}
        <TableHead>
          <TableRow>
            <TableCell>key</TableCell>
            <TableCell>value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ flex: 1 }}>
          {headers.map(({ key, value }, index) => (
            <TableRow key={index}>
              <TableCell>{key}</TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
