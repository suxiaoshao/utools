import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { Style } from '@mui/icons-material';
import { orange } from '@mui/material/colors';
import { useAppDispatch, useAppSelector } from '@novel/app/hooks';
import { ColorSetting, updateColor, updateColorSetting } from 'theme/src/themeSlice';

export const settingSx = {
  green: {
    color: '#fff',
    backgroundColor: orange[800],
  },
  card: {
    margin: 2,
  },
  form: {
    width: '100%',
  },
};

export default function ThemeEdit(): JSX.Element {
  const dispatch = useAppDispatch();
  const color = useAppSelector((state) => state.theme.color);
  const colorMode = useAppSelector((state) => state.theme.colorSetting);

  return (
    <Card sx={settingSx.card}>
      <CardHeader
        avatar={
          <Avatar sx={settingSx.green}>
            <Style />
          </Avatar>
        }
        title={'主题设置'}
      />
      <CardContent>
        <FormControl component="fieldset" sx={settingSx.form}>
          <InputLabel id="demo-simple-select-label">主题设置</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={colorMode}
            label="主题设置"
            onChange={(event) => {
              dispatch(updateColorSetting(event.target.value as ColorSetting));
            }}
          >
            <MenuItem value={ColorSetting.Dark}>暗黑模式主题</MenuItem>
            <MenuItem value={ColorSetting.Light}>明亮模式主题</MenuItem>
            <MenuItem value={ColorSetting.System}>跟随系统</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ ...settingSx.form, mt: 2 }}>
          <Typography gutterBottom>颜色设置</Typography>
          <Box
            component="input"
            type="color"
            value={color}
            onChange={(event) => {
              dispatch(updateColor(event.target.value));
            }}
          />
        </FormControl>
      </CardContent>
    </Card>
  );
}
