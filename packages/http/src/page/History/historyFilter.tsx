import React from 'react';
import { Box, ButtonProps, Divider, InputBase, Paper, Tooltip, Typography } from '@mui/material';
import { TagEntity } from '../../database/entity/tag.entity';
import MySelector, { ItemListProp, MySelectorProp } from '../../components/common/mySelector';
import { HttpMethod } from '../../utils/http/httpManager';
import { myMethodList } from '../Work/url/methodSelector';
import HistoryTags from './historyTags';

const itemList = [
  {
    value: undefined,
    text: '全部匹配',
  },
  ...(myMethodList as ItemListProp<HttpMethod | undefined>[]),
];

const ThisSelector = React.forwardRef<HTMLButtonElement, MySelectorProp<HttpMethod | undefined> & ButtonProps>(
  MySelector,
);

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description historyFilter 组件的 prop
 * */
export interface HistoryFilterProp {
  /**
   * 筛选的名字,为空时不筛选
   * */
  searchName: string;
  /**
   * 筛选的 tags,为空时不筛选
   * */
  tags: TagEntity[];
  /**
   * 赛选的方法名, undefined 时不筛选方法
   * */
  method: HttpMethod | undefined;

  /**
   * 改变筛选的方法触发的方法
   * */
  ocChangeMethod(newMethod: HttpMethod | undefined): void;

  /**
   * 改变筛选的名字触发的方法
   * */
  onSearchChange(newSearchName: string): void;

  /**
   * 改变筛选的 tags 触发的方法
   * */
  onChangeTags(newTags: TagEntity[]): void;
}
/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 筛选历史的组件
 * */
export default function HistoryFilter(props: HistoryFilterProp): JSX.Element {
  return (
    <Paper sx={(theme) => ({ width: `calc(100% - ${theme.spacing(4)})`, margin: theme.spacing(2) })}>
      <Box component="form" sx={{ padding: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}>
        {/* 筛选 http 方法 */}
        <Tooltip title={<Typography variant={'body2'}>筛选 http 方法</Typography>}>
          <ThisSelector sx={{ p: 1 }} value={props.method} onValueChange={props.ocChangeMethod} itemList={itemList} />
        </Tooltip>
        <Divider
          sx={{
            height: 28,
            margin: 0.5,
          }}
          orientation="vertical"
        />
        {/* 匹配 http 名字和 url */}
        <InputBase
          value={props.searchName}
          onChange={(event) => {
            props.onSearchChange(event.target.value);
          }}
          sx={{ ml: 1, flex: 1 }}
          placeholder="匹配 http 名字和 url"
        />
      </Box>
      <Divider variant="middle" />
      {/* 筛选 tags */}
      <HistoryTags selectedTags={props.tags} onSelectedTasChanges={props.onChangeTags} />
    </Paper>
  );
}
