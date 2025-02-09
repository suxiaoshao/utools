import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { type HttpForm, TabType } from '@http/types/httpForm';
import { useEffect, useMemo } from 'react';
import { useTabsStore } from '@http/app/features/tabsSlice';
import Url from './Url';
import Request from './Request';
import Response from './Response';
import { match } from 'ts-pattern';
import { useShallow } from 'zustand/react/shallow';

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
export default function WorkPanel({ http, index }: WorkPanelProps) {
  const methods = useForm<HttpForm>({ defaultValues: http });
  const tab = useWatch({ control: methods.control, name: 'tab' });
  const editHttp = useTabsStore(useShallow((state) => state.editHttp));
  const onSubmit = useMemo(
    () =>
      methods.handleSubmit((data) => {
        editHttp(index, data);
      }),
    [methods, index, editHttp],
  );
  useEffect(() => {
    return () => {
      onSubmit();
    };
  }, [onSubmit]);
  const content = useMemo(
    () =>
      match(tab)
        .with(TabType.request, () => <Request />)
        .with(TabType.response, () => <Response />)
        .exhaustive(),
    [tab],
  );

  return (
    <FormProvider {...methods}>
      <Url />
      {content}
    </FormProvider>
  );
}
