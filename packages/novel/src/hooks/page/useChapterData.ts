/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2023-08-21 18:17:36
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2023-11-10 18:53:30
 * @FilePath: /tauri/Users/weijie.su/Documents/code/self/utools/packages/novel/src/hooks/page/useChapterData.ts
 */
import { useAsyncFnWithNotify } from '../async/useAsyncFnWithNotify';
import { Content, type ContentData } from '@novel/utils/web/content';
import React from 'react';
import type { AsyncFnReturn } from 'react-use/lib/useAsyncFn';
import { TotalDataBuild } from '@novel/utils/data/totalData';
import type { Chapter } from '@novel/utils/web/novelInfo';
import type { TotalConfig } from '@novel/page/EditConfig/const';

export function useChapterData(
  activeConfig: TotalConfig,
  novelId: string,
  chapterId: string,
): AsyncFnReturn<() => Promise<ContentData>> {
  /**
   * 获取数据
   * */
  const [state, fn] = useAsyncFnWithNotify(
    async () => {
      if (activeConfig && novelId && chapterId) {
        const novel = new Content(activeConfig);
        const date = await novel.getContent(novelId, chapterId);
        return date;
      }
      throw new Error('参数错误');
    },
    undefined,
    [activeConfig?.mainPageUrl, novelId, chapterId],
  );
  React.useEffect(() => {
    fn();
  }, [fn]);
  /**
   * 更新阅读记录
   * */
  React.useEffect(() => {
    if (state.value && novelId && activeConfig?.mainPageUrl && chapterId) {
      const totalData = TotalDataBuild.getTotalData();
      const chapter: Chapter = { chapterId: chapterId, name: state.value.chapterName };
      totalData.updateRecord(chapter, novelId, activeConfig?.mainPageUrl);
    }
  }, [activeConfig?.mainPageUrl, chapterId, novelId, state.value]);
  return [state, fn];
}
