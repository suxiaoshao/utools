import { InsertDriveFile } from '@mui/icons-material';
import { Box, Chip, ChipProps } from '@mui/material';

export interface FileUploadProps extends Omit<ChipProps, 'value' | 'onChange'> {
  value?: File | undefined | null;
  onChange?: (value: File | null) => void;
}

export default function FileUpload({ value, onChange, ...props }: FileUploadProps): JSX.Element {
  if (value) {
    return (
      <Chip
        icon={<InsertDriveFile />}
        size="small"
        label={value.name}
        onDelete={() => {
          onChange?.(null);
        }}
        color="primary"
        {...props}
      />
    );
  }
  return (
    <>
      <label htmlFor="contained-button-file">
        <Chip size="small" label="选择文件" icon={<InsertDriveFile />} {...props} />
      </label>
      <Box
        onChange={(e) => {
          onChange?.(e.target.files?.[0] ?? null);
        }}
        value={value ?? undefined}
        component="input"
        sx={{ display: 'none' }}
        id="contained-button-file"
        type="file"
      />
    </>
  );
}
