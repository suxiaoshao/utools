import React from 'react';
import CustomSelector from '@http/components/CustomSelector';
import { HttpContext } from '../workPanel';
import { useForceUpdate } from '@http/hooks/useForceUpdate';
import type { HttpMethod } from '@http/utils/http/httpManager';

export const myMethodList: { text: string; value: HttpMethod }[] = (
  ['GET', 'POST', 'HEAD', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'] as const
).map((value) => {
  return {
    text: value,
    value: value,
  };
});
/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 切换 http 方法的组件
 * */
export default function MethodSelector() {
  const forceUpdate = useForceUpdate();
  const { httpManager } = React.useContext(HttpContext);
  return (
    <CustomSelector<HttpMethod>
      value={httpManager.method}
      onChange={(newValue) => {
        httpManager.method = newValue;
        forceUpdate();
      }}
      itemList={myMethodList}
      sx={{ p: 1 }}
    />
  );
}
