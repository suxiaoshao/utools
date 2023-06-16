import { Box, ButtonGroup, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { CommonStyle } from '@http/hooks/useRestyle';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { BodyType, RequestTab } from '@http/types/httpForm/request';
import { HttpForm } from '@http/types/httpForm';
import CustomSelector, { ItemListProp } from '@http/components/CustomSelector';
import { TextType } from '@http/types/httpForm/common/text';

const bodyItemList: ItemListProp<BodyType>[] = (
  [BodyType.formData, BodyType.none, BodyType.text, BodyType.xForm] as const
).map<ItemListProp<BodyType>>((value) => {
  return {
    text: value,
    value: value,
  };
});

const textItemList: ItemListProp<TextType>[] = (
  [TextType.json, TextType.html, TextType.xml, TextType.css, TextType.javascript, TextType.plain] as const
).map((value) => {
  return {
    text: value,
    value: value,
  };
});

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description request 的切换按钮
 * */
export default function RequestToggle(): JSX.Element {
  const { control } = useFormContext<HttpForm>();
  const tab = useWatch({ control, name: 'request.tab' });
  const bodyType = useWatch({ control, name: 'request.body.bodyType' });
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
      <ButtonGroup variant="outlined" aria-label="outlined primary button group">
        {tab === RequestTab.body && (
          <Controller
            control={control}
            name="request.body.bodyType"
            render={({ field }) => <CustomSelector<BodyType> variant="outlined" {...field} itemList={bodyItemList} />}
          />
        )}
        {bodyType === BodyType.text && (
          <Controller
            control={control}
            name="request.body.text.textType"
            render={({ field }) => <CustomSelector<TextType> variant="outlined" {...field} itemList={textItemList} />}
          />
        )}
      </ButtonGroup>
    </Box>
  );
}
