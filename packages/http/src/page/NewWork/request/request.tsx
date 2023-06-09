import React from 'react';
import ReqToggle from './reqToggle';
import Params from './params';
import ReqHeaders from './reqHeaders';
import ReqBody from './reqBody/reqBody';
import { TabPanelDisappear } from '@http/components/TabPanel';
import { HttpContext } from '../workPanel';
import { HttpRequest } from '@http/utils/http/httpRequest';
import { NoneFunc, useForceUpdate } from '@http/hooks/useForceUpdate';
import { CommonStyle } from '@http/hooks/useRestyle';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description request 数据的上下文
 * */
export const RequestContext = React.createContext<{
  /**
   * request 数据
   * */
  request: HttpRequest;
  /**
   * request 注入器组件的强制更新
   * */
  fatherUpdate: NoneFunc;
}>({
  request: HttpRequest.getNewRequestContent(),
  fatherUpdate() {
    /**  */
  },
});

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description request 注入器组件
 * */
function RequestProvider(props: {
  /**
   * 子组件
   * */
  children: React.ReactNode;
}): JSX.Element {
  const {
    httpManager: { request },
  } = React.useContext(HttpContext);
  const forceUpdate = useForceUpdate();
  return (
    <RequestContext.Provider value={{ request: request, fatherUpdate: forceUpdate }}>
      {props.children}
    </RequestContext.Provider>
  );
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description request 组件,用于修改 request 的数据
 * */
export default function Request(): JSX.Element {
  /**
   * 显示的页面的名字
   * */
  const [value, setValue] = React.useState<string>('params');
  const {
    httpManager: { isRequest },
  } = React.useContext(HttpContext);
  return (
    <RequestProvider>
      <TabPanelDisappear sx={CommonStyle.main} index={1} value={Number(isRequest)}>
        <ReqToggle
          value={value}
          onchangeValue={(newValue) => {
            setValue(newValue);
          }}
        />
        <TabPanelDisappear sx={CommonStyle.page} index={'params'} value={value}>
          <Params />
        </TabPanelDisappear>
        <TabPanelDisappear sx={CommonStyle.page} value={value} index="headers">
          <ReqHeaders />
        </TabPanelDisappear>
        <TabPanelDisappear sx={CommonStyle.page} value={value} index="body">
          <ReqBody />
        </TabPanelDisappear>
      </TabPanelDisappear>
    </RequestProvider>
  );
}
