import { CommonStyle } from '@http/hooks/useRestyle';
import { Box } from '@mui/material';
import { useMemo } from 'react';
import Params from './components/Params';
import Headers from './components/Headers';
import Body from './components/Body';
import { useFormContext, useWatch } from 'react-hook-form';
import { HttpForm } from '@http/types/httpForm';
import { RequestTab } from '@http/types/httpForm/request';
import RequestToggle from './components/RequestToggle';

export default function Request() {
  const { control } = useFormContext<HttpForm>();
  const tab = useWatch({ control, name: 'request.tab' });
  const content = useMemo(() => {
    switch (tab) {
      case RequestTab.params:
        return <Params />;
      case RequestTab.headers:
        return <Headers />;
      case RequestTab.body:
        return <Body />;
    }
  }, [tab]);
  return (
    <Box sx={CommonStyle.main}>
      <RequestToggle />
      {content}
    </Box>
  );
}
