import { create } from 'zustand';

export type FontSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface FontState {
  fontSize: FontSize;
  updateFontSize: (newSize: FontSize) => void;
}

export const useFontStore = create<FontState>((set) => ({
  fontSize: utools.dbStorage.getItem('fontSize') ?? 1,
  updateFontSize: (newSize: FontSize) => {
    set({ fontSize: newSize });
    utools.dbStorage.setItem('fontSize', newSize);
  },
}));
