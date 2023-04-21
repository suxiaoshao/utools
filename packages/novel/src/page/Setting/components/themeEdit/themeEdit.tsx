import { Avatar, Card, CardContent, CardHeader, FormControl, FormLabel, Switch, Typography } from '@mui/material';
import React from 'react';
import { useSettingTheme } from '../../../../store/setting.store';
import { Style } from '@mui/icons-material';
import { orange } from '@mui/material/colors';
import ThemeValueForm from './themeValueForm';
import { useThemeList } from '../../../../hooks/data/useThemeList';

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
  const [theme, setTheme] = useSettingTheme();
  const themeList = useThemeList();
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
          <Typography gutterBottom>是否跟随 utools 主题</Typography>
          <Switch
            color="primary"
            checked={!('name' in theme)}
            onChange={() => {
              if ('name' in theme) {
                setTheme({ dark: themeList[0], light: themeList[1] });
              } else {
                setTheme(themeList[0]);
              }
            }}
          />
          {!('name' in theme) ? (
            <>
              <Typography gutterBottom>明亮模式主题</Typography>
              <ThemeValueForm
                value={theme.light}
                onChange={(newValue) => {
                  theme.light = newValue;
                  setTheme(theme);
                }}
              />
              <Typography gutterBottom>暗黑模式主题</Typography>
              <ThemeValueForm
                value={theme.dark}
                onChange={(newValue) => {
                  theme.dark = newValue;
                  setTheme(theme);
                }}
              />
            </>
          ) : (
            <>
              <FormLabel>固定主题</FormLabel>
              <ThemeValueForm
                value={theme}
                onChange={(newValue) => {
                  setTheme(newValue);
                }}
              />
            </>
          )}
        </FormControl>
      </CardContent>
    </Card>
  );
}
