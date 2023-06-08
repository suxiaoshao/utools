import { useMemo } from 'react';
import { Avatar, Card, CardContent, CardHeader, FormControl, Slider, Typography } from '@mui/material';
import { ChromeReaderMode } from '@mui/icons-material';
import { deepPurple } from '@mui/material/colors';
import FontSizeTypo from './fontSizeTypo';
import { useAppDispatch, useAppSelector } from '@novel/app/hooks';
import { FontSize, SelectFontSize } from '@novel/app/font/fontSlice';
import { updateFontSize } from '@novel/app/font/fontSlice';
import { Mark } from '@mui/base';

export default function FontCard(): JSX.Element {
  const dispatch = useAppDispatch();
  const fontSize = useAppSelector(SelectFontSize);
  const mark = useMemo<Mark[]>(
    () =>
      Array(10)
        .fill(1)
        .map((value, index) => ({ value: index + 1, label: <FontSizeTypo fontSize={(index + 1) as FontSize} /> })),
    [],
  );
  return (
    <Card sx={{ margin: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ color: '#fff', backgroundColor: deepPurple[600] }}>
            <ChromeReaderMode />
          </Avatar>
        }
        title={'阅读设置'}
      />
      <CardContent>
        <FormControl component="fieldset" sx={{ width: '100%' }}>
          <Typography gutterBottom>阅读页面字体大小</Typography>
          <Slider
            sx={{ ml: 4, mr: 4, width: (theme) => `calc(100% - ${theme.spacing(8)})` }}
            value={fontSize}
            onChange={(event, value) => {
              dispatch(updateFontSize(value as FontSize));
            }}
            getAriaValueText={(value) => `${value}℃`}
            valueLabelDisplay="auto"
            step={1}
            marks={mark}
            min={1}
            max={10}
          />
        </FormControl>
      </CardContent>
    </Card>
  );
}
