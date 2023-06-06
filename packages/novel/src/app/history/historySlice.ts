import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { To, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Enum } from 'types';

export type CustomLocation = {
  name: string;
  to: To;
};

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
});

export const { addLocation, goBack, replaceLocation } = historySlice.actions;

export const SelectHistory = (state: RootState) => state.history.value;

export type RouterJump = Enum<'push', To> | Enum<'replace', To> | Enum<'goBack', number>;

export function useCustomNavigate() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const activeLocation = useAppSelector(SelectHistory);
  const customNavigate = useCallback(
    (name: string, jump: RouterJump) => {
      switch (jump.tag) {
        case 'push':
          dispatch(addLocation({ name, to: jump.data }));
          navigate(jump.data);
          break;
        case 'replace':
          dispatch(replaceLocation({ name, to: jump.data }));
          navigate(jump.data, { replace: true });
          break;
        case 'goBack':
          dispatch(goBack(jump.data));
          navigate(activeLocation[activeLocation.length - jump.data - 1].to);
          break;
      }
    },
    [activeLocation, dispatch, navigate],
  );
  return customNavigate;
}
