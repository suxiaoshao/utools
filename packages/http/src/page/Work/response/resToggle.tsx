import React from 'react';
import { ResponseContext } from './response';
import MySelector from '@http/components/common/mySelector';
import { ResponseContentType, ResponseTextType } from '@http/utils/http/httpResponse';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { CommonStyle } from '@http/hooks/useRestyle';

const contentItemList = (['text', 'image'] as const).map((value) => {
  return {
    value: value,
    text: value,
  };
});
const textItemList = (['plain', 'json', 'xml', 'html', 'css', 'javascript'] as const).map((value) => {
  return {
    value: value,
    text: value,
  };
});
/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description response 的页面切换按钮
 * */
export default function ResToggle(props: { value: string; onchangeValue(newValue: string): void }): JSX.Element {
  const { response, fatherUpdate } = React.useContext(ResponseContext);
  return (
    <Box sx={CommonStyle.toggle}>
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
        <ToggleButton sx={CommonStyle.toggleButton} value="body">
          Body
        </ToggleButton>
        <ToggleButton sx={CommonStyle.toggleButton} value="cookies">
          Cookies
        </ToggleButton>
        <ToggleButton sx={CommonStyle.toggleButton} value="headers">
          Headers
        </ToggleButton>
      </ToggleButtonGroup>
      {props.value === 'body' && (
        <>
          <MySelector<ResponseContentType>
            value={response.contentType}
            onValueChange={(newValue) => {
              response.contentType = newValue;
              fatherUpdate();
            }}
            itemList={contentItemList}
            variant="outlined"
          />
          {response.contentType === 'text' && (
            <MySelector<ResponseTextType>
              value={response.textType}
              variant="outlined"
              onValueChange={(newValue) => {
                response.textType = newValue;
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
