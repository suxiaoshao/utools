import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { useAllTags } from '../../hooks/useAllTags';
import { TagEntity } from '../../database/entity/tag.entity';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description historyTags 的 prop
 * */
export interface HistoryTagsProp {
  /**
   * 被选中的 tags
   * */
  selectedTags: TagEntity[];

  /**
   * tags 改变时触发的方法
   * */
  onSelectedTasChanges(newSelectedTags: TagEntity[]): void;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description historyTags 组件
 * */
export default function HistoryTags(props: HistoryTagsProp): JSX.Element {
  /**
   * 数据库中所有的 tags
   * */
  const allTags = useAllTags();
  return (
    <Box sx={{ p: 1 }}>
      <Typography gutterBottom variant="body1">
        筛选标签
      </Typography>
      <Box sx={{ width: '100%', display: 'flex', overflow: 'auto' }}>
        {allTags.map((value) => (
          <Chip
            sx={{ mr: 1, mb: 1 }}
            onClick={() => {
              /**
               * 此 tag 在被选择的 tags 中时,在被选择的 tags 中删除这个 tag
               * */
              if (props.selectedTags.some((value1) => value1.tagId === value.tagId)) {
                const newSelectedTags = props.selectedTags.filter((value1) => value1.tagId !== value.tagId);
                props.onSelectedTasChanges(newSelectedTags);
              } else {
                /**
                 * 此 tag 不在被选择的 tags 中时,添加这个 tag 到被选择的 tags 中
                 * */
                const newSelectedTags = [...props.selectedTags, value];
                props.onSelectedTasChanges(newSelectedTags);
              }
            }}
            key={value.tagId}
            label={value.tagName}
            color={props.selectedTags.some((value1) => value1.tagId === value.tagId) ? 'primary' : undefined}
          />
        ))}
      </Box>
    </Box>
  );
}
