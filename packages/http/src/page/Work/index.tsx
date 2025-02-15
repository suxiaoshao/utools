import { Box, Tabs } from '@mui/material';
import WorkPanel from './workPanel';
import { useHttpArray } from '@http/store/httpArray';
import { TabPanelDisappear } from '@http/components/TabPanel';
import WorkTab from './workTab';
import { selectIndex, useTabsStore } from '@http/app/features/tabsSlice';
import { useShallow } from 'zustand/react/shallow';

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
  const workIndex = useTabsStore(useShallow(selectIndex));
  /**
   * 全部的 http 请求
   * */
  const [httpArray] = useHttpArray();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', flex: '0 0 auto' }}>
        {/* 选项卡 */}
        <Tabs
          sx={{ width: '100%' }}
          value={workIndex}
          variant="scrollable"
          indicatorColor="primary"
          textColor="primary"
        >
          {httpArray.map((item, index) => (
            <WorkTab index={index} httpManager={item} key={index} />
          ))}
        </Tabs>
      </Box>
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
          <WorkPanel http={item} />
        </TabPanelDisappear>
      ))}
    </Box>
  );
}
