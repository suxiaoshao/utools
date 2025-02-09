import { IconButton, Tooltip, Typography } from '@mui/material';
import { SwapHoriz } from '@mui/icons-material';
import { useFormContext } from 'react-hook-form';
import { type HttpForm, TabType } from '@http/types/httpForm';
import { match } from 'ts-pattern';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 修改 response/request 页面的按钮
 * */
export default function ChangeButton() {
  const { watch, setValue } = useFormContext<HttpForm>();
  const tab = watch('tab');
  const buttonLabel = match(tab)
    .with(TabType.request, () => '切换为 response')
    .otherwise(() => '切换为 request');

  return (
    <Tooltip title={<Typography variant="body2">{buttonLabel}</Typography>}>
      <IconButton
        sx={{ p: 1 }}
        onClick={() => {
          const newTab = match(tab)
            .with(TabType.request, () => TabType.response)
            .otherwise(() => TabType.request);
          setValue('tab', newTab);
        }}
      >
        <SwapHoriz />
      </IconButton>
    </Tooltip>
  );
}
