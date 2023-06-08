import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import { useCustomNavigate } from '@novel/app/history/historySlice';

export default function AppTabs(): JSX.Element {
  const location = useLocation();
  const navigator = useCustomNavigate();

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: '0 0 auto', borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          onChange={(event, value: '/' | '/bookshelf' | '/readFile' | '/setting' | '/sponsorship') => {
            let name: string;
            switch (value) {
              case '/':
                name = '搜索';
                break;
              case '/bookshelf':
                name = '书架';
                break;
              case '/readFile':
                name = '读取文件';
                break;
              case '/setting':
                name = '设置';
                break;
              case '/sponsorship':
                name = '支持作者';
                break;
            }
            navigator(name, { tag: 'replace', data: value });
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
