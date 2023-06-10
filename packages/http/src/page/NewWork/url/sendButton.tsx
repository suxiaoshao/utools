import { Box, CircularProgress, IconButton, Tooltip, Typography } from '@mui/material';
import { Send } from '@mui/icons-material';
import { HttpForm } from '@http/types/httpForm';
import { useFormContext } from 'react-hook-form';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 发送 http 请求的按钮
 * */
export default function SendButton(): JSX.Element {
  const { watch } = useFormContext<HttpForm>();
  const responseStatus = watch('response.tag');
  return (
    <Tooltip title={<Typography variant={'body2'}>发送请求</Typography>}>
      <Box sx={{ position: 'relative' }}>
        <IconButton
          sx={{ p: 1 }}
          color="primary"
          onClick={async () => {
            // todo
            // /**
            //  * 初始化 http 管理对象发送请求需要的状态
            //  * */
            // httpManager.loading = true;
            // httpManager.isRequest = false;
            // fatherUpdate();
            // /**
            //  * 发送请求,如果放回错误信息则提醒用户
            //  * */
            // const message = await httpManager.httpSend();
            // if (message) {
            //   enqueueSnackbar(message, {
            //     variant: 'error',
            //     autoHideDuration: 2000,
            //   });
            // }
            // httpManager.loading = false;
            // fatherUpdate();
          }}
        >
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
