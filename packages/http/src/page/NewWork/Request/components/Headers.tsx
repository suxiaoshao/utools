import { CommonStyle } from '@http/hooks/useRestyle';
import { HttpForm } from '@http/types/httpForm';
import { newHeader } from '@http/utils/http_new/header';
import { Add, Delete } from '@mui/icons-material';
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
import { useFieldArray, useFormContext } from 'react-hook-form';

export default function Headers() {
  const { control, register } = useFormContext<HttpForm>();
  const { fields, append, remove } = useFieldArray({ control, name: 'request.headers' });
  return (
    <TableContainer sx={CommonStyle.tableContainer} component={Paper}>
      <Table stickyHeader size="small" sx={CommonStyle.table}>
        {/* 表头 */}
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <IconButton
                onClick={() => {
                  append(newHeader());
                }}
              >
                <Add />
              </IconButton>
            </TableCell>
            <TableCell>key</TableCell>
            <TableCell>value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ flex: 1 }}>
          {fields.map((value, index) => (
            <TableRow key={value.id}>
              <TableCell padding="checkbox">
                <IconButton
                  onClick={() => {
                    remove(index);
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </TableCell>
              <TableCell>
                <InputBase sx={CommonStyle.tableInput} {...register(`request.headers.${index}.key`)} />
              </TableCell>
              <TableCell>
                <InputBase
                  sx={{ ...CommonStyle.tableInput, ...(false ? CommonStyle.tableInputDelete : {}) }}
                  {...register(`request.headers.${index}.value`)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
