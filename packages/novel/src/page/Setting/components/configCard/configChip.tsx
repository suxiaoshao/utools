import React from 'react';
import { TotalConfig } from '../../../../utils/web/config/totalConfig';
import { Chip, ChipProps, Menu, MenuItem } from '@mui/material';
import { TotalDataBuild } from '../../../../utils/data/totalData';
import { useAppDispatch } from '../../../../app/hooks';
import { initConfig } from '../../../../app/config/configSlice';
import { enqueueSnackbar } from 'notify';

export interface ConfigChipProp extends ChipProps {
  config: TotalConfig;
}

export default function ConfigChip({ config, sx, ...props }: ConfigChipProp): JSX.Element {
  /**
   * menu 的位置信息,不显示时为 null
   * */
  const [menuPosition, setMenuPosition] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  const dispatch = useAppDispatch();
  const deleteConfig = React.useCallback(() => {
    const totalData = TotalDataBuild.getTotalData();
    const result = totalData.deleteConfig(config.mainPageUrl);
    if (!result) {
      enqueueSnackbar('默认源不可删除', {
        variant: 'error',
      });
    } else {
      dispatch(initConfig());
    }
  }, [config.mainPageUrl, dispatch]);
  return (
    <>
      <Chip
        {...props}
        sx={sx}
        onClick={(event) => {
          /**
           * 右键点击时设置点击的坐标为 menu的位置
           * */
          event.preventDefault();
          setMenuPosition({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          });
        }}
        onDelete={deleteConfig}
        color={'primary'}
        label={config.name}
      />
      <Menu
        anchorReference="anchorPosition"
        anchorPosition={menuPosition !== null ? { top: menuPosition.mouseY, left: menuPosition.mouseX } : undefined}
        open={menuPosition !== null}
        onClose={() => {
          setMenuPosition(null);
        }}
      >
        <MenuItem
          onClick={() => {
            utools.shellOpenExternal(config.mainPageUrl);
            setMenuPosition(null);
          }}
        >
          打开源网站
        </MenuItem>
        <MenuItem
          onClick={async () => {
            deleteConfig();
            setMenuPosition(null);
          }}
        >
          删除
        </MenuItem>
      </Menu>
    </>
  );
}
