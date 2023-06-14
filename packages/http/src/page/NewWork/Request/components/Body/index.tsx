import { CommonStyle } from '@http/hooks/useRestyle';
import { BodyType, HttpForm } from '@http/types/httpForm';
import { Box } from '@mui/material';
import { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import FormDataFrom from './FormData';
import TextFrom from './TextForm';
import XForm from './XForm';

export default function Body() {
  const { control } = useFormContext<HttpForm>();
  const tab = useWatch({ control, name: 'request.body.bodyType' });
  const content = useMemo(() => {
    switch (tab) {
      case BodyType.formData:
        return <FormDataFrom />;
      case BodyType.text:
        return <TextFrom />;
      case BodyType.xForm:
        return <XForm />;
    }
  }, [tab]);
  return <Box sx={CommonStyle.tableContainer}>{content}</Box>;
}
