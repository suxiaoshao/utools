import CustomSelector from '@http/components/CustomSelector';
import { useFormContext, Controller } from 'react-hook-form';
import { HttpForm, HttpMethod } from '@http/types/httpForm';

export const MethodList: { text: string; value: HttpMethod }[] = (
  [
    HttpMethod.DELETE,
    HttpMethod.GET,
    HttpMethod.HEAD,
    HttpMethod.OPTIONS,
    HttpMethod.PATCH,
    HttpMethod.POST,
    HttpMethod.PUT,
  ] as const
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
 * @description 切换 http 方法的组件
 * */
export default function MethodSelector(): JSX.Element {
  const { control } = useFormContext<HttpForm>();
  return (
    <Controller
      name="request.method"
      render={({ field }) => <CustomSelector<HttpMethod> {...field} itemList={MethodList} sx={{ p: 1 }} />}
      control={control}
    />
  );
}
