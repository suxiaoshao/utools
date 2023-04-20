import { Box, Tabs } from '@mui/material';
import WorkPanel from './workPanel';
import { useHttpArray } from '../../store/httpArray';
import { useWorkIndex } from '../../store/workIndex';
import { TabPanelDisappear } from '../../components/common/tabPanel';
import WorkTab from './workTab';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 工作区
 * */
export default function Work(): JSX.Element {
  /**
   * 被激活的 http 请求下标
   * */
  const [workIndex] = useWorkIndex();
  /**
   * 全部的 http 请求
   * */
  const [httpArray] = useHttpArray();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      {/* 选项卡 */}
      <Tabs
        sx={{ flex: '0 0 auto', width: '100%' }}
        value={workIndex}
        variant="scrollable"
        indicatorColor="primary"
        textColor="primary"
      >
        {httpArray.map((item, index) => (
          <WorkTab index={index} httpManager={item} key={index} />
        ))}
      </Tabs>
      {/* 全部的 http 请求页面 */}
      {httpArray.map((item, index) => (
        <TabPanelDisappear
          sx={{
            flex: '1 1 0',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: 'calc(100% - 48px)',
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
