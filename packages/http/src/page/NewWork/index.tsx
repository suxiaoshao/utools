/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2024-01-06 01:37:31
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2024-03-08 20:51:48
 * @FilePath: /self-tools/Users/sushao/Documents/code/utools/packages/http/src/page/NewWork/index.tsx
 */
import { Box } from '@mui/material';
import WorkPanel from './workPanel';
import { TabPanelDisappear } from '@http/components/TabPanel';
import { useAppDispatch, useAppSelector } from '@http/app/hooks';
import { SelectIndex, SelectTabs, addTab, deleteTab, updateActiveTab } from '@http/app/features/tabsSlice';
import CustomTabs, { CustomTab } from '@http/components/CustomTab';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 工作区
 * */
export default function Work() {
  /**
   * 被激活的 http 请求下标
   * */
  const workIndex = useAppSelector(SelectIndex);
  /**
   * 全部的 http 请求
   * */
  const httpArray = useAppSelector(SelectTabs);
  const dispatch = useAppDispatch();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <CustomTabs
        onAdd={() => {
          dispatch(addTab());
        }}
      >
        {httpArray.map((item, index) => (
          <CustomTab
            label={item.name || item.request.url || '空'}
            active={workIndex === index}
            key={index}
            onClose={() => {
              dispatch(deleteTab(index));
            }}
            onClick={() => {
              dispatch(updateActiveTab(index));
            }}
          />
        ))}
      </CustomTabs>

      {/* 全部的 http 请求页面 */}
      {httpArray.map((item, index) => (
        <TabPanelDisappear
          sx={{
            flex: '1 1 0',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: 'calc(100% - 44px)',
          }}
          key={index}
          index={workIndex}
          value={index}
        >
          <WorkPanel http={item} index={index} />
        </TabPanelDisappear>
      ))}
    </Box>
  );
}
