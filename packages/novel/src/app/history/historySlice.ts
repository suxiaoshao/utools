import { create } from 'zustand';
import { type To, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import type { Enum } from 'types';
import { match } from 'ts-pattern';

export interface CustomLocation {
  name: string;
  to: To;
}

interface HistoryState {
  value: CustomLocation[];
  addLocation: (location: CustomLocation) => void;
  goBack: (steps: number) => void;
  replaceLocation: (location: CustomLocation) => void;
}

export const useHistoryStore = create<HistoryState>((set) => ({
  value: [],
  addLocation: (location) => set((state) => ({ value: [...state.value, location] })),
  goBack: (steps) => set((state) => ({ value: state.value.slice(0, state.value.length - steps) })),
  replaceLocation: (location) =>
    set((state) => {
      const newValue = [...state.value];
      newValue.pop();
      newValue.push(location);
      return { value: newValue };
    }),
}));

export type RouterJump = Enum<'push', To> | Enum<'replace', To> | Enum<'goBack', number>;

export function useCustomNavigate() {
  const navigate = useNavigate();
  const { value: activeLocation, addLocation, goBack, replaceLocation } = useHistoryStore();
  const customNavigate = useCallback(
    (name: string, jump: RouterJump) => {
      match(jump)
        .with({ tag: 'push' }, ({ data }) => {
          addLocation({ name, to: data });
          navigate(data);
        })
        .with({ tag: 'replace' }, ({ data }) => {
          replaceLocation({ name, to: data });
          navigate(data, { replace: true });
        })
        .with({ tag: 'goBack' }, ({ data }) => {
          goBack(data);
          navigate(activeLocation[activeLocation.length - data - 1].to);
        })
        .exhaustive();
    },
    [activeLocation, addLocation, goBack, replaceLocation, navigate],
  );
  return customNavigate;
}
