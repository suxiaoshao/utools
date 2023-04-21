import React from 'react';
import { Button, CssBaseline, ThemeProvider } from '@mui/material';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';
import { SnackbarProvider } from 'notistack';
import { Notify } from './common/notify';
import { useThemeValue } from '../hooks/useThemeValue';

dayjs.locale('zh-cn');

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 主题组件的 prop
 * */
interface MyThemeProp {
  /**
   * 子组件
   * */
  children: React.ReactNode;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 主题组件
 * */
export function MyThemeProvider(props: MyThemeProp): JSX.Element {
  /**
   * 主题对象
   * */
  const [themeObject] = useThemeValue();
  const nonstickRef = React.useRef<SnackbarProvider>(null);

  return (
    <ThemeProvider theme={themeObject}>
      <CssBaseline />
      {/* 时间组件 */}
      {/* 消息条组件 */}
      <SnackbarProvider
        ref={nonstickRef}
        maxSnack={5}
        action={(key) => (
          <Button
            onClick={() => {
              nonstickRef.current?.closeSnackbar(key);
            }}
          >
            关闭
          </Button>
        )}
      >
        <Notify />
        {props.children}
      </SnackbarProvider>
    </ThemeProvider>
  );
}
