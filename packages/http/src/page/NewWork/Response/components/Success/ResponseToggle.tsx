import React from 'react';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { CommonStyle } from '@http/hooks/useRestyle';
import { Controller, useFormContext } from 'react-hook-form';
import { HttpForm, ResponseTab } from '@http/types/httpForm';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description response 的页面切换按钮
 * */
export default function ResponseToggle(): JSX.Element {
  const { control } = useFormContext<HttpForm>();
  return (
    <Box sx={CommonStyle.toggle}>
      <Controller
        control={control}
        name="response.data.tab"
        render={({ field }) => (
          <ToggleButtonGroup
            size="small"
            exclusive
            {...field}
            onChange={(event, value) => {
              if (value) {
                field.onChange(value);
              }
            }}
          >
            <ToggleButton sx={CommonStyle.toggleButton} value={ResponseTab.body}>
              Body
            </ToggleButton>
            <ToggleButton sx={CommonStyle.toggleButton} value={ResponseTab.cookie}>
              Cookies
            </ToggleButton>
            <ToggleButton sx={CommonStyle.toggleButton} value={ResponseTab.header}>
              Headers
            </ToggleButton>
          </ToggleButtonGroup>
        )}
      />
    </Box>
  );
}
