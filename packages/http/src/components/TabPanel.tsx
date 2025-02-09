/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2023-12-31 16:03:02
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2023-12-31 16:15:05
 * @FilePath: /utools/packages/http/src/components/TabPanel.tsx
 */
import { Box, type BoxProps } from '@mui/material';
import { match } from 'ts-pattern';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 选项卡内容的 prop
 * */
interface TabPanelProps extends BoxProps {
  /**
   * 选项卡内存放的组件
   * */
  children?: React.ReactNode;
  /**
   * 此选项卡绑定的值
   * */
  index: number | string;
  /**
   * 应该被激活的选项卡绑定的值
   * */
  value: number | string;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 选项卡不被激活时不在 dom 上
 * */
export function TabPanelDisappear(props: TabPanelProps) {
  return match(props.index)
    .with(props.value, () => <Box {...props} />)
    .otherwise(() => null);
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 选项卡不被激活时会将元素从 可访问性树 accessibility tree 中移除,
 * 但是还在 dom 树山,子组件还是会保留
 * */
export function TabPanelHidden({ index, value, children, sx, ...props }: TabPanelProps) {
  return (
    <Box
      sx={{
        ...sx,
        ...match(index)
          .with(value, () => undefined)
          .otherwise(() => ({ display: 'none' })),
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
