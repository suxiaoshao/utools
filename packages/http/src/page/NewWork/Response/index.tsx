import type { HttpForm } from '@http/types/httpForm';
import { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import Loading from './components/Loading';
import ErrorTab from './components/Error';
import None from './components/None';
import Success from './components/Success';
import { match } from 'ts-pattern';

export default function Response() {
  const { control } = useFormContext<HttpForm>();
  const response = useWatch({ name: 'response', control });
  const content = useMemo(
    () =>
      match(response)
        .with({ tag: 'loading' }, ({ data }) => <Loading controller={data} />)
        .with({ tag: 'success' }, ({ data }) => <Success data={data} />)
        .with({ tag: 'error' }, ({ data }) => <ErrorTab message={data} />)
        .with({ tag: 'init' }, () => <None />)
        .exhaustive(),
    [response],
  );
  return content;
}
