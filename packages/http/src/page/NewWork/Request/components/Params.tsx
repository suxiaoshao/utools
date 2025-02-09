import { CommonStyle } from '@http/hooks/useRestyle';
import type { HttpForm } from '@http/types/httpForm';
import { newParams } from '@http/utils/http_new';
import { Add, Delete } from '@mui/icons-material';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  TableBody,
  InputBase,
  Checkbox,
} from '@mui/material';
import { useFormContext, useFieldArray } from 'react-hook-form';

export default function Params() {
  const { control, register } = useFormContext<HttpForm>();
  const { fields, append, remove } = useFieldArray({ control, name: 'request.params' });
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
                  append(newParams());
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
                <InputBase sx={CommonStyle.tableInput} {...register(`request.params.${index}.key`)} />
              </TableCell>
              <TableCell>
                <InputBase sx={CommonStyle.tableInput} {...register(`request.params.${index}.value`)} />
              </TableCell>
              <TableCell padding="none">
                <Checkbox size="small" defaultChecked {...register(`request.params.${index}.isChecked`)} />
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
        </TableBody>
      </Table>
    </TableContainer>
  );
}
