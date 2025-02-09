import { useReducer } from 'react';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 强制更新本组件
 * */
export function useForceUpdate() {
  const [, forceUpdate] = useReducer((x, _y: string) => x + 1, 0);
  return () => {
    forceUpdate('');
  };
}
