import { CommonStyle } from '@http/hooks/useRestyle';
import { BodyType, type HttpForm } from '@http/types/httpForm';
import { Box } from '@mui/material';
import { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import FormDataFrom from './FormData';
import TextFrom from './TextForm';
import XForm from './XForm';
import { match } from 'ts-pattern';

export default function Body() {
  const { control } = useFormContext<HttpForm>();
  const tab = useWatch({ control, name: 'request.body.bodyType' });
  const content = useMemo(() => {
    return match(tab)
      .with(BodyType.formData, () => {
        return <FormDataFrom />;
      })
      .with(BodyType.text, () => {
        return <TextFrom />;
      })
      .with(BodyType.xForm, () => {
        return <XForm />;
      })
      .with(BodyType.none, () => {
        return <Box />;
      })
      .exhaustive();
  }, [tab]);
  return <Box sx={CommonStyle.tableContainer}>{content}</Box>;
}
