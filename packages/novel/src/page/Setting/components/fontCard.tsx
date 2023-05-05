import React from 'react';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { ChromeReaderMode } from '@mui/icons-material';
import { deepPurple } from '@mui/material/colors';
import FontSizeTypo from './fontSizeTypo';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { FontSize, SelectFontSize } from '../../../app/font/fontSlice';
import { updateFontSize } from '../../../app/font/fontSlice';

export default function FontCard(): JSX.Element {
  const dispatch = useAppDispatch();
  const fontSize = useAppSelector(SelectFontSize);
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
          <RadioGroup
            value={fontSize}
            onChange={(event, value) => {
              dispatch(updateFontSize(parseInt(value) as FontSize));
            }}
            row
          >
            {Array(10)
              .fill(1)
              .map((value, index) => (
                <FormControlLabel
                  key={index}
                  value={index + 1}
                  control={<Radio />}
                  label={<FontSizeTypo fontSize={(index + 1) as FontSize} />}
                />
              ))}
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
}
