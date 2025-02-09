import { CommonStyle } from '@http/hooks/useRestyle';
import type { HttpForm } from '@http/types/httpForm';
import { getExtraHeaders, newHeader } from '@http/utils/http_new/headers';
import { Add, Delete } from '@mui/icons-material';
import {
  Checkbox,
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
import { useMemo } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

export default function Headers() {
  const { control, register } = useFormContext<HttpForm>();
  const { fields, append, remove } = useFieldArray({ control, name: 'request.headers' });
  const request = useWatch({ control, name: 'request' });
  const extraHeaders = useMemo(() => getExtraHeaders(request), [request]);
  return (
    <TableContainer sx={CommonStyle.tableContainer} component={Paper}>
      <Table stickyHeader size="small" sx={CommonStyle.table}>
        {/* 表头 */}
        <TableHead>
          <TableRow>
            <TableCell>key</TableCell>
            <TableCell>value</TableCell>
            <TableCell padding="none" width={80}>
              <IconButton
                onClick={() => {
                  append(newHeader());
                }}
              >
                <Add fontSize="small" />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ flex: 1 }}>
          {fields.map((value, index) => (
            <TableRow key={value.id}>
              <TableCell>
                <InputBase sx={CommonStyle.tableInput} {...register(`request.headers.${index}.key`)} />
              </TableCell>
              <TableCell>
                <InputBase sx={CommonStyle.tableInput} {...register(`request.headers.${index}.value`)} />
              </TableCell>
              <TableCell padding="none">
                <Checkbox size="small" defaultChecked {...register(`request.headers.${index}.isChecked`)} />
                <IconButton
                  onClick={() => {
                    remove(index);
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {extraHeaders.map((value, index) => (
            <TableRow key={`${value.key}${index}`}>
              <TableCell>{value.key}</TableCell>
              <TableCell>{value.value}</TableCell>
              <TableCell />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
