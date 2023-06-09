import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import empty from '@http/assets/emptyResponse.svg';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 还未发送数据时显示的空页面
 * */
export default function NoneRes(): JSX.Element {
  return (
    <Paper
      sx={(theme) => ({
        width: `calc(100% - ${theme.spacing(2)})`,
        height: `calc(100% - ${theme.spacing(2)})`,
        margin: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
      })}
    >
      <Box component={'img'} sx={{ width: '30vh', height: '30vh' }} src={empty} alt={''} />
      <Typography variant="h6">还未发送 http 请求</Typography>
    </Paper>
  );
}
