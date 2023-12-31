/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2023-08-21 18:17:36
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2023-11-10 18:49:26
 * @FilePath: /tauri/Users/weijie.su/Documents/code/self/utools/packages/novel/src/page/Setting/components/configCard/configChip.tsx
 */
import React from 'react';
import { Chip, ChipProps, Menu, MenuItem } from '@mui/material';
import { TotalDataBuild } from '@novel/utils/data/totalData';
import { useAppDispatch } from '@novel/app/hooks';
import { initConfig } from '@novel/app/config/configSlice';
import { enqueueSnackbar } from 'notify';
import { TotalConfig } from '@novel/page/EditConfig/const';

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
