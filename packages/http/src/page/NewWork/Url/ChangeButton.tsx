import React from 'react';
import { IconButton, Tooltip, Typography } from '@mui/material';
import { SwapHoriz } from '@mui/icons-material';
import { useFormContext } from 'react-hook-form';
import { HttpForm, TabType } from '@http/types/httpForm';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 修改 response/request 页面的按钮
 * */
export default function ChangeButton(): JSX.Element {
  const { watch, setValue } = useFormContext<HttpForm>();
  const tab = watch('tab');
  return (
    <Tooltip
      title={
        <Typography variant={'body2'}>{tab === TabType.request ? '切换为 response' : '切换为 request'}</Typography>
      }
    >
      <IconButton
        sx={{ p: 1 }}
        onClick={() => {
          setValue('tab', tab === TabType.request ? TabType.response : TabType.request);
        }}
      >
        <SwapHoriz />
      </IconButton>
    </Tooltip>
  );
}
