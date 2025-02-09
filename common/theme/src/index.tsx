import { useCallback, useEffect } from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';
import setYouThemeToCssVars from './cssVar';
import { colorSchemaMatch, selectActiveYouTheme, selectMuiTheme, useThemeStore } from './themeSlice';
import { match } from 'ts-pattern';
import { useShallow } from 'zustand/react/shallow';

export interface CustomThemeProps {
  children?: React.ReactNode;
}

export function CustomTheme({ children }: CustomThemeProps) {
  const { setSystemColorScheme, ...state } = useThemeStore(
    useShallow(({ color, colorSetting, setSystemColorScheme, systemColorScheme }) => ({
      color,
      colorSetting,
      systemColorScheme,
      setSystemColorScheme,
    })),
  );

  useEffect(() => {
    setYouThemeToCssVars(selectActiveYouTheme(state));
  }, [state]);
  const changeListener = useCallback(
    (e: MediaQueryListEvent) => {
      const colorScheme = match(e.matches)
        .with(true, () => 'dark' as const)
        .with(false, () => 'light' as const)
        .exhaustive();
      setSystemColorScheme(colorScheme);
    },
    [setSystemColorScheme],
  );
  useEffect(() => {
    colorSchemaMatch.addEventListener('change', changeListener);
    return () => {
      colorSchemaMatch.removeEventListener('change', changeListener);
    };
  }, [changeListener]);
  return (
    <ThemeProvider theme={createTheme(selectMuiTheme(state))}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export { hexFromArgb } from '@material/material-color-utilities';

export { useThemeStore, selectActiveYouTheme } from './themeSlice';
