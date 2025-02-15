import React from 'react';
import { Paper, Typography } from '@mui/material';
import { ResponseContext } from './ResponseContext';
import MyError from '@http/components/icon/myError';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 错误页面
 * */
export default function ErrorPage() {
  const { response } = React.useContext(ResponseContext);
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
      <MyError sx={{ width: '30vh', height: '30vh' }} />
      <Typography variant="h6">{response.getCode()}</Typography>
    </Paper>
  );
}
