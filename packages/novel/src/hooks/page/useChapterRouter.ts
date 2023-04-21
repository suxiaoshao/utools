import { useQuery } from '../useQuery';
import { useActiveConfig } from '../data/useActiveConfig';
import React from 'react';
import { TotalConfig } from '../../utils/web/config/totalConfig';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  /**
   * 路由无效跳转首页
   * */
  React.useEffect(() => {
    if (!(activeConfig && novelId && chapterId)) {
      navigate('/');
    }
  }, [activeConfig, chapterId, navigate, novelId]);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return { activeConfig: activeConfig!, chapterId: chapterId ?? '', novelId: novelId ?? '' };
}
