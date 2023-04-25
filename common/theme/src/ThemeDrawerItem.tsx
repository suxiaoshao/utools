import { Palette } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ThemeSliceType, updateColor, useAppDispatch, useAppSelector } from './themeSlice';
import { string, object } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export default function ThemeDrawerItem() {
  // 控制 dialog
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  type FormData = Pick<ThemeSliceType, 'colorSetting' | 'color'>;
  const theme = useAppSelector((state) => state.theme);
  const t = useI18n();
  const createColorSchema = object({
    color: string()
      .required(t('cannot_empty'))
      .matches(/^#[0-9a-fA-F]{6}$/, t('color_format_error')),
    colorSetting: string().required(t('cannot_empty')).equals(['light', 'dark', 'system']),
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: theme,
    resolver: yupResolver(createColorSchema),
  });
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<FormData> = async ({ color, colorSetting }) => {
    await dispatch(updateColor({ colorSetting, color }));
    handleClose();
  };

  return (
    <>
      <ListItemButton onClick={() => setOpen(true)}>
        <ListItemIcon>
          <Palette />
        </ListItemIcon>
        <ListItemText>{t('theme_setting')}</ListItemText>
      </ListItemButton>
      <Dialog PaperProps={{ sx: { maxWidth: 700 } }} open={open} onClose={handleClose}>
        <Box sx={{ width: 500 }} onSubmit={handleSubmit(onSubmit)} component="form">
          <DialogTitle>{t('theme_setting')}</DialogTitle>
          <DialogContent>
            <FormControl error={errors.colorSetting && true}>
              <FormLabel id="color-setting">{t('select_mode')}</FormLabel>
              <Controller
                name="colorSetting"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <RadioGroup
                    row
                    aria-labelledby="color-setting"
                    {...field}
                    onChange={(event, newValue) => {
                      field.onChange(newValue);
                    }}
                  >
                    <FormControlLabel value="light" control={<Radio />} label={t('light')} />
                    <FormControlLabel value="dark" control={<Radio />} label={t('dark')} />
                    <FormControlLabel value="system" control={<Radio />} label={t('system')} />
                  </RadioGroup>
                )}
              />

              <FormHelperText id="color-setting">{errors.colorSetting?.message}</FormHelperText>
            </FormControl>
            <TextField
              error={errors.color && true}
              helperText={errors.color?.message}
              label={t('theme_color')}
              variant="standard"
              fullWidth
              {...register('color', { required: true })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>{t('cancel')}</Button>
            <Button type="submit">{t('submit')}</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
function useI18n() {
  return (key: string) => key;
}
