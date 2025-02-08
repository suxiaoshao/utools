import React from 'react';
import { ListItemIcon, ListItemText, Menu, MenuItem, Tab } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { selectTabCanDelete, useTabsStore } from '@http/app/features/tabsSlice';
import type { HttpForm } from '@http/types/httpForm';
import { match } from 'ts-pattern';
import { useShallow } from 'zustand/react/shallow';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description workTab 的 prop
 * */
export interface WorkTabProp {
  /**
   * 这个 tab 指向的 http 请求在 httpArray 中的下标
   * */
  index: number;
  /**
   * 这个 tab 的http 请求
   * */
  httpManager: HttpForm;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description work 组件的 tab,封装了右键点击
 * */
export default function WorkTab(props: WorkTabProp) {
  /**
   * 设置激活的 http 请求的下标
   * */
  const { addTab, deleteTab, tabCanDelete, updateActiveTab } = useTabsStore(
    useShallow((state) => ({
      addTab: state.addTab,
      deleteTab: state.deleteTab,
      updateActiveTab: state.updateActiveTab,
      tabCanDelete: selectTabCanDelete(state),
    })),
  );
  /**
   * menu 出现的位置, 为 null 则不显示
   * */
  const [menuPosition, setMenuPosition] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  return (
    <>
      <Tab
        onContextMenu={(event) => {
          event.preventDefault();
          setMenuPosition({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          });
        }}
        sx={{
          textTransform: 'none',
          maxWidth: '20%',
          '& .MuiTab-wrapper': {
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            display: 'block',
          },
        }}
        label={props.httpManager.name || props.httpManager.request.url || '空'}
        onClick={() => {
          updateActiveTab(props.index);
        }}
      />
      <Menu
        keepMounted
        open={menuPosition !== null}
        onClose={() => {
          setMenuPosition(null);
        }}
        anchorReference="anchorPosition"
        anchorPosition={match(menuPosition)
          .with(null, () => undefined)
          .otherwise((pos) => ({ top: pos.mouseY, left: pos.mouseX }))}
      >
        <MenuItem
          onClick={() => {
            addTab();
            setMenuPosition(null);
          }}
        >
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText>添加新请求</ListItemText>
        </MenuItem>
        {tabCanDelete && (
          <MenuItem
            onClick={() => {
              deleteTab(props.index);
              setMenuPosition(null);
            }}
          >
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            <ListItemText>删除此请求</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
