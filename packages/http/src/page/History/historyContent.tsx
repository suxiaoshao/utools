/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2023-12-31 16:03:02
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2023-12-31 16:15:27
 * @FilePath: /utools/packages/http/src/page/History/historyContent.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import { TagEntity } from '@http/database/entity/tag.entity';
import HistoryItem from './historyItem';
import { HttpMethod } from '@http/utils/http/httpManager';
import { HttpEntity } from '@http/database/entity/http.entity';
import { useSqlData } from '@http/store/sqlStore';
import { Box, BoxProps } from '@mui/material';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description historyContent 组件的 prop
 * */
export interface HistoryContentProp extends BoxProps {
  /**
   * 搜索关键字,为空时全匹配
   * */
  searchName: string;
  /**
   * 被选中的标签,为空时全匹配
   * */
  selectedTags: TagEntity[];
  /**
   * 匹配的方法 ,为 undefined 时全匹配
   * */
  method: HttpMethod | undefined;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description historyContent 组件
 * */
export default function HistoryContent({
  searchName,
  selectedTags,
  method,
  sx,
  ...props
}: HistoryContentProp): JSX.Element {
  /**
   * 数据库数据
   * */
  const [sqlData] = useSqlData();
  /**
   * 被筛选出来的 http 历史
   * */
  const selectedHttp = React.useMemo<HttpEntity[]>(() => {
    let filterHttp: HttpEntity[] = [...sqlData.https];

    // 筛选名字和 url
    if (searchName !== '') {
      filterHttp = filterHttp.filter((value) => {
        //筛选名字
        if (value.name !== undefined && value.name.includes(searchName)) {
          return true;
        }
        //筛选 url
        return value.url !== undefined && value.url.includes(searchName);
      });
    }

    // 筛选标签
    if (selectedTags.length !== 0) {
      filterHttp = filterHttp.filter((http) =>
        selectedTags.every((tag) => http.tags?.find((value) => value.tagId === tag.tagId)),
      );
    }

    // 筛选方法
    if (method !== undefined) {
      filterHttp = filterHttp.filter((http) => http.method === method);
    }
    return filterHttp;
  }, [sqlData.https, method, searchName, selectedTags]);
  return (
    <Box {...props} sx={{ ...sx, overflow: 'auto' }}>
      {selectedHttp.map((value) => (
        <HistoryItem http={value} key={value.httpId} />
      ))}
    </Box>
  );
}
