import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { CommonStyle } from '@http/hooks/useRestyle';
import { Controller, useFormContext } from 'react-hook-form';
import { RequestTab } from '@http/types/httpForm/request';
import { HttpForm } from '@http/types/httpForm';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description request 的切换按钮
 * */
export default function RequestToggle(): JSX.Element {
  const { control } = useFormContext<HttpForm>();
  return (
    <Box sx={CommonStyle.toggle}>
      <Controller
        control={control}
        name="request.tab"
        render={({ field }) => (
          <ToggleButtonGroup size="small" exclusive {...field}>
            <ToggleButton sx={CommonStyle.toggleButton} value={RequestTab.params}>
              Params
            </ToggleButton>
            <ToggleButton sx={CommonStyle.toggleButton} value={RequestTab.headers}>
              Headers
            </ToggleButton>
            <ToggleButton sx={CommonStyle.toggleButton} value={RequestTab.body}>
              Body
            </ToggleButton>
          </ToggleButtonGroup>
        )}
      />
    </Box>
  );
}
