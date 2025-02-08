import { CommonStyle } from '@http/hooks/useRestyle';
import { Box } from '@mui/material';
import { useMemo } from 'react';
import Params from './components/Params';
import Headers from './components/Headers';
import Body from './components/Body';
import { useFormContext, useWatch } from 'react-hook-form';
import type { HttpForm } from '@http/types/httpForm';
import { RequestTab } from '@http/types/httpForm/request';
import RequestToggle from './components/RequestToggle';
import { match } from 'ts-pattern';

export default function Request() {
  const { control } = useFormContext<HttpForm>();
  const tab = useWatch({ control, name: 'request.tab' });
  const content = useMemo(
    () =>
      match(tab)
        .with(RequestTab.params, () => <Params />)
        .with(RequestTab.headers, () => <Headers />)
        .with(RequestTab.body, () => <Body />)
        .exhaustive(),
    [tab],
  );
  return (
    <Box sx={CommonStyle.main}>
      <RequestToggle />
      {content}
    </Box>
  );
}
