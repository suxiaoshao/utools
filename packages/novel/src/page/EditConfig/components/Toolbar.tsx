/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2023-11-09 17:25:49
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2023-11-10 17:52:34
 * @FilePath: /tauri/Users/weijie.su/Documents/code/self/utools/packages/novel/src/page/EditConfig/components/Toolbar.tsx
 */
import { Box, IconButton, Tooltip } from '@mui/material';
import { Save, Close, ExitToApp, FileOpen } from '@mui/icons-material';
import { useCustomNavigate } from '@novel/app/history/historySlice';
import { useToggle } from '@novel/hooks/async/useToggle';
import ExportDialog from './ExportDialog';

export const Toolbar = () => {
  const navigate = useCustomNavigate();

  const { open, handleToggle } = useToggle({});

  return (
    <Box>
      <Tooltip title="保存">
        <IconButton form="add-config" type="submit" color="success">
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
