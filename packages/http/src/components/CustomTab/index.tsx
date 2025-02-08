/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2024-03-07 19:18:45
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2024-03-08 16:57:40
 * @FilePath: /self-tools/Users/sushao/Documents/code/utools/packages/http/src/components/Tab/index.tsx
 */
import { Add } from '@mui/icons-material';
import { Box, type BoxProps, IconButton } from '@mui/material';

export interface CustomTabsProp extends BoxProps {
  onAdd?: () => void;
}

export default function CustomTabs({ sx, onAdd, children, ...props }: CustomTabsProp) {
  return (
    <Box
      {...props}
      sx={{
        height: (theme) => theme.spacing(5),
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        borderBottom: 1,
        borderColor: 'divider',
        alignItems: 'center',
        ...sx,
      }}
    >
      {children}
      <IconButton sx={{ ml: 1 }} onClick={onAdd} size="small">
        <Add fontSize="small" />
      </IconButton>
    </Box>
  );
}

export { default as CustomTab } from './CustomTab';
