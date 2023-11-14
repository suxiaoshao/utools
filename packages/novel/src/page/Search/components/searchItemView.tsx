/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2023-08-21 18:17:36
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2023-11-10 18:51:14
 * @FilePath: /tauri/Users/weijie.su/Documents/code/self/utools/packages/novel/src/page/Search/components/searchItemView.tsx
 */
import { Avatar, Card, CardContent, CardHeader, IconButton, Tooltip, Typography } from '@mui/material';
import { SearchListItem } from '@novel/utils/web/search';
import { ExitToApp } from '@mui/icons-material';
import ChapterLink from '@novel/components/common/chapterLink';
import { useCustomNavigate } from '@novel/app/history/historySlice';
import { TotalConfig } from '@novel/page/EditConfig/const';

export interface SearchItemProp {
  /**
   * 搜索结果
   * */
  searchItem: SearchListItem;
  /**
   * 配置
   * */
  activeConfig: TotalConfig;
}

export default function SearchItemView(props: SearchItemProp): JSX.Element {
  const navigate = useCustomNavigate();
  return (
    <Card sx={{ margin: 1, width: (theme) => `calc(50% - ${theme.spacing(2)})` }}>
      <CardHeader
        avatar={<Avatar src={props.searchItem.image} />}
        title={props.searchItem.novelName}
        subheader={`${props.searchItem.label} · ${props.searchItem.authorName}`}
        action={
          <Tooltip title={'前往小说页面'}>
            <IconButton
              onClick={() => {
                navigate(props.searchItem.novelName, {
                  tag: 'push',
                  data: `/novel?novelId=${props.searchItem.novelId}&url=${props.activeConfig.mainPageUrl}`,
                });
              }}
            >
              <ExitToApp />
            </IconButton>
          </Tooltip>
        }
      />
      <CardContent>
        <Typography variant="body2" component="p" gutterBottom>
          {props.searchItem.desc}
        </Typography>
        <Typography color={'textSecondary'}>
          最后一章 :
          <ChapterLink
            chapter={props.searchItem.latestChapter}
            novelId={props.searchItem.novelId}
            url={props.activeConfig.mainPageUrl}
          />
        </Typography>
        <Typography color={'textSecondary'}>最后更新时间 : {props.searchItem.updateTime}</Typography>
      </CardContent>
    </Card>
  );
}
