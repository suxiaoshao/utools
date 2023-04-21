import React from 'react';
import { TotalConfig } from '../../../../utils/web/config/totalConfig';
import { Chip, ChipProps, Menu, MenuItem } from '@mui/material';
import { getClassName } from '../../../../utils/getClassName';
import { configStore } from '../../../../store/config.store';
import { notifySubject } from '../../../../components/common/notify';

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
  const deleteConfig = React.useCallback(() => {
    if (!configStore.deleteByMainPageUrl(config.mainPageUrl)) {
      notifySubject.next({
        message: '默认源不可删除',
        options: {
          variant: 'error',
        },
      });
    }
  }, [config.mainPageUrl]);
  return (
    <>
      <Chip
        {...props}
        sx={sx}
        className={getClassName(props.className)}
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
