import React from 'react';
import { IconButton, Tooltip, Typography } from '@mui/material';
import { SwapHoriz } from '@mui/icons-material';
import { HttpContext } from '../workPanel';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 修改 response/request 页面的按钮
 * */
export default function ChangeButton(): JSX.Element {
  const { httpManager, fatherUpdate } = React.useContext(HttpContext);
  return (
    <Tooltip
      title={<Typography variant={'body2'}>{httpManager.isRequest ? '切换为 response' : '切换为 request'}</Typography>}
    >
      <IconButton
        sx={{ p: 1 }}
        onClick={() => {
          httpManager.isRequest = !httpManager.isRequest;
          fatherUpdate();
        }}
      >
        <SwapHoriz />
      </IconButton>
    </Tooltip>
  );
}
