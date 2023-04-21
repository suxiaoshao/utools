import React from 'react';
import { Avatar, Card, CardContent, CardHeader, IconButton, Tooltip, Typography } from '@mui/material';
import { SearchListItem } from '../../../utils/web/search';
import { ExitToApp } from '@mui/icons-material';
import { TotalConfig } from '../../../utils/web/config/totalConfig';
import ChapterLink from '../../../components/common/chapterLink';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
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
                navigate(`/novel?novelId=${props.searchItem.novelId}&url=${props.activeConfig.mainPageUrl}`);
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
