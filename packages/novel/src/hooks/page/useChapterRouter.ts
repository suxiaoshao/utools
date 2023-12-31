/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2023-08-21 18:17:36
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2023-11-10 18:53:42
 * @FilePath: /tauri/Users/weijie.su/Documents/code/self/utools/packages/novel/src/hooks/page/useChapterRouter.ts
 */
import { useQuery } from '../useQuery';
import { useActiveConfig } from '../data/useActiveConfig';
import React from 'react';
import { useCustomNavigate } from '@novel/app/history/historySlice';
import { TotalConfig } from '@novel/page/EditConfig/const';

export function useChapterRouter(): { activeConfig: TotalConfig; chapterId: string; novelId: string } {
  /**
   * 小说id
   * */
  const novelId = useQuery('novelId');
  /**
   * 配置
   * */
  const activeConfig = useActiveConfig();
  /**
   * 章节id
   * */
  const chapterId = useQuery('chapterId');
  const navigate = useCustomNavigate();
  /**
   * 路由无效跳转首页
   * */
  React.useEffect(() => {
    if (!(activeConfig && novelId && chapterId)) {
      navigate('搜索', { tag: 'push', data: '/' });
    }
  }, [activeConfig, chapterId, navigate, novelId]);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return { activeConfig: activeConfig!, chapterId: chapterId ?? '', novelId: novelId ?? '' };
}
