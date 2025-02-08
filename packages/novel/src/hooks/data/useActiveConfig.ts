/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2023-08-21 18:17:36
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2023-11-10 18:53:55
 * @FilePath: /tauri/Users/weijie.su/Documents/code/self/utools/packages/novel/src/hooks/data/useActiveConfig.ts
 */
import { useQuery } from '../useQuery';
import React from 'react';
import { useConfigStore } from '@novel/app/config/configSlice';
import type { TotalConfig } from '@novel/page/EditConfig/const';
import { useShallow } from 'zustand/react/shallow';

export function useActiveConfig(): TotalConfig | undefined {
  const mainPageUrl = useQuery('url');
  const totalConfigs = useConfigStore(useShallow(({ value }) => value));
  return React.useMemo(() => {
    return totalConfigs.find((value) => value.mainPageUrl === mainPageUrl);
  }, [mainPageUrl, totalConfigs]);
}
