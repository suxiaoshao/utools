import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { HttpForm, TabType } from '@http/types/httpForm';
import { useEffect, useMemo } from 'react';
import { useAppDispatch } from '@http/app/hooks';
import { editHttp } from '@http/app/features/tabsSlice';
import Url from './Url';
import Request from './Request';
import Response from './Response';

export interface WorkPanelProps {
  http: HttpForm;
  index: number;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description http 工作选项卡
 * */
export default function WorkPanel({ http, index }: WorkPanelProps): JSX.Element {
  const methods = useForm<HttpForm>({ defaultValues: http });
  const tab = useWatch({ control: methods.control, name: 'tab' });
  const dispatch = useAppDispatch();
  const onSubmit = useMemo(
    () =>
      methods.handleSubmit((data) => {
        dispatch(editHttp({ index: index, http: data }));
      }),
    [methods, index, dispatch],
  );
  useEffect(() => {
    return () => {
      onSubmit();
    };
  }, [onSubmit]);
  const content = useMemo(() => {
    switch (tab) {
      case TabType.request:
        return <Request />;
      case TabType.response:
        return <Response />;
    }
  }, [tab]);

  return (
    <FormProvider {...methods}>
      <Url />
      {content}
    </FormProvider>
  );
}
