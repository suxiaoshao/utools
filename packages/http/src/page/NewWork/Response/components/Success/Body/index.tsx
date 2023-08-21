import Edit from '@http/components/editor/edit';
import { ResponseBody } from '@http/types/httpForm';
import { Box } from '@mui/material';
import { useMemo } from 'react';

export interface BodyProps {
  data: ResponseBody;
}
export default function Body({ data }: BodyProps) {
  const content = useMemo(() => {
    switch (data.tag) {
      case 'audio':
        return <Box component="audio" src={data.data} />;
      case 'image':
        return <Box component="img" src={data.data} />;
      case 'video':
        return <Box component="video" src={data.data} />;
      case 'text':
        return (
          <Edit
            sx={{ width: '100%', height: '100%', margin: 0, overflow: 'hidden' }}
            value={data.data.text}
            language={data.data.textType}
            readonly
          />
        );
    }
  }, [data.data, data.tag]);
  return <Box sx={{ overflow: 'auto', width: '100%', p: 1, height: '100%' }}>{content}</Box>;
}
