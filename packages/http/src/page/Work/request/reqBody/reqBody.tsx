import React from 'react';
import ReqFormData from './reqFormData';
import XForm from './XForm';
import Edit from '../../../../components/common/editor/edit';
import { TabPanelDisappear } from '../../../../components/common/tabPanel';
import { RequestContext } from '../request';

// todo delete
// const useReqBodyStyle = makeStyles((theme) =>
//   createStyles({
//     tabPanel: {
//       width: '100%',
//       height: '100%',
//     },
//     tableContainer: {
//       margin: theme.spacing(1),
//       height: `calc(100% - ${theme.spacing(1) * 2}px)`,
//       width: `calc(100% - ${theme.spacing(1) * 2}px)`,
//     },
//     edit: {
//       width: '100%',
//       height: '100%',
//       margin: 0,
//       overflow: 'hidden',
//     },
//     editFather: {
//       width: '100%',
//       height: '100%',
//       paddingTop: '3px',
//     },
//   }),
// );

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description request body 部分
 * */
export default function ReqBody(): JSX.Element {
  const { request, fatherUpdate } = React.useContext(RequestContext);
  return (
    <>
      <TabPanelDisappear
        sx={(theme) => ({
          margin: 1,
          height: `calc(100% - ${theme.spacing(2)})`,
          width: `calc(100% - ${theme.spacing(2)})`,
        })}
        index={'form-data'}
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
        index={'x-www-form-urlencoded'}
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
        index={'text'}
        value={request.bodyChoose}
      >
        <Edit
          code={request.text}
          language={request.textChoose}
          sx={{ width: '100%', height: '100%', margin: 0, overflow: 'hidden' }}
          onChangeCode={(newCode) => {
            request.text = newCode;
            fatherUpdate();
          }}
        />
      </TabPanelDisappear>
    </>
  );
}
