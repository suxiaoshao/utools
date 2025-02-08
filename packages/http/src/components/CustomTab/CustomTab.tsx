/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2024-03-08 00:29:48
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2024-03-08 17:09:31
 * @FilePath: /self-tools/Users/sushao/Documents/code/utools/packages/http/src/components/CustomTab/CustomTab.tsx
 */

import { Close } from '@mui/icons-material';
import { Box, type BoxProps, ButtonBase, IconButton, Typography } from '@mui/material';
import { padding } from 'styles';
import { match } from 'ts-pattern';

export interface CustomTabProp extends BoxProps {
  active?: boolean;
  onClick?: () => void;
  onClose?: () => void;
  label: string;
}

export default function CustomTab({ label, onClick, active = false, sx, onClose, ...props }: CustomTabProp) {
  return (
    <Box
      {...props}
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        minWidth: 120,
        maxWidth: 240,
        position: 'relative',
        ...sx,
      }}
    >
      <ButtonBase
        sx={{
          flex: '1 1 0',
          display: 'flex',
          justifyContent: 'center',
          overflow: 'hidden',
          height: '100%',
          ...padding(0, 4.5, 0, 2),
        }}
        onClick={onClick}
      >
        <Typography noWrap variant="body2" component="span">
          {label}
        </Typography>
      </ButtonBase>
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          bottom: 0,
          borderBottom: match(active)
            .with(true, () => '2px solid')
            .otherwise(() => '2px solid transparent'),
          borderColor: match(active)
            .with(true, () => 'primary.main')
            .otherwise(() => 'transparent'),
        }}
      />

      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onClose?.();
        }}
        size="small"
        sx={{ position: 'absolute', right: 0, top: 5.75 }}
      >
        <Close fontSize="small" />
      </IconButton>
    </Box>
  );
}
