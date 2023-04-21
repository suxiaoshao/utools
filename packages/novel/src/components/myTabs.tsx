import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function MyTabs(): JSX.Element {
  const location = useLocation();
  const navigator = useNavigate();

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: '0 0 auto', borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          onChange={(event, value: '/' | '/bookshelf' | '/readFile' | '/setting' | '/sponsorship') => {
            navigator(value);
          }}
          value={location.pathname}
          centered
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="搜索" value={'/'} />
          <Tab label="书架" value={'/bookshelf'} />
          {/*<Tab label="读取文件" value={'/readFile'} />*/}
          <Tab label="设置" value={'/setting'} />
          <Tab label="支持作者" value={'/sponsorship'} />
        </Tabs>
      </Box>
      <Box component="main" sx={{ flex: '1 1 0', position: 'relative', overflow: 'hidden' }}>
        <Outlet />
      </Box>
    </Box>
  );
}
