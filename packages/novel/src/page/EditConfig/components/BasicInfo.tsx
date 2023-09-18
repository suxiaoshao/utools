import { Box, SxProps, TextField, Theme } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Config } from '../const';

export const commonStyle: Record<'form' | 'item', SxProps<Theme>> = {
  form: {
    p: 1,
    overflowY: 'auto',
    flex: '1 1 0',
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
      <TextField
        required
        label="小说搜索的链接"
        {...register('url.search', { required: true })}
        fullWidth
        sx={commonStyle.item}
        error={!!errors.url?.search?.message}
        helperText={errors.url?.search?.message}
      />

      <TextField
        required
        label="小说页面的链接"
        {...register('url.novelInfo', { required: true })}
        fullWidth
        sx={commonStyle.item}
        error={!!errors.url?.novelInfo?.message}
        helperText={errors.url?.novelInfo?.message}
      />

      <TextField
        required
        label="目录页面的链接"
        {...register('url.directory', { required: true })}
        fullWidth
        sx={commonStyle.item}
        error={!!errors.url?.directory?.message}
        helperText={errors.url?.directory?.message}
      />

      <TextField
        required
        label="小说章节的链接"
        {...register('url.chapter', { required: true })}
        fullWidth
        sx={commonStyle.item}
        error={!!errors.url?.chapter?.message}
        helperText={errors.url?.chapter?.message}
      />

      <TextField
        required
        label="搜索关键字占位符"
        {...register('url.searchPlaceholder', { required: true })}
        fullWidth
        sx={commonStyle.item}
        error={!!errors.url?.searchPlaceholder?.message}
        helperText={errors.url?.searchPlaceholder?.message}
      />

      <TextField
        required
        label="小说 id 的占位符"
        {...register('url.novelPlaceholder', { required: true })}
        fullWidth
        sx={commonStyle.item}
        error={!!errors.url?.novelPlaceholder?.message}
        helperText={errors.url?.novelPlaceholder?.message}
      />

      <TextField
        required
        label="章节 id 的占位符"
        {...register('url.chapterPlaceholder', { required: true })}
        fullWidth
        sx={commonStyle.item}
        error={!!errors.url?.chapterPlaceholder?.message}
        helperText={errors.url?.chapterPlaceholder?.message}
      />
      <TextField
        required
        label="从小说链接获取小说 id 的正则表达式"
        {...register('regex.novel', { required: true })}
        fullWidth
        sx={commonStyle.item}
        error={!!errors.regex?.novel?.message}
        helperText={errors.regex?.novel?.message}
      />

      <TextField
        required
        label="小说 id 的分组占位符"
        {...register('regex.novelIdPlaceholder', { required: true })}
        fullWidth
        sx={commonStyle.item}
        error={!!errors.regex?.novelIdPlaceholder?.message}
        helperText={errors.regex?.novelIdPlaceholder?.message}
      />

      <TextField
        required
        label="章节 id 的分组占位符"
        {...register('regex.chapterIdPlaceholder', { required: true })}
        fullWidth
        sx={commonStyle.item}
        error={!!errors.regex?.chapterIdPlaceholder?.message}
        helperText={errors.regex?.chapterIdPlaceholder?.message}
      />

      <TextField
        required
        label="从章节链接获取章节 id 的正则表达式"
        {...register('regex.chapter', { required: true })}
        fullWidth
        sx={commonStyle.item}
        error={!!errors.regex?.chapter?.message}
        helperText={errors.regex?.chapter?.message}
      />
    </Box>
  );
}
