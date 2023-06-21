import { Box, CircularProgress, IconButton, Tooltip, Typography } from '@mui/material';
import { Send } from '@mui/icons-material';
import { HttpForm, TabType } from '@http/types/httpForm';
import { useFormContext, useWatch } from 'react-hook-form';
import { useCallback } from 'react';
import { fetchHttp, getHttpRequestFromRequestForm } from '@http/utils/http_new';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 发送 http 请求的按钮
 * */
export default function SendButton(): JSX.Element {
  const { setValue, getValues, control } = useFormContext<HttpForm>();
  const responseStatus = useWatch({ name: 'response.tag', control });
  const onSend = useCallback(async () => {
    const requestForm = getValues('request');
    const controller = new AbortController();
    const signal = controller.signal;
    const request = getHttpRequestFromRequestForm(requestForm, signal);

    setValue('tab', TabType.response);
    setValue('response', { tag: 'loading', data: controller });
    const response = await fetchHttp(request);
    setValue('response', response);
  }, [getValues, setValue]);
  return (
    <Tooltip title={<Typography variant={'body2'}>发送请求</Typography>}>
      <Box sx={{ position: 'relative' }}>
        <IconButton sx={{ p: 1 }} color="primary" onClick={onSend}>
          <Send />
        </IconButton>
        {responseStatus === 'loading' && (
          <CircularProgress
            size={41}
            sx={{ color: (theme) => theme.palette.primary.main, position: 'absolute', top: 0, left: 0, zIndex: 1 }}
          />
        )}
      </Box>
    </Tooltip>
  );
}
