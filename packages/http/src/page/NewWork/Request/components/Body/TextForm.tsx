import Edit from '@http/components/editor/edit';
import type { HttpForm } from '@http/types/httpForm';
import { useFormContext, useWatch, Controller } from 'react-hook-form';

export default function TextFrom() {
  const { control } = useFormContext<HttpForm>();
  const language = useWatch({ name: 'request.body.text.textType', control });
  return (
    <Controller
      control={control}
      name="request.body.text.text"
      render={({ field }) => <Edit language={language} sx={{ width: '100%', height: '100%' }} {...field} />}
    />
  );
}
