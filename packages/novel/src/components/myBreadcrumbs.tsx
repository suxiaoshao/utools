import React from 'react';
import { Box, BoxProps, Breadcrumbs, Link } from '@mui/material';
import { historyStore, useAllLocation } from '../store/history.store';

export default function MyBreadcrumbs({ sx, children, ...props }: BoxProps): JSX.Element {
  const [allLocation] = useAllLocation();
  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Breadcrumbs maxItems={3} sx={{ flex: '0 0 auto', margin: 1 }}>
        {allLocation.map((value, index) => (
          <Link
            color={index !== allLocation.length - 1 ? 'inherit' : 'textPrimary'}
            href={`#${value.pathname}${value.search}`}
            key={value.pathname}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              historyStore.goIndex(index);
            }}
          >
            {value.name}
          </Link>
        ))}
      </Breadcrumbs>
      <Box {...props} sx={{ flex: '1 1 0', overflow: 'hidden', ...sx }}>
        {children}
      </Box>
    </Box>
  );
}
