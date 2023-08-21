import { useQuery } from '../useQuery';
import React from 'react';
import { TotalConfig } from '@novel/utils/web/config/totalConfig';
import { useAppSelector } from '@novel/app/hooks';
import { SelectConfig } from '@novel/app/config/configSlice';

export function useActiveConfig(): TotalConfig | undefined {
  const mainPageUrl = useQuery('url');
  const totalConfigs = useAppSelector(SelectConfig);
  return React.useMemo(() => {
    return totalConfigs.find((value) => value.mainPageUrl === mainPageUrl);
  }, [mainPageUrl, totalConfigs]);
}
