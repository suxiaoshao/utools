import React from 'react';
import { IconButton, Tooltip, Typography } from '@mui/material';
import { SwapHoriz } from '@mui/icons-material';
import { HttpContext } from '../workPanel';
import { match } from 'ts-pattern';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 修改 response/request 页面的按钮
 * */
export default function ChangeButton() {
  const { httpManager, fatherUpdate } = React.useContext(HttpContext);
  const title = match(httpManager.isRequest)
    .with(true, () => '切换为 response')
    .otherwise(() => '切换为 request');

  return (
    <Tooltip title={<Typography variant="body2">{title}</Typography>}>
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
