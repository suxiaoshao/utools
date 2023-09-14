import { Box, SxProps, TextField, Theme } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Config } from '.';

export const commonStyle: Record<'form' | 'item', SxProps<Theme>> = {
  form: {
    p: 1,
  },
  item: {
    mt: 2,
  },
};

export default function BasicInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext<Config>();
  return (
    <Box sx={commonStyle.form}>
      <TextField
        required
        label="名字"
        {...register('name', { required: true })}
        fullWidth
        sx={commonStyle.item}
        error={!!errors.name?.message}
        helperText={errors.name?.message}
      />
      <TextField
        required
        label="主页链接"
        {...register('mainPageUrl', { required: true })}
        fullWidth
        sx={commonStyle.item}
        error={!!errors.mainPageUrl?.message}
        helperText={errors.mainPageUrl?.message}
      />
    </Box>
  );
}
