import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type To, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import type { Enum } from 'types';
import { match } from 'ts-pattern';

export interface CustomLocation {
  name: string;
  to: To;
}

export interface HistorySliceType {
  value: CustomLocation[];
}

export const historySlice = createSlice({
  name: 'history',
  initialState: {
    value: [],
  } as HistorySliceType,
  reducers: {
    addLocation: (state, action: PayloadAction<CustomLocation>) => {
      state.value.push(action.payload);
    },
    goBack: (state, action: PayloadAction<number>) => {
      state.value = state.value.slice(0, state.value.length - action.payload);
    },
    replaceLocation: (state, action: PayloadAction<CustomLocation>) => {
      state.value.pop();
      state.value.push(action.payload);
    },
  },
  selectors: {
    SelectHistory: (state) => state.value,
  },
});

export const { addLocation, goBack, replaceLocation } = historySlice.actions;

export const { SelectHistory } = historySlice.selectors;

export type RouterJump = Enum<'push', To> | Enum<'replace', To> | Enum<'goBack', number>;

export function useCustomNavigate() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const activeLocation = useAppSelector(SelectHistory);
  const customNavigate = useCallback(
    (name: string, jump: RouterJump) => {
      match(jump)
        .with({ tag: 'push' }, ({ data }) => {
          dispatch(addLocation({ name, to: data }));
          navigate(data);
        })
        .with({ tag: 'replace' }, ({ data }) => {
          dispatch(replaceLocation({ name, to: data }));
          navigate(data, { replace: true });
        })
        .with({ tag: 'goBack' }, ({ data }) => {
          dispatch(goBack(data));
          navigate(activeLocation[activeLocation.length - data - 1].to);
        })
        .exhaustive();
    },
    [activeLocation, dispatch, navigate],
  );
  return customNavigate;
}
