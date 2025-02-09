import UrlPaper from './url/urlPaper';
import type { HttpManager } from '@http/utils/http/httpManager';
import Request from './request/request';
import Response from './response/response';
import { useForceUpdate } from '@http/hooks/useForceUpdate';
import { HttpContext } from './HttpContext';

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
