import React from 'react';
import { TabPanelDisappear, TabPanelHidden } from '@http/components/TabPanel';
import { ResponseContext } from '../response';
import Edit from '@http/components/editor/edit';
import ResImage from './resImage';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description response 的 body 页面
 * */
export default function ResBody() {
  const { response } = React.useContext(ResponseContext);
  return (
    <>
      <TabPanelDisappear
        sx={(theme) => ({
          margin: 1,
          height: `calc(100% - ${theme.spacing(2)}px)`,
          width: `calc(100% - ${theme.spacing(2)}px)`,
        })}
        index="image"
        value={response.contentType}
      >
        <ResImage />
      </TabPanelDisappear>
      <TabPanelHidden
        sx={{
          width: '100%',
          height: '100%',
          paddingTop: '3px',
        }}
        index="text"
        value={response.contentType}
      >
        <Edit
          sx={{ width: '100%', height: '100%', margin: 0, overflow: 'hidden' }}
          value={response.getCode()}
          language={response.textType}
          readonly
        />
      </TabPanelHidden>
    </>
  );
}
