import { useAsyncFnWithNotify } from '../async/useAsyncFnWithNotify';
import { Content, ContentData } from '../../utils/web/content';
import React from 'react';
import { TotalConfig } from '../../utils/web/config/totalConfig';
import { AsyncFnReturn } from 'react-use/lib/useAsyncFn';
import { TotalDataBuild } from '../../utils/data/totalData';
import { Chapter } from '../../utils/web/novelInfo';

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
      } else {
        throw new Error('参数错误');
      }
    },
    undefined,
    [activeConfig?.mainPageUrl, novelId, chapterId],
  );
  React.useEffect(() => {
    fn().then();
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