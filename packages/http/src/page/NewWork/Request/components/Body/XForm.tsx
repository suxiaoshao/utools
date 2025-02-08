import { CommonStyle } from '@http/hooks/useRestyle';
import type { HttpForm } from '@http/types/httpForm';
import { newXForm } from '@http/utils/http_new';
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

export default function XForm() {
  const { control, register } = useFormContext<HttpForm>();
  const { fields, append, remove } = useFieldArray({ control, name: 'request.body.xForm' });
  return (
    <TableContainer sx={{ width: '100%', height: '100%' }} component={Paper}>
      <Table stickyHeader size="small" sx={CommonStyle.table}>
        {/* 表头 */}
        <TableHead>
          <TableRow>
            <TableCell>key</TableCell>
            <TableCell>value</TableCell>
            <TableCell padding="none" width={80}>
              <IconButton
                onClick={() => {
                  append(newXForm());
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
                <InputBase sx={CommonStyle.tableInput} {...register(`request.body.xForm.${index}.key`)} />
              </TableCell>
              <TableCell>
                <InputBase sx={CommonStyle.tableInput} {...register(`request.body.xForm.${index}.value`)} />
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
        </TableBody>
      </Table>
    </TableContainer>
  );
}
