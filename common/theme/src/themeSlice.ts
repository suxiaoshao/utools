import { AnyAction, createSlice, EnhancedStore, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { argbFromHex, themeFromSourceColor } from '@material/material-color-utilities';
import { youThemeToMuiTheme } from './youTheme';

export enum ColorSetting {
  System = 'system',
  Light = 'light',
  Dark = 'dark',
}

export type ThemeSliceType = {
  color: string;
  colorSetting: ColorSetting;
  systemColorScheme: 'light' | 'dark';
};
const getColorScheme = (
  colorSetting: ThemeSliceType['colorSetting'],
  systemColorScheme: ThemeSliceType['systemColorScheme'],
) => {
  if (colorSetting === 'system') {
    return systemColorScheme;
  }
  return colorSetting;
};

export const colorSchemaMatch = window.matchMedia('(prefers-color-scheme: dark)');

function getInitDate(): ThemeSliceType {
  const color: string = window?.utools?.dbStorage?.getItem('color') ?? '#9cd67e';
  const colorSetting = (window?.utools?.dbStorage?.getItem('colorSetting') ?? 'system') as ColorSetting;
  const systemColorScheme = colorSchemaMatch.matches ? 'dark' : 'light';
  window?.utools?.dbStorage?.setItem('color', color);
  window?.utools?.dbStorage?.setItem('colorSetting', colorSetting);
  return {
    color,
    colorSetting,
    systemColorScheme,
  };
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState: getInitDate(),
  reducers: {
    setSystemColorScheme: (state, action: PayloadAction<ThemeSliceType['systemColorScheme']>) => {
      state.systemColorScheme = action.payload;
    },
    updateColor(state, action: PayloadAction<string>) {
      const color = action.payload;
      state.color = color;
      window?.utools?.dbStorage?.setItem('color', color);
    },
    updateColorSetting(state, action: PayloadAction<ColorSetting>) {
      const colorSetting = action.payload;
      state.colorSetting = colorSetting;
      window?.utools?.dbStorage?.setItem('colorSetting', colorSetting);
    },
  },
});
export const { setSystemColorScheme, updateColor, updateColorSetting } = themeSlice.actions;

export const selectColorMode = (state: RootState) =>
  getColorScheme(state.theme.colorSetting, state.theme.systemColorScheme);

export const selectActiveYouTheme = (state: RootState) => {
  const colorScheme = selectColorMode(state);
  return themeFromSourceColor(argbFromHex(state.theme.color)).schemes[colorScheme];
};

export const selectMuiTheme = (state: RootState) => {
  const colorScheme = selectColorMode(state);
  const youTheme = selectActiveYouTheme(state);
  return youThemeToMuiTheme(youTheme, colorScheme);
};

type StoreType = EnhancedStore<{ theme: ThemeSliceType }>;

export default themeSlice.reducer;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
export type RootState = ReturnType<StoreType['getState']>;
export type AppDispatch = StoreType['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
