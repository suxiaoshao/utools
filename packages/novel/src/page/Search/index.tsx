import React from 'react';
import { Search } from '@novel/utils/web/search';
import SearchInput from './components/searchInput';
import { useAsyncFnWithNotify } from '@novel/hooks/async/useAsyncFnWithNotify';
import { Loading } from '@novel/components/common/loading';
import SearchItemView from './components/searchItemView';
import { useQuery } from '@novel/hooks/useQuery';
import { Box } from '@mui/material';
import { useCustomNavigate } from '@novel/app/history/historySlice';
import { useAppSelector } from '@novel/app/hooks';
import { SelectConfig } from '@novel/app/config/configSlice';

/**
 * 搜索页
 * */
export default function SearchPage() {
  const totalConfigs = useAppSelector(SelectConfig);
  /**
   * 搜索关键词
   * */
  const searchName = useQuery('searchName') ?? '';

  /**
   * 主页url
   * */
  const mainPageUrl = useQuery('mainPageUrl') ?? totalConfigs[0]?.mainPageUrl ?? '';
  /**
   * 活跃配置
   * */
  const activeConfig = React.useMemo(() => {
    return totalConfigs.find((value) => value.mainPageUrl === mainPageUrl);
  }, [mainPageUrl, totalConfigs]);
  /**
   * 显示的 搜索词
   * */
  const [newSearchName, setNewSearchName] = React.useState(searchName);
  const navigator = useCustomNavigate();
  /**
   * 跳转指令
   * */
  const push = React.useCallback(
    (search: string, mainPage: string) => {
      navigator('搜索', { tag: 'replace', data: `/?searchName=${search}&mainPageUrl=${mainPage}` });
    },
    [navigator],
  );
  const [state, fn] = useAsyncFnWithNotify(
    async () => {
      if (activeConfig) {
        const search = new Search(activeConfig);
        return await search.getSearchList(searchName);
      }
    },
    undefined,
    [activeConfig, searchName],
  );
  React.useEffect(() => {
    if (searchName !== '') {
      fn();
    }
  }, [fn, searchName, activeConfig]);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <SearchInput
        onSearchNameChange={setNewSearchName}
        searchName={newSearchName}
        activeConfig={activeConfig}
        onActiveConfigChange={(newConfig) => {
          push(searchName, newConfig?.mainPageUrl ?? '');
        }}
        onSearch={() => {
          push(newSearchName, mainPageUrl);
        }}
      />
      <Box sx={{ flex: '1 1 0', overflow: 'auto', display: 'flex', flexWrap: 'wrap', alignItems: 'start' }}>
        <Loading state={{ ...state, retry: fn }}>
          {activeConfig &&
            state.value?.map((value) => (
              <SearchItemView activeConfig={activeConfig} searchItem={value} key={value.novelId} />
            ))}
        </Loading>
      </Box>
    </Box>
  );
}
