import { Box, TextField, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { TotalConfig } from '../const';
import { commonStyle } from './BasicInfo';

export default function ChapterForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<TotalConfig>();
  return (
    <Box sx={commonStyle.container}>
      <Typography sx={commonStyle.title} variant={'h6'}>
        章节信息
      </Typography>
      <Box sx={commonStyle.form}>
        <TextField
          required
          label="页面字符集"
          {...register('content.encoding', { required: true })}
          fullWidth
          sx={commonStyle.item}
          error={!!errors.content?.encoding?.message}
          helperText={errors.content?.encoding?.message}
        />

        <TextField
          required
          label="包含章节名的元素"
          {...register('content.chapterName', { required: true })}
          fullWidth
          sx={commonStyle.item}
          error={!!errors.content?.chapterName?.message}
          helperText={errors.content?.chapterName?.message}
        />

        <TextField
          required
          label="包含小说名的元素"
          {...register('content.novelName', { required: true })}
          fullWidth
          sx={commonStyle.item}
          error={!!errors.content?.novelName?.message}
          helperText={errors.content?.novelName?.message}
        />

        <TextField
          required
          label="上一章的 a 标签"
          {...register('content.preChapterId', { required: true })}
          fullWidth
          sx={commonStyle.item}
          error={!!errors.content?.preChapterId?.message}
          helperText={errors.content?.preChapterId?.message}
        />

        <TextField
          required
          label="下一章的 a 标签"
          {...register('content.nextChapterId', { required: true })}
          fullWidth
          sx={commonStyle.item}
          error={!!errors.content?.nextChapterId?.message}
          helperText={errors.content?.nextChapterId?.message}
        />

        <TextField
          required
          label="章节内容"
          {...register('content.content', { required: true })}
          fullWidth
          sx={commonStyle.item}
          error={!!errors.content?.content?.message}
          helperText={errors.content?.content?.message}
        />

        <TextField
          label="分割章节内容的字符串"
          {...register('content.contentSplit')}
          fullWidth
          sx={commonStyle.item}
          error={!!errors.content?.contentSplit?.message}
          helperText={errors.content?.contentSplit?.message}
        />
      </Box>
    </Box>
  );
}
