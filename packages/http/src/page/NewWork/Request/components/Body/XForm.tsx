import { CommonStyle } from '@http/hooks/useRestyle';
import { HttpForm } from '@http/types/httpForm';
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
            <TableCell padding="checkbox">
              <IconButton
                onClick={() => {
                  append(newXForm());
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
                <InputBase sx={CommonStyle.tableInput} {...register(`request.body.xForm.${index}.key`)} />
              </TableCell>
              <TableCell>
                <InputBase
                  sx={{ ...CommonStyle.tableInput, ...(false ? CommonStyle.tableInputDelete : {}) }}
                  {...register(`request.body.xForm.${index}.value`)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
