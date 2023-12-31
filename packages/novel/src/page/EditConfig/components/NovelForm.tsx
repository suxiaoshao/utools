import { Box, TextField, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { TotalConfig } from '../const';
import { commonStyle } from './BasicInfo';

export default function NovelForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<TotalConfig>();
  return (
    <Box sx={commonStyle.container}>
      <Typography sx={commonStyle.title} variant={'h6'}>
        小说信息
      </Typography>
      <Box sx={commonStyle.form}>
        <TextField
          required
          label="包含小说名的元素"
          {...register('novel.info.name', { required: true })}
          fullWidth
          sx={commonStyle.item}
          error={!!errors.novel?.info?.name?.message}
          helperText={errors.novel?.info?.name?.message}
        />
        <TextField
          required
          label="包含作者名的元素"
          {...register('novel.info.author', { required: true })}
          fullWidth
          sx={commonStyle.item}
          error={!!errors.novel?.info?.author?.message}
          helperText={errors.novel?.info?.author?.message}
        />
        <TextField
          required
          label="包含最后更新时间的元素"
          {...register('novel.info.lastUpdateTime', { required: true })}
          fullWidth
          sx={commonStyle.item}
          error={!!errors.novel?.info?.lastUpdateTime?.message}
          helperText={errors.novel?.info?.lastUpdateTime?.message}
        />
        <TextField
          required
          label="最新章节的 a 标签"
          {...register('novel.info.latestChapterId', { required: true })}
          fullWidth
          sx={commonStyle.item}
          error={!!errors.novel?.info?.latestChapterId?.message}
          helperText={errors.novel?.info?.latestChapterId?.message}
        />
        <TextField
          required
          label="html 页面的字符集"
          {...register('novel.info.encoding', { required: true })}
          fullWidth
          sx={commonStyle.item}
          error={!!errors.novel?.info?.encoding?.message}
          helperText={errors.novel?.info?.encoding?.message}
        />
        <TextField
          required
          label="小说图片的 ima 标签"
          {...register('novel.info.image', { required: true })}
          fullWidth
          sx={commonStyle.item}
          error={!!errors.novel?.info?.image?.message}
          helperText={errors.novel?.info?.image?.message}
        />
        <TextField
          required
          label="包含小说描述的元素"
          {...register('novel.info.desc', { required: true })}
          fullWidth
          sx={commonStyle.item}
          error={!!errors.novel?.info?.desc?.message}
          helperText={errors.novel?.info?.desc?.message}
        />
        <TextField
          required
          label="包含小说章节的 a 标签"
          {...register('novel.directory.chapterId', { required: true })}
          fullWidth
          sx={commonStyle.item}
          error={!!errors.novel?.directory?.chapterId?.message}
          helperText={errors.novel?.directory?.chapterId?.message}
        />
        <TextField
          required
          label="页面字符集"
          {...register('novel.directory.encoding', { required: true })}
          fullWidth
          sx={commonStyle.item}
          error={!!errors.novel?.directory?.encoding?.message}
          helperText={errors.novel?.directory?.encoding?.message}
        />
      </Box>
    </Box>
  );
}
