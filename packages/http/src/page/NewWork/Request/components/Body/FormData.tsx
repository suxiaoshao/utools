import CustomSelector, { type ItemListProp } from '@http/components/CustomSelector';
import FileUpload from '@http/components/FileUpload';
import { CommonStyle } from '@http/hooks/useRestyle';
import { type HttpForm, UploadFileType } from '@http/types/httpForm';
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
  Checkbox,
} from '@mui/material';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import { match } from 'ts-pattern';
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
            <TableCell>key</TableCell>
            <TableCell>value</TableCell>
            <TableCell>select</TableCell>
            <TableCell padding="none" width={80}>
              <IconButton
                onClick={() => {
                  append(newFormData());
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
                <InputBase sx={CommonStyle.tableInput} {...register(`request.body.formData.${index}.key`)} />
              </TableCell>
              <Controller
                control={control}
                name={`request.body.formData.${index}.type`}
                render={({ field }) => (
                  <>
                    <TableCell>
                      {match(field.value)
                        .with(UploadFileType.file, () => (
                          <Controller
                            control={control}
                            name={`request.body.formData.${index}.file`}
                            render={({ field }) => <FileUpload {...field} />}
                          />
                        ))
                        .otherwise(() => (
                          <InputBase sx={CommonStyle.tableInput} {...register(`request.body.formData.${index}.text`)} />
                        ))}
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
              <TableCell padding="none">
                <Checkbox size="small" defaultChecked {...register(`request.body.formData.${index}.isChecked`)} />
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
