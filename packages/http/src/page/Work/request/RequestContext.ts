import { HttpRequest } from '@http/utils/http/httpRequest';
import React from 'react';

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
  fatherUpdate: () => void;
}>({
  request: HttpRequest.getNewRequestContent(),
  fatherUpdate() {
    /**  */
  },
});
