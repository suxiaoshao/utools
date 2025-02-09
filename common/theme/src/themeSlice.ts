import { create } from 'zustand';
import { argbFromHex, themeFromSourceColor } from '@material/material-color-utilities';
import { youThemeToMuiTheme } from './youTheme';
import { match } from 'ts-pattern';

export enum ColorSetting {
  System = 'system',
  Light = 'light',
  Dark = 'dark',
}

export interface ThemeSliceType {
  color: string;
  colorSetting: ColorSetting;
  systemColorScheme: 'light' | 'dark';
  setSystemColorScheme: (systemColorScheme: ThemeSliceType['systemColorScheme']) => void;
  updateColor: (color: string) => void;
  updateColorSetting: (colorSetting: ColorSetting) => void;
}

const getColorScheme = (
  colorSetting: ThemeSliceType['colorSetting'],
  systemColorScheme: ThemeSliceType['systemColorScheme'],
) => {
  return match(colorSetting)
    .with(ColorSetting.System, () => systemColorScheme)
    .otherwise((color) => color);
};

export const colorSchemaMatch = window.matchMedia('(prefers-color-scheme: dark)');

function getInitDate(): Pick<ThemeSliceType, 'color' | 'colorSetting' | 'systemColorScheme'> {
  const color: string = window?.utools?.dbStorage?.getItem('color') ?? '#9cd67e';
  const colorSetting = (window?.utools?.dbStorage?.getItem('colorSetting') ?? 'system') as ColorSetting;
  const systemColorScheme = match(colorSchemaMatch.matches)
    .with(true, () => 'dark' as const)
    .otherwise(() => 'light' as const);
  window?.utools?.dbStorage?.setItem('color', color);
  window?.utools?.dbStorage?.setItem('colorSetting', colorSetting);
  return {
    color,
    colorSetting,
    systemColorScheme,
  };
}

export const useThemeStore = create<ThemeSliceType>((set) => ({
  ...getInitDate(),
  setSystemColorScheme: (systemColorScheme: ThemeSliceType['systemColorScheme']) => set({ systemColorScheme }),
  updateColor: (color: string) => {
    set({ color });
    window?.utools?.dbStorage?.setItem('color', color);
  },
  updateColorSetting: (colorSetting: ColorSetting) => {
    set({ colorSetting });
    window?.utools?.dbStorage?.setItem('colorSetting', colorSetting);
  },
}));

export const selectColorMode = (state: Pick<ThemeSliceType, 'color' | 'colorSetting' | 'systemColorScheme'>) =>
  getColorScheme(state.colorSetting, state.systemColorScheme);

export const selectActiveYouTheme = (state: Pick<ThemeSliceType, 'color' | 'colorSetting' | 'systemColorScheme'>) => {
  const colorScheme = selectColorMode(state);
  return themeFromSourceColor(argbFromHex(state.color)).schemes[colorScheme];
};

export const selectMuiTheme = (state: Pick<ThemeSliceType, 'color' | 'colorSetting' | 'systemColorScheme'>) => {
  const colorScheme = selectColorMode(state);
  const youTheme = selectActiveYouTheme(state);
  return youThemeToMuiTheme(youTheme, colorScheme);
};
