import React from 'react';
import { Box, BoxProps, Card, CardContent, CardHeader, IconButton, Tooltip, Typography } from '@mui/material';
import TagItem from '@http/components/common/tag/tagItem';
import AddTag from '@http/components/common/tag/addTag';
import { AddCircle, ArrowBack, ArrowForward } from '@mui/icons-material';
import { TagEntity } from '@http/database/entity/tag.entity';
import { useAllTags } from '@http/hooks/useAllTags';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description tagsForm 的 prop
 * */
export interface TagsFormProp extends BoxProps {
  /**
   * 被选择的 tags
   * */
  selectedTags: TagEntity[];

  /**
   * 触发被选择 tags 更新的方法
   * */
  onSelectedTasChanges(newSelectedTags: TagEntity[]): void;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description tags 选择表单组件
 * */
export default function TagsForm({ selectedTags, onSelectedTasChanges, sx, ...props }: TagsFormProp): JSX.Element {
  /**
   * 所有的 tags
   * */
  const allTags = useAllTags();
  /**
   * 没选择的 tags
   * */
  const unselectedTags = React.useMemo<TagEntity[]>(() => {
    return allTags.filter((value) => !selectedTags.some((value1) => value1.tagId === value.tagId));
  }, [allTags, selectedTags]);
  return (
    <Box {...props} sx={{ ...{ display: 'flex' }, ...sx }}>
      {/* 已被选择的标签 */}
      <Card sx={{ flex: '1 1 0', display: 'flex', flexDirection: 'column', m: 1 }}>
        <CardHeader
          title="已被选择的标签"
          action={
            /**
             * 清除所有选择的标签
             * */
            <Tooltip title={<Typography variant={'body2'}>全部清除</Typography>}>
              <div>
                <IconButton
                  onClick={() => {
                    onSelectedTasChanges([]);
                  }}
                  disabled={selectedTags.length === 0}
                >
                  <ArrowForward />
                </IconButton>
              </div>
            </Tooltip>
          }
        />
        <CardContent sx={{ display: 'flex', overflow: 'auto', flexWrap: 'wrap', flex: '1 1 0', position: 'relative' }}>
          {selectedTags.map((value) => (
            <TagItem
              sx={{ m: 1 }}
              key={value.tagId}
              tagEntity={value}
              onClick={() => {
                const newSelectedTags = selectedTags.filter((value1) => value1.tagId !== value.tagId);
                onSelectedTasChanges(newSelectedTags);
              }}
            />
          ))}
        </CardContent>
      </Card>
      {/* 未被选择的标签 */}
      <Card sx={{ flex: '1 1 0', display: 'flex', flexDirection: 'column', m: 1 }}>
        <CardHeader
          title="未被选择的标签"
          action={
            /**
             * 全部选中
             * */
            <Tooltip title={<Typography variant={'body2'}>全部选中</Typography>}>
              <div>
                <IconButton
                  disabled={unselectedTags.length === 0}
                  onClick={() => {
                    onSelectedTasChanges([...allTags]);
                  }}
                >
                  <ArrowBack />
                </IconButton>
              </div>
            </Tooltip>
          }
        />
        <CardContent sx={{ display: 'flex', overflow: 'auto', flexWrap: 'wrap', flex: '1 1 0', position: 'relative' }}>
          {unselectedTags.map((value) => (
            <TagItem
              sx={{ m: 1 }}
              onClick={() => {
                const newSelectedTags = [...selectedTags, value];
                onSelectedTasChanges(newSelectedTags);
              }}
              tagEntity={value}
              key={value.tagId}
              icon={<AddCircle />}
            />
          ))}
        </CardContent>
        <AddTag />
      </Card>
    </Box>
  );
}
