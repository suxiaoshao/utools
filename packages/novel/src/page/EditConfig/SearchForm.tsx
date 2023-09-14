import { Box, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Config } from '.';
import { commonStyle } from './BasicInfo';

export default function SearchForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<Config>();
  return (
    <Box sx={commonStyle.form}>
      <TextField
        required
        label="每项搜索结果"
        {...register('search.li', { required: true })}
        fullWidth
        sx={commonStyle.item}
        error={!!errors.search?.li?.message}
        helperText={errors.search?.li?.message}
      />
      <TextField
        required
        label="小说链接的 a 标签"
        {...register('search.novelId', { required: true })}
        fullWidth
        sx={commonStyle.item}
        error={!!errors.mainPageUrl?.message}
        helperText={errors.mainPageUrl?.message}
      />
    </Box>
  );
}
