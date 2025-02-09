import React from 'react';
import { TabPanelDisappear } from '@http/components/TabPanel';
import ResToggle from './resToggle';
import ResHeaders from './resHeaders';
import { HttpContext } from '../HttpContext';
import { useForceUpdate } from '@http/hooks/useForceUpdate';
import { Backdrop, Button, LinearProgress } from '@mui/material';
import ResBody from './resBody/resBody';
import NoneRes from './noneRes';
import ResCookie from './resCookie';
import ErrorPage from './errorPage';
import { CommonStyle } from '@http/hooks/useRestyle';
import { match } from 'ts-pattern';
import { ResponseContext } from './ResponseContext';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description response 注入器组件
 * */
function ResponseProvider(props: {
  /**
   * 子组件
   * */
  children: React.ReactNode;
}) {
  const {
    httpManager: { response },
  } = React.useContext(HttpContext);
  const forceUpdate = useForceUpdate();
  return (
    <ResponseContext.Provider value={{ response: response, fatherUpdate: forceUpdate }}>
      {props.children}
    </ResponseContext.Provider>
  );
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 用于包裹 response 部分的组件
 * */
function ResponseFather(props: {
  /**
   * 子组件
   * */
  children: React.ReactNode;
}) {
  const {
    httpManager: { isRequest },
  } = React.useContext(HttpContext);
  return (
    <ResponseProvider>
      <TabPanelDisappear sx={CommonStyle.main} index={0} value={Number(isRequest)}>
        {props.children}
      </TabPanelDisappear>
    </ResponseProvider>
  );
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description response 组件
 * */
export default function Response() {
  /**
   * 激活部分标记
   * */
  const [value, setValue] = React.useState<string>('body');
  const {
    httpManager: {
      loading,
      tokenSource,
      response: { contentType },
    },
  } = React.useContext(HttpContext);
  /**
   * 如果 http manager 在 loading,显示 loading 页面
   * */
  if (loading) {
    return (
      <ResponseFather>
        <LinearProgress
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 2, position: 'absolute', right: 0, left: 0, top: 0 }}
        />
        <Backdrop
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            position: 'absolute',
            right: 0,
            left: 0,
            top: 0,
            bottom: 0,
          }}
          open
        >
          <Button
            color="primary"
            onClick={() => {
              tokenSource?.cancel('提前取消');
            }}
            variant="contained"
          >
            取消
          </Button>
        </Backdrop>
      </ResponseFather>
    );
  }

  return match(contentType)
    .with('none', () => (
      <ResponseFather>
        <NoneRes />
      </ResponseFather>
    ))
    .with('error', () => (
      <ResponseFather>
        <ErrorPage />
      </ResponseFather>
    ))
    .otherwise(() => (
      <ResponseFather>
        <ResToggle
          value={value}
          onchangeValue={(newValue) => {
            setValue(newValue);
          }}
        />
        <TabPanelDisappear index="body" value={value} sx={CommonStyle.page}>
          <ResBody />
        </TabPanelDisappear>
        <TabPanelDisappear index="cookies" value={value} sx={CommonStyle.page}>
          <ResCookie />
        </TabPanelDisappear>
        <TabPanelDisappear index="headers" value={value} sx={CommonStyle.page}>
          <ResHeaders />
        </TabPanelDisappear>
      </ResponseFather>
    ));
}
