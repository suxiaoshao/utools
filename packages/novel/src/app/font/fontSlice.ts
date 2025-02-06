import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FontSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface FontSliceType {
  fontSize: FontSize;
}

export const fontSlice = createSlice({
  name: 'font',
  initialState: {
    fontSize: utools.dbStorage.getItem('fontSize') ?? 1,
  } as FontSliceType,
  reducers: {
    updateFontSize: (state, action: PayloadAction<FontSize>) => {
      state.fontSize = action.payload;
      utools.dbStorage.setItem('fontSize', action.payload);
    },
  },
  selectors: {
    SelectFontSize: (state) => state.fontSize,
  },
});

export const { updateFontSize } = fontSlice.actions;

export const { SelectFontSize } = fontSlice.selectors;
