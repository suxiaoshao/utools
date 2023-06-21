import { HttpForm } from '@http/types/httpForm';
import { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import Loading from './components/Loading';
import ErrorTab from './components/Error';
import None from './components/None';

export default function Response() {
  const { control } = useFormContext<HttpForm>();
  const response = useWatch({ name: 'response', control });
  const content = useMemo(() => {
    switch (response.tag) {
      case 'loading':
        return <Loading controller={response.data} />;
      case 'success':
        return <></>;
      case 'error':
        return <ErrorTab message={response.data} />;
      case 'init':
        return <None />;
    }
  }, [response.data, response.tag]);
  return content;
}
