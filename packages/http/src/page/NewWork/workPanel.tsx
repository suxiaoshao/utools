import { useForm, FormProvider } from 'react-hook-form';
import { HttpForm } from '@http/types/httpForm';
import Url from './Url';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description http 工作选项卡
 * */
export default function WorkPanel({
  http,
}: {
  /**
   * http 管理对象
   * */
  http: HttpForm;
}): JSX.Element {
  const methods = useForm<HttpForm>({ defaultValues: http });

  return (
    <FormProvider {...methods}>
      <Url />
    </FormProvider>
  );
}
