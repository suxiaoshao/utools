import React from 'react';
import CustomSelector, { type ItemListProp } from '@http/components/CustomSelector';
import type { RequestBodyChoose, RequestTextChoose } from '@http/utils/http/httpRequest';
import { RequestContext } from './RequestContext';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { CommonStyle } from '@http/hooks/useRestyle';

const bodyItemList: ItemListProp<RequestBodyChoose>[] = (
  ['none', 'text', 'form-data', 'x-www-form-urlencoded'] as const
).map<ItemListProp<RequestBodyChoose>>((value) => {
  return {
    text: value,
    value: value,
  };
});
const textItemList: ItemListProp<RequestTextChoose>[] = (
  ['json', 'html', 'xml', 'javascript', 'plaintext'] as const
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
 * @description request 的切换按钮
 * */
export default function ReqToggle(props: {
  /**
   * 当前被激活的页面名
   * */
  value: string;
  /**
   * 被激活页面触发的方法
   * */
  onchangeValue(newValue: string): void;
}) {
  const { request, fatherUpdate } = React.useContext(RequestContext);
  return (
    <Box sx={CommonStyle.toggle}>
      {/* 切换页面按钮 */}
      <ToggleButtonGroup
        value={props.value}
        size="small"
        exclusive
        onChange={(event, value: string | null) => {
          if (value !== null) {
            props.onchangeValue(value);
          }
        }}
      >
        <ToggleButton sx={CommonStyle.toggleButton} value="params">
          Params
        </ToggleButton>
        <ToggleButton sx={CommonStyle.toggleButton} value="headers">
          Headers
        </ToggleButton>
        <ToggleButton sx={CommonStyle.toggleButton} value="body">
          Body
        </ToggleButton>
      </ToggleButtonGroup>
      {/* 页面为 body 时 ,切换内容按钮*/}
      {props.value === 'body' && (
        <>
          <CustomSelector<RequestBodyChoose>
            variant="outlined"
            value={request.bodyChoose}
            onChange={(newValue) => {
              request.bodyChoose = newValue;
              fatherUpdate();
            }}
            itemList={bodyItemList}
          />
          {/* 内容为 text 时,切换语言按钮 */}
          {request.bodyChoose === 'text' && (
            <CustomSelector<RequestTextChoose>
              variant="outlined"
              value={request.textChoose}
              onChange={(newValue) => {
                request.textChoose = newValue;
                fatherUpdate();
              }}
              itemList={textItemList}
            />
          )}
        </>
      )}
    </Box>
  );
}
