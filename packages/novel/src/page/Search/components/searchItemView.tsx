import React from 'react';
import { Avatar, Card, CardContent, CardHeader, IconButton, Tooltip, Typography } from '@mui/material';
import { SearchListItem } from '../../../utils/web/search';
import { ExitToApp } from '@mui/icons-material';
import { TotalConfig } from '../../../utils/web/config/totalConfig';
import { historyStore } from '../../../store/history.store';
import ChapterLink from '../../../components/common/chapterLink';

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
                historyStore.push({
                  pathname: '/novel',
                  search: `novelId=${props.searchItem.novelId}&url=${props.activeConfig.mainPageUrl}`,
                  name: props.searchItem.novelName,
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
          最后一章 :{' '}
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
