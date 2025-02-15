import React from 'react';
import { createTheme, type Theme } from '@mui/material';
import { zhCN } from '@mui/material/locale';

/**
 * 根据名字获取 theme 对象
 * */
export function getThemeByThemeValue(isDark: boolean): [Theme, boolean] {
  if (!isDark) {
    return [
      createTheme(
        {
          palette: {
            mode: 'light',
          },
        },
        zhCN,
      ),
      false,
    ];
  }
  return [
    createTheme(
      {
        palette: {
          mode: 'dark',
          primary: {
            main: '#90caf9',
            light: 'rgb(166, 212, 250)',
            dark: 'rgb(100, 141, 174)',
            contrastText: 'rgba(0, 0, 0, 0.87)',
          },
          secondary: {
            main: '#f48fb1',
            light: 'rgb(246, 165, 192)',
            dark: 'rgb(170, 100, 123)',
            contrastText: 'rgba(0, 0, 0, 0.87)',
          },
          error: {
            light: '#e57373',
            main: '#f44336',
            dark: '#d32f2f',
            contrastText: '#fff',
          },
          warning: {
            light: '#ffb74d',
            main: '#ff9800',
            dark: '#f57c00',
            contrastText: 'rgba(0, 0, 0, 0.87)',
          },
          info: {
            light: '#64b5f6',
            main: '#2196f3',
            dark: '#1976d2',
            contrastText: '#fff',
          },
          success: {
            light: '#81c784',
            main: '#4caf50',
            dark: '#388e3c',
            contrastText: 'rgba(0, 0, 0, 0.87)',
          },
          grey: {
            '50': '#fafafa',
            '100': '#f5f5f5',
            '200': '#eeeeee',
            '300': '#e0e0e0',
            '400': '#bdbdbd',
            '500': '#9e9e9e',
            '600': '#757575',
            '700': '#616161',
            '800': '#424242',
            '900': '#212121',
            A100: '#d5d5d5',
            A200: '#aaaaaa',
            A400: '#303030',
            A700: '#616161',
          },
          text: {
            primary: '#fff',
            secondary: 'rgba(255, 255, 255, 0.7)',
            disabled: 'rgba(255, 255, 255, 0.5)',
          },
        },
      },
      zhCN,
    ),
    true,
  ];
}

export function useThemeValue(): [Theme, boolean] {
  const isDark = utools.isDarkColors();
  const themeValue = React.useMemo(() => {
    return getThemeByThemeValue(isDark);
  }, [isDark]);
  return themeValue;
}
