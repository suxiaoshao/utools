import { CommonStyle } from '@http/hooks/useRestyle';
import { ResponseTab, SuccessResponse } from '@http/types/httpForm';
import { Box } from '@mui/material';
import { useMemo } from 'react';
import ResponseToggle from './ResponseToggle';
import Headers from './Headers';
import Body from './Body';
import Cookies from './Cookies';

export interface SuccessProps {
  data: SuccessResponse;
}

export default function Success({ data }: SuccessProps) {
  const content = useMemo(() => {
    switch (data.tab) {
      case ResponseTab.body:
        return <Body data={data.body} />;
      case ResponseTab.cookie:
        return <Cookies cookies={data.cookies} />;
      case ResponseTab.header:
        return <Headers headers={data.headers} />;
    }
  }, [data.body, data.cookies, data.headers, data.tab]);
  return (
    <Box sx={CommonStyle.main}>
      <ResponseToggle />
      {content}
    </Box>
  );
}
