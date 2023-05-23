import React from 'react';
import MySelector from '../../../components/common/mySelector';
import { HttpContext } from '../workPanel';
import { useForceUpdate } from '../../../hooks/useForceUpdate';
import { HttpMethod } from '../../../utils/http/httpManager';

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
export default function MethodSelector(): JSX.Element {
  const forceUpdate = useForceUpdate();
  const { httpManager } = React.useContext(HttpContext);
  return (
    <MySelector<HttpMethod>
      value={httpManager.method}
      onValueChange={(newValue) => {
        httpManager.method = newValue;
        forceUpdate();
      }}
      itemList={myMethodList}
      sx={{ p: 1 }}
    />
  );
}
