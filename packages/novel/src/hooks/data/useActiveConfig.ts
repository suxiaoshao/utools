import { useQuery } from '../useQuery';
import React from 'react';
import { TotalConfig } from '../../utils/web/config/totalConfig';
import { useAppSelector } from '../../app/hooks';
import { SelectConfig } from '../../app/config/configSlice';

export function useActiveConfig(): TotalConfig | undefined {
  const mainPageUrl = useQuery('url');
  const totalConfigs = useAppSelector(SelectConfig);
  return React.useMemo(() => {
    return totalConfigs.find((value) => value.mainPageUrl === mainPageUrl);
  }, [mainPageUrl, totalConfigs]);
}
