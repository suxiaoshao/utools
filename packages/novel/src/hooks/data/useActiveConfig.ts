/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2023-08-21 18:17:36
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2023-11-10 18:53:55
 * @FilePath: /tauri/Users/weijie.su/Documents/code/self/utools/packages/novel/src/hooks/data/useActiveConfig.ts
 */
import { useQuery } from '../useQuery';
import React from 'react';
import { useAppSelector } from '@novel/app/hooks';
import { SelectConfig } from '@novel/app/config/configSlice';
import { TotalConfig } from '@novel/page/EditConfig/const';

export function useActiveConfig(): TotalConfig | undefined {
  const mainPageUrl = useQuery('url');
  const totalConfigs = useAppSelector(SelectConfig);
  return React.useMemo(() => {
    return totalConfigs.find((value) => value.mainPageUrl === mainPageUrl);
  }, [mainPageUrl, totalConfigs]);
}
