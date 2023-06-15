import CustomSelector, { ItemListProp } from '@http/components/CustomSelector';
import FileUpload from '@http/components/FileUpload';
import { CommonStyle } from '@http/hooks/useRestyle';
import { HttpForm, UploadFileType } from '@http/types/httpForm';
import { newFormData } from '@http/utils/http_new';
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
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
const typeItems: ItemListProp<UploadFileType>[] = [
  {
    text: UploadFileType.text,
    value: UploadFileType.text,
  },
  {
    text: UploadFileType.file,
    value: UploadFileType.file,
  },
];

export default function FormData() {
  const { control, register } = useFormContext<HttpForm>();
  const { fields, append, remove } = useFieldArray({ control, name: 'request.body.formData' });
  return (
    <TableContainer sx={{ width: '100%', height: '100%' }} component={Paper}>
      <Table stickyHeader size="small" sx={CommonStyle.table}>
        {/* 表头 */}
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <IconButton
                onClick={() => {
                  append(newFormData());
                }}
              >
                <Add />
              </IconButton>
            </TableCell>
            <TableCell>key</TableCell>
            <TableCell>value</TableCell>
            <TableCell>select</TableCell>
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
                <InputBase sx={CommonStyle.tableInput} {...register(`request.body.formData.${index}.key`)} />
              </TableCell>
              <Controller
                control={control}
                name={`request.body.formData.${index}.type`}
                render={({ field }) => (
                  <>
                    <TableCell>
                      {field.value === UploadFileType.file ? (
                        <Controller
                          control={control}
                          name={`request.body.formData.${index}.file`}
                          render={({ field }) => <FileUpload {...field} />}
                        />
                      ) : (
                        <InputBase sx={CommonStyle.tableInput} {...register(`request.body.formData.${index}.text`)} />
                      )}
                    </TableCell>
                    <TableCell>
                      <CustomSelector<UploadFileType>
                        variant="contained"
                        color="primary"
                        {...field}
                        itemList={typeItems}
                      />
                    </TableCell>
                  </>
                )}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
