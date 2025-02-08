import { useCallback, useEffect } from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';
import setYouThemeToCssVars from './cssVar';
import {
  colorSchemaMatch,
  selectActiveYouTheme,
  selectMuiTheme,
  setSystemColorScheme,
  useAppDispatch,
  useAppSelector,
} from './themeSlice';
import { match } from 'ts-pattern';

export interface CustomThemeProps {
  children?: React.ReactNode;
}

export function CustomTheme({ children }: CustomThemeProps) {
  const youTheme = useAppSelector(selectActiveYouTheme);
  const muiTheme = useAppSelector(selectMuiTheme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setYouThemeToCssVars(youTheme);
  }, [youTheme]);
  const changeListener = useCallback(
    (e: MediaQueryListEvent) => {
      const colorScheme = match(e.matches)
        .with(true, () => 'dark' as const)
        .with(false, () => 'light' as const)
        .exhaustive();
      dispatch(setSystemColorScheme(colorScheme));
    },
    [dispatch],
  );
  useEffect(() => {
    colorSchemaMatch.addEventListener('change', changeListener);
    return () => {
      colorSchemaMatch.removeEventListener('change', changeListener);
    };
  }, [changeListener]);
  return (
    <ThemeProvider theme={createTheme(muiTheme)}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export { hexFromArgb } from '@material/material-color-utilities';

export { default as themeReducer, selectActiveYouTheme } from './themeSlice';
