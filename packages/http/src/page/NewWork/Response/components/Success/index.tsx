import { CommonStyle } from '@http/hooks/useRestyle';
import { ResponseTab, type SuccessResponse } from '@http/types/httpForm';
import { Box } from '@mui/material';
import { useMemo } from 'react';
import ResponseToggle from './ResponseToggle';
import Headers from './Headers';
import Body from './Body';
import Cookies from './Cookies';
import { match } from 'ts-pattern';

export interface SuccessProps {
  data: SuccessResponse;
}

export default function Success({ data }: SuccessProps) {
  const content = useMemo(
    () =>
      match(data.tab)
        .with(ResponseTab.body, () => {
          return <Body data={data.body} />;
        })
        .with(ResponseTab.cookie, () => {
          return <Cookies cookies={data.cookies} />;
        })
        .with(ResponseTab.header, () => {
          return <Headers headers={data.headers} />;
        })
        .exhaustive(),
    [data.body, data.cookies, data.headers, data.tab],
  );
  return (
    <Box sx={CommonStyle.main}>
      <ResponseToggle />
      {content}
    </Box>
  );
}
