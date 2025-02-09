import { HttpResponse } from '@http/utils/http/httpResponse';
import React from 'react';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description response 数据的上下文
 * */

export const ResponseContext = React.createContext<{
  /**
   * http 的 response 数据
   * */
  response: HttpResponse;
  /**
   * 更新
   * */
  fatherUpdate: () => void;
}>({
  response: HttpResponse.getNewResponseContent(),
  fatherUpdate() {
    /**  */
  },
});
