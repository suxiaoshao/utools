import { Box, TextField, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Config } from '../const';
import { commonStyle } from './BasicInfo';

export default function SearchForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<Config>();
  return (
    <Box sx={commonStyle.container}>
      <Typography sx={commonStyle.title} variant={'h6'}>
        搜索信息
      </Typography>
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
        <TextField
          required
          label="包含作者名的元素"
          {...register('search.authorName', { required: true })}
          fullWidth
          sx={commonStyle.item}
          error={!!errors.search?.authorName?.message}
          helperText={errors.search?.authorName?.message}
        />
        <TextField
          required
          label="最后章节链接的 a 标签"
          {...register('search.latestChapterId', { required: true })}
          fullWidth
          sx={commonStyle.item}
          error={!!errors.search?.latestChapterId?.message}
          helperText={errors.search?.latestChapterId?.message}
        />
        <TextField
          required
          label="包含最后更新时间的元素"
          {...register('search.updateTime', { required: true })}
          fullWidth
          sx={commonStyle.item}
          error={!!errors.search?.updateTime?.message}
          helperText={errors.search?.updateTime?.message}
        />
        <TextField
          required
          label="小说图片的 img 标签"
          {...register('search.image', { required: true })}
          fullWidth
          sx={commonStyle.item}
          error={!!errors.search?.image?.message}
          helperText={errors.search?.image?.message}
        />
        <TextField
          required
          label="包含小说类型的元素"
          {...register('search.label', { required: true })}
          fullWidth
          sx={commonStyle.item}
          error={!!errors.search?.label?.message}
          helperText={errors.search?.label?.message}
        />
        <TextField
          required
          label="包含小说描述的元素"
          {...register('search.desc', { required: true })}
          fullWidth
          sx={commonStyle.item}
          error={!!errors.search?.desc?.message}
          helperText={errors.search?.desc?.message}
        />
        <TextField
          required
          label="这个页面的字符集"
          {...register('search.encoding', { required: true })}
          fullWidth
          sx={commonStyle.item}
          error={!!errors.search?.encoding?.message}
          helperText={errors.search?.encoding?.message}
        />
      </Box>
    </Box>
  );
}
