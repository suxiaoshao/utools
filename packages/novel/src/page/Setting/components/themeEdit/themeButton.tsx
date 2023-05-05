import React from 'react';
import { ButtonBase, ButtonProps, ThemeProvider, createTheme } from '@mui/material';

export interface ThemeEnvProp {
  children: React.ReactNode;
}

export function ThemeEnv(props: ThemeEnvProp): JSX.Element {
  return <ThemeProvider theme={createTheme({})}>{props.children}</ThemeProvider>;
}

export default function ThemeButton({ children, disabled, ...props }: ButtonProps): JSX.Element {
  return (
    <ButtonBase
      sx={(theme) => ({
        margin: 1,
        borderRadius: theme.shape.borderRadius,
        width: (theme) => theme.spacing(12),
        height: (theme) => theme.spacing(8),
        boxShadow: theme.shadows[2],
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.getContrastText(theme.palette.background.paper),
        ...(disabled
          ? {
              boxShadow: theme.shadows[0],
              cursor: 'not-allowed !important',
              pointerEvents: 'none',
              color: theme.palette.text.disabled,
            }
          : undefined),
      })}
      {...props}
    >
      {children}
    </ButtonBase>
  );
}
