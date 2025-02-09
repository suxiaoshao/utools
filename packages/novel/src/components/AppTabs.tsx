import { Box, Tab, Tabs } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import { useCustomNavigate } from '@novel/app/history/historySlice';
import { match } from 'ts-pattern';

export default function AppTabs() {
  const location = useLocation();
  const navigator = useCustomNavigate();

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: '0 0 auto', borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          onChange={(event, value: '/' | '/bookshelf' | '/readFile' | '/setting' | '/sponsorship') => {
            const name = match(value)
              .with('/', () => '搜索')
              .with('/bookshelf', () => '书架')
              .with('/readFile', () => '读取文件')
              .with('/setting', () => '设置')
              .with('/sponsorship', () => '支持作者')
              .exhaustive();
            navigator(name, { tag: 'replace', data: value });
          }}
          value={location.pathname}
          centered
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="搜索" value="/" />
          <Tab label="书架" value="/bookshelf" />
          {/*<Tab label="读取文件" value={'/readFile'} />*/}
          <Tab label="设置" value="/setting" />
          <Tab label="支持作者" value="/sponsorship" />
        </Tabs>
      </Box>
      <Box component="main" sx={{ flex: '1 1 0', position: 'relative', overflow: 'hidden' }}>
        <Outlet />
      </Box>
    </Box>
  );
}
