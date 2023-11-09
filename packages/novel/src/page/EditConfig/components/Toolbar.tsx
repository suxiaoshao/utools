/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2023-11-09 17:25:49
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2023-11-09 17:50:53
 * @FilePath: /tauri/Users/weijie.su/Documents/code/self/utools/packages/novel/src/page/EditConfig/components/Toolbar.tsx
 */
import { Box, IconButton, Tooltip } from '@mui/material';
import { Save, Close, ExitToApp, FileOpen } from '@mui/icons-material';
import { useCustomNavigate } from '@novel/app/history/historySlice';
import { useAppDispatch } from '@novel/app/hooks';
import { useToggle } from '@novel/hooks/async/useToggle';
import { useCallback, useState } from 'react';
import ExportDialog from './ExportDialog';
import { defaultCode } from '../const';
import { TotalDataBuild } from '@novel/utils/data/totalData';
import { enqueueSnackbar } from 'notify';
import { initConfig } from '@novel/app/config/configSlice';

export const Toolbar = () => {
  const [code] = useState(defaultCode);

  const navigate = useCustomNavigate();
  const dispatch = useAppDispatch();

  const { open, handleToggle } = useToggle({});
  const handleSave = useCallback(() => {
    const totalData = TotalDataBuild.getTotalData();
    const message = totalData.addConfig(code);
    if (message) {
      enqueueSnackbar(message, {
        variant: 'error',
      });
    } else {
      navigate('', { tag: 'goBack', data: 1 });
      dispatch(initConfig());
    }
  }, [code, dispatch, navigate]);
  return (
    <Box>
      <Tooltip title="保存">
        <IconButton color="success" onClick={handleSave}>
          <Save />
        </IconButton>
      </Tooltip>

      <Tooltip title="查看默认源配置">
        <IconButton
          onClick={() => {
            utools.shellOpenExternal('https://yuanliao.info/d/1392-0-3-1-utools/176');
          }}
        >
          <ExitToApp />
        </IconButton>
      </Tooltip>

      <Tooltip title="导入">
        <IconButton onClick={handleToggle}>
          <FileOpen />
        </IconButton>
      </Tooltip>
      <Tooltip title="取消">
        <IconButton
          onClick={() => {
            navigate('', { tag: 'goBack', data: 1 });
          }}
          color="error"
        >
          <Close />
        </IconButton>
      </Tooltip>
      <ExportDialog handleToggle={handleToggle} open={open} />
    </Box>
  );
};
