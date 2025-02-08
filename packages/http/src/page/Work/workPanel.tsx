import React from 'react';
import UrlPaper from './url/urlPaper';
import { HttpManager } from '@http/utils/http/httpManager';
import Request from './request/request';
import Response from './response/response';
import { useForceUpdate } from '@http/hooks/useForceUpdate';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description http 管理对象上下文
 * */
export const HttpContext = React.createContext<{
  /**
   * http 请求管理对象
   * */
  httpManager: HttpManager;
  /**
   * 更新主动更新 provider
   * */
  fatherUpdate: () => void;
}>({
  httpManager: HttpManager.getNewHttp(),
  fatherUpdate() {
    /**  */
  },
});

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description http 管理对象注入器组件
 * */
function HttpProvider(props: {
  /**
   * 子组件
   * */
  children: React.ReactNode;
  /**
   * http 管理对象
   * */
  http: HttpManager;
}) {
  const forceUpdate = useForceUpdate();
  return (
    <HttpContext.Provider value={{ httpManager: props.http, fatherUpdate: forceUpdate }}>
      {props.children}
    </HttpContext.Provider>
  );
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description http 工作选项卡
 * */
export default function WorkPanel(props: {
  /**
   * http 管理对象
   * */
  http: HttpManager;
}) {
  return (
    <HttpProvider http={props.http}>
      <UrlPaper />
      <Request />
      <Response />
    </HttpProvider>
  );
}
