import React from 'react';
import { Divider, InputBase, Paper } from '@mui/material';
import { HttpContext } from '../workPanel';
import { httpArray } from '../../../store/httpArray';
import SaveButton from './saveButton';
import SendButton from './sendButton';
import ChangeButton from './changeButton';
import MethodSelector from './methodSelector';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description http url 输入栏组件,用于管理 http 方法,链接,发送,切换视图
 * */
export default function UrlPaper(): JSX.Element {
  const { httpManager } = React.useContext(HttpContext);
  return (
    <Paper
      component="form"
      sx={{
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 'calc(100% - 16px)',
        margin: '2px 8px',
        flex: '0 0 auto',
      }}
    >
      <MethodSelector />
      <Divider sx={{ height: 28, margin: 4 }} orientation="vertical" />
      <InputBase
        placeholder="url"
        sx={{ ml: 1, flex: 1 }}
        value={httpManager.url}
        onChange={(event) => {
          httpManager.url = event.target.value;
          httpArray.update();
        }}
      />
      <SendButton />
      <Divider sx={{ height: 28, margin: 4 }} orientation="vertical" />
      <ChangeButton />
      <SaveButton />
    </Paper>
  );
}
