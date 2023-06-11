import { useForm, FormProvider } from 'react-hook-form';
import { HttpForm } from '@http/types/httpForm';
import Url from './Url';
import { useEffect, useMemo } from 'react';
import { useAppDispatch } from '@http/app/hooks';
import { editHttp } from '@http/app/features/tabsSlice';

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

  return (
    <FormProvider {...methods}>
      <Url />
    </FormProvider>
  );
}
