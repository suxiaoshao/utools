import React from 'react';
import { useQuery } from '@novel/hooks/useQuery';
import { useAsyncFnWithNotify } from '@novel/hooks/async/useAsyncFnWithNotify';
import { NovelInfo } from '@novel/utils/web/novelInfo';
import { Avatar, Box, Card, CardContent, CardHeader, IconButton, Tooltip, Typography } from '@mui/material';
import { Loading } from '@novel/components/common/loading';
import { useActiveConfig } from '@novel/hooks/data/useActiveConfig';
import ChapterLink from '@novel/components/common/chapterLink';
import { Star, StarBorder } from '@mui/icons-material';
import { type ReadRecord, TotalDataBuild } from '@novel/utils/data/totalData';
import { useIsStar } from '@novel/hooks/data/useIsStar';
import { useCustomNavigate } from '@novel/app/history/historySlice';
import { match } from 'ts-pattern';

export default function NovelPage() {
  /**
   * 小说 id
   * */
  const novelId = useQuery('novelId');
  /**
   * 配置
   * */
  const activeConfig = useActiveConfig();
  const navigate = useCustomNavigate();
  React.useEffect(() => {
    if (!(activeConfig && novelId)) {
      navigate('搜索', { tag: 'push', data: '/' });
    }
  }, [activeConfig, navigate, novelId]);
  /**
   * 是否收藏
   * */
  const { isStar, getIsStar } = useIsStar(novelId ?? '', activeConfig?.mainPageUrl ?? '');
  const [state, fn] = useAsyncFnWithNotify(
    async () => {
      if (activeConfig && novelId) {
        const novel = new NovelInfo(activeConfig);
        return await novel.getDirectoryAndInfo(novelId);
      }
      throw new Error('参数错误');
    },
    undefined,
    [activeConfig?.mainPageUrl, novelId],
  );
  React.useEffect(() => {
    fn();
  }, [fn]);
  return (
    <Loading state={{ ...state, retry: fn }}>
      {state.value && novelId && activeConfig && (
        <Card
          sx={{
            margin: 1,
            marginTop: 0,
            height: (theme) => `calc(100% - ${theme.spacing(1)})`,
            overflow: 'auto',
          }}
        >
          <CardHeader
            avatar={<Avatar src={state.value.image} />}
            title={state.value.name}
            subheader={state.value.author}
            action={
              <Tooltip
                title={match(isStar)
                  .with(true, () => '取消收藏')
                  .otherwise(() => '收藏')}
              >
                <IconButton
                  onClick={() => {
                    const totalData = TotalDataBuild.getTotalData();
                    if (isStar) {
                      totalData.removeRecord(novelId, activeConfig?.mainPageUrl);
                    } else {
                      const newReadCord: ReadRecord = {
                        author: state.value?.author ?? '',
                        chapter: state.value?.directories[0] ?? { chapterId: '', name: '' },
                        mainPageUrl: activeConfig?.mainPageUrl ?? '',
                        name: state.value?.name ?? '',
                        novelId: novelId,
                        desc: state.value?.desc ?? '',
                        image: state.value?.image ?? null,
                      };
                      totalData.addReadRecord(newReadCord);
                    }
                    getIsStar();
                  }}
                >
                  {match(isStar)
                    .with(true, () => <Star />)
                    .otherwise(() => (
                      <StarBorder />
                    ))}
                </IconButton>
              </Tooltip>
            }
          />
          <CardContent>
            <Typography variant="body2" component="p" gutterBottom>
              {state.value.desc}
            </Typography>
            <Typography color="textSecondary">
              最后一章 :{' '}
              <ChapterLink chapter={state.value.latestChapter} novelId={novelId} url={activeConfig.mainPageUrl} />
            </Typography>
            <Typography gutterBottom color="textSecondary">
              最后更新时间 : {state.value.lastUpdateTime}
            </Typography>
            <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
              {state.value.directories.map((value) => (
                <ChapterLink
                  sx={{ width: '33%', fontSize: '15px', marginTop: 0.5 }}
                  chapter={value}
                  url={activeConfig.mainPageUrl}
                  key={value.chapterId}
                  novelId={novelId}
                />
              ))}
            </Box>
          </CardContent>
        </Card>
      )}
    </Loading>
  );
}
