import React from 'react';
import { Box } from '@mui/material';
import HistoryFilter from './historyFilter';
import { TagEntity } from '../../database/entity/tag.entity';
import HistoryContent from './historyContent';
import { MyMethod } from '../../utils/http/httpManager';
import LoadingPage from '../../components/common/loadingPage';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 历史记录页面
 * */
export default function HistoryPage(): JSX.Element {
  /**
   * 搜索名
   * */
  const [searchName, setSearchName] = React.useState<string>('');
  /**
   * 被选择的标签
   * */
  const [selectedTags, setSelectedTags] = React.useState<TagEntity[]>([]);
  /**
   * 选择的方法
   * */
  const [method, setMethod] = React.useState<MyMethod | undefined>(undefined);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', position: 'relative', width: '100%', height: '100%' }}>
      <LoadingPage />
      {/* 筛选表单 */}
      <HistoryFilter
        tags={selectedTags}
        onChangeTags={setSelectedTags}
        searchName={searchName}
        onSearchChange={setSearchName}
        method={method}
        ocChangeMethod={setMethod}
      />
      {/* 被筛选后的内容 */}
      <HistoryContent method={method} searchName={searchName} selectedTags={selectedTags} sx={{ flex: '1 1 0' }} />
    </Box>
  );
}
