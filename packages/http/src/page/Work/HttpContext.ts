import { HttpManager } from '@http/utils/http/httpManager';
import React from 'react';

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
