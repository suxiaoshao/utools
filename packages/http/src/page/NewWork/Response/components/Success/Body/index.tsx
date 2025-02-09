import Edit from '@http/components/editor/edit';
import type { ResponseBody } from '@http/types/httpForm';
import { Box } from '@mui/material';
import { useMemo } from 'react';
import { match } from 'ts-pattern';

export interface BodyProps {
  data: ResponseBody;
}
export default function Body({ data }: BodyProps) {
  const content = useMemo(
    () =>
      match(data)
        .with({ tag: 'audio' }, ({ data }) => <Box component="audio" src={data} />)
        .with({ tag: 'image' }, ({ data }) => <Box component="img" src={data} />)
        .with({ tag: 'video' }, ({ data }) => <Box component="video" src={data} />)
        .with({ tag: 'text' }, ({ data }) => (
          <Edit
            sx={{ width: '100%', height: '100%', margin: 0, overflow: 'hidden' }}
            value={data.text}
            language={data.textType}
            readonly
          />
        ))
        .with({ tag: 'none' }, () => null)
        .exhaustive(),
    [data],
  );
  return <Box sx={{ overflow: 'auto', width: '100%', p: 1, height: '100%' }}>{content}</Box>;
}
