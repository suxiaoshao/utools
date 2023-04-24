import React from 'react';
import { Box, Breadcrumbs, Link } from '@mui/material';
import { useAppSelector } from '../app/hooks';
import { SelectHistory, useCustomNavigate } from '../app/history/historySlice';
import { Outlet } from 'react-router-dom';

export default function AppBreadcrumbs(): JSX.Element {
  const allLocation = useAppSelector(SelectHistory);
  const navigate = useCustomNavigate();
  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Breadcrumbs maxItems={3} sx={{ flex: '0 0 auto', margin: 1 }}>
        {allLocation.map((value, index) => (
          <Link
            color={index !== allLocation.length - 1 ? 'inherit' : 'textPrimary'}
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
      <Box sx={{ flex: '1 1 0', overflow: 'hidden' }}>
        <Outlet />
      </Box>
    </Box>
  );
}
