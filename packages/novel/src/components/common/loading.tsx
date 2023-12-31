/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2023-12-31 16:03:02
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2023-12-31 16:16:05
 * @FilePath: /utools/packages/novel/src/components/common/loading.tsx
 */
import React from 'react';
import { Box, CircularProgress, IconButton, Tooltip, Typography } from '@mui/material';
import ErrorImage from '@novel/assets/monkey.png';
import { Refresh } from '@mui/icons-material';

type LoadingState<T> =
  | {
      retry: () => void;
      loading: boolean;
      error?: undefined;
      value?: undefined;
    }
  | {
      retry: () => void;
      loading: false;
      error: Error;
      value?: undefined;
    }
  | {
      retry: () => void;
      loading: true;
      error?: Error | undefined;
      value?: T | undefined;
    }
  | {
      retry: () => void;
      loading: false;
      error?: undefined;
      value: T;
    };

export interface LoadingProp<T> {
  /**
   * 状态
   * */
  state: LoadingState<T>;
  /**
   * 成功组件
   * */
  children: React.ReactNode;
}

/**
 * loading 数据
 * */
export function Loading<T>(props: LoadingProp<T>) {
  return props.state.loading ? (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress size={80} />
    </Box>
  ) : props.state.error ? (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ width: 30, marginBottom: 5 }} component="img" alt={'错误'} src={ErrorImage} />
      <Typography variant={'h6'} color={'secondary'}>
        {props.state.error.message}
        <Tooltip title={'刷新'}>
          <IconButton onClick={props.state.retry} color={'secondary'}>
            <Refresh />
          </IconButton>
        </Tooltip>
      </Typography>
    </Box>
  ) : (
    props.children
  );
}
