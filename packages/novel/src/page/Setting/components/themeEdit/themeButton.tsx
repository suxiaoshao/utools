import React from 'react';
import { ThemeValue } from '../../../../store/setting.store';
import { ButtonBase, ButtonProps, ThemeProvider } from '@mui/material';
import { getThemeByThemeValue } from '../../../../hooks/useThemeValue';

export interface ThemeEnvProp {
  theme: ThemeValue;
  children: React.ReactNode;
}

export function ThemeEnv(props: ThemeEnvProp): JSX.Element {
  const [theme] = getThemeByThemeValue(props.theme);
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
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
