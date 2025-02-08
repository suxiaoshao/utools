import React from 'react';
import ReqFormData from './reqFormData';
import XForm from './XForm';
import Edit from '@http/components/editor/edit';
import { TabPanelDisappear } from '@http/components/TabPanel';
import { RequestContext } from '../request';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description request body 部分
 * */
export default function ReqBody() {
  const { request, fatherUpdate } = React.useContext(RequestContext);
  return (
    <>
      <TabPanelDisappear
        sx={(theme) => ({
          margin: 1,
          height: `calc(100% - ${theme.spacing(2)})`,
          width: `calc(100% - ${theme.spacing(2)})`,
        })}
        index="form-data"
        value={request.bodyChoose}
      >
        <ReqFormData />
      </TabPanelDisappear>
      <TabPanelDisappear
        sx={(theme) => ({
          margin: 1,
          height: `calc(100% - ${theme.spacing(2)})`,
          width: `calc(100% - ${theme.spacing(2)})`,
        })}
        index="x-www-form-urlencoded"
        value={request.bodyChoose}
      >
        <XForm />
      </TabPanelDisappear>
      <TabPanelDisappear
        sx={{
          width: '100%',
          height: '100%',
          paddingTop: '3px',
        }}
        index="text"
        value={request.bodyChoose}
      >
        <Edit
          value={request.text}
          language={request.textChoose}
          sx={{ width: '100%', height: '100%' }}
          onChange={(newCode) => {
            request.text = newCode;
            fatherUpdate();
          }}
        />
      </TabPanelDisappear>
    </>
  );
}
