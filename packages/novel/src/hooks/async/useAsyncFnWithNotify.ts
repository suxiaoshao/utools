import { useAsyncFn } from 'react-use';
import React, { type DependencyList } from 'react';
import type { AsyncFnReturn } from 'react-use/lib/useAsyncFn';
import { enqueueSnackbar } from 'notify';

/**
 * 包装了提醒信息的 useAsyncFn
 * @param {() => Promise<T>} fn 函数
 * @param {string} successMessage 成功信息
 * @param {DependencyList} deps 依赖
 * */
export function useAsyncFnWithNotify<T>(
  fn: () => Promise<T>,
  successMessage?: string,
  deps?: DependencyList,
): AsyncFnReturn<() => Promise<T>> {
  const [state, fetch] = useAsyncFn(fn, deps);
  React.useEffect(() => {
    /**
     * 成功的时候发出信息
     * */
    if ('value' in state && successMessage !== undefined && !state.loading && !state.error) {
      enqueueSnackbar(successMessage, {
        variant: 'success',
      });
    }
    /**
     * 发生错误时发出信息
     * */
    if (state.error !== undefined && !state.loading) {
      enqueueSnackbar(state.error.message, {
        variant: 'error',
      });
    }
  }, [state, successMessage]);
  return [state, fetch];
}
