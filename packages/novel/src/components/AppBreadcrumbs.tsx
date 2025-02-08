/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2023-08-21 18:17:36
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2023-11-09 18:34:24
 * @FilePath: /tauri/Users/weijie.su/Documents/code/self/utools/packages/novel/src/components/AppBreadcrumbs.tsx
 */
import { Box, Breadcrumbs, Link } from '@mui/material';
import { useAppSelector } from '@novel/app/hooks';
import { SelectHistory, useCustomNavigate } from '@novel/app/history/historySlice';
import { Outlet } from 'react-router-dom';
import { match } from 'ts-pattern';

export default function AppBreadcrumbs() {
  const allLocation = useAppSelector(SelectHistory);
  const navigate = useCustomNavigate();
  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        id="breadcrumbs"
        sx={{ flex: '0 0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Breadcrumbs maxItems={3} sx={{ m: 1 }}>
          {allLocation.map((value, index) => (
            <Link
              color={match(index)
                .with(allLocation.length - 1, () => 'textPrimary')
                .otherwise(() => 'inherit')}
              href={`#${value.to.toString()}`}
              key={index}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                navigate(value.name, { tag: 'goBack', data: allLocation.length - index - 1 });
              }}
            >
              {value.name}
            </Link>
          ))}
        </Breadcrumbs>
      </Box>
      <Box sx={{ flex: '1 1 0', overflow: 'hidden' }}>
        <Outlet />
      </Box>
    </Box>
  );
}
