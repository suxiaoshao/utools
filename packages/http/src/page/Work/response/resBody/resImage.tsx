import React from 'react';
import { Box, Paper } from '@mui/material';
import { ResponseContext } from '../response';
import logo from '@http/assets/fail.svg';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 显示图片
 * */
export default function ResImage() {
  const {
    response: { arrayBuffer },
  } = React.useContext(ResponseContext);
  const [url, setUrl] = React.useState<string>(logo);
  React.useEffect(() => {
    setUrl(URL.createObjectURL(new Blob([arrayBuffer])));
  }, [arrayBuffer]);
  return (
    <Paper sx={{ overflow: 'auto', width: '100%', height: '100%' }}>
      <Box component="img" sx={{ width: '100%' }} src={url} alt="图片" />
    </Paper>
  );
}
