import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Loading } from '../components/common/loading';
import { FontSize, useFontSize } from '../store/setting.store';
import { useChapterRouter } from '../hooks/page/useChapterRouter';
import { useChapterData } from '../hooks/page/useChapterData';
import { useCustomNavigate } from '../app/history/historySlice';

export interface FontStyleProp {
  fontSize: FontSize;
}

export default function ChapterPage(): JSX.Element {
  /**
   * 路由数据
   * */
  const { activeConfig, novelId, chapterId } = useChapterRouter();
  const navigate = useCustomNavigate();
  const [fontSize] = useFontSize();
  /**
   * 章节数据
   * */
  const [state, fn] = useChapterData(activeConfig, novelId, chapterId);
  /**
   * 跳转章节
   * */
  const pushToChapter = React.useCallback(
    (chapterId: string) => {
      navigate(`${state.value?.chapterName}`, {
        tag: 'replace',
        data: `/chapter?novelId=${novelId}&url=${activeConfig?.mainPageUrl}&chapterId=${chapterId}`,
      });
    },
    [navigate, state.value?.chapterName, novelId, activeConfig?.mainPageUrl],
  );
  /**
   * 跳转目录
   * */
  const pushNovel = React.useCallback(() => {
    navigate(state.value?.novelName ?? '', {
      tag: 'push',
      data: `/novel?novelId=${novelId}&url=${activeConfig?.mainPageUrl}`,
    });
  }, [activeConfig?.mainPageUrl, navigate, novelId, state.value?.novelName]);
  /**
   * 左右翻页
   * */
  React.useEffect(() => {
    const hand = (ev: KeyboardEvent) => {
      if (novelId && state.value) {
        switch (ev.key) {
          case 'ArrowRight':
            if (state.value.nextChapterId) {
              pushToChapter(state.value.nextChapterId);
            }
            break;
          case 'ArrowLeft':
            if (state.value.preChapterId) {
              pushToChapter(state.value.preChapterId);
            }
            break;
          case 'Enter':
            pushNovel();
            break;
        }
      }
    };
    document.addEventListener('keydown', hand);
    return () => {
      document.removeEventListener('keydown', hand);
    };
  }, [novelId, pushNovel, pushToChapter, state.value]);
  /**
   * 上下章翻页
   * */
  const action = React.useMemo(() => {
    return (
      state.value && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ minWidth: '50%', display: 'flex', justifyContent: 'space-between' }}>
            {state.value.preChapterId && (
              <Button
                onClick={() => {
                  pushToChapter(state.value?.preChapterId ?? '');
                }}
                color={'primary'}
              >
                上一章
              </Button>
            )}
            <Button onClick={pushNovel} color={'primary'}>
              《{state.value.novelName}》目录
            </Button>
            {state.value.nextChapterId && (
              <Button
                onClick={() => {
                  pushToChapter(state.value?.nextChapterId ?? '');
                }}
                color={'primary'}
              >
                下一章
              </Button>
            )}
          </Box>
        </Box>
      )
    );
  }, [pushNovel, pushToChapter, state.value]);
  return (
    <Box sx={{ padding: 1, overflow: 'auto', width: '100%', height: '100%' }}>
      <Loading state={{ ...state, retry: fn }}>
        {state.value && (
          <>
            <Typography variant={'h5'} sx={{ textAlign: 'center' }}>
              {state.value.chapterName}
            </Typography>
            {action}
            {state.value.contentList.map((value, index) => (
              <Typography
                sx={{
                  textIndent: '2em',
                  fontSize: (theme) => theme.spacing(1.5 + fontSize / 10),
                }}
                paragraph
                variant={'body1'}
                component={'p'}
                key={index}
              >
                {value}
              </Typography>
            ))}
            {action}
          </>
        )}
      </Loading>
    </Box>
  );
}
