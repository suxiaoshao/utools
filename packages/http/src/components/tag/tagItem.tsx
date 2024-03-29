import React from 'react';
import { Chip, ChipProps, Menu, MenuItem, TextField } from '@mui/material';
import { TagEntity } from '@http/database/entity/tag.entity';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description tagItem 组件的 prop
 * */
export interface TagItemProp extends ChipProps {
  /**
   * 展示的 tagEntity
   * */
  tagEntity: TagEntity;
  /**
   * chip 组件的删除按钮的 icon
   * */
  icon?: React.ReactElement;

  /**
   * 点击删除按钮触发的方法
   * */
  onClick(): void;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description tagItem 显示组件
 * */
export default function TagItem({ tagEntity, icon, onClick, ...props }: TagItemProp): JSX.Element {
  /**
   * menu 的位置信息,不显示时为 null
   * */
  const [menuPosition, setMenuPosition] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  /**
   * 重命名时的新名字,为 null 时说明未处在重命名状态
   * */
  const [newName, setNewName] = React.useState<string | null>(null);
  /**
   * 重命名标签的输入框的引用
   * */
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  /**
   * 重命名方法
   * */
  const update = React.useCallback(async () => {
    tagEntity.tagName = newName || tagEntity.tagName;
    await tagEntity.update();
    setNewName(null);
  }, [newName, tagEntity]);
  /**
   * 设置新名字时,重命名输入成为焦点
   * */
  React.useEffect(() => {
    inputRef.current?.focus();
  }, [newName]);
  return (
    <>
      <Chip
        {...props}
        color={newName === null ? 'primary' : undefined}
        label={
          newName !== null ? (
            /**
             * 重命名输入框,按下回车和输入框不再成为焦点时保存
             * */
            <TextField
              onBlur={async () => {
                await update();
              }}
              value={newName}
              onChange={(event) => {
                setNewName(event.target.value);
              }}
              onKeyUp={async (event) => {
                if (event.key === 'Enter') {
                  await update();
                }
              }}
              error={newName === ''}
              helperText={newName === '' ? '新名字不可为空' : undefined}
              inputRef={inputRef}
            />
          ) : (
            tagEntity.tagName
          )
        }
        onDelete={async () => {
          onClick();
        }}
        onContextMenu={(event) => {
          /**
           * 右键点击时设置点击的坐标为 menu的位置
           * */
          event.preventDefault();
          setMenuPosition({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          });
        }}
        deleteIcon={icon}
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
            setMenuPosition(null);
            setNewName(tagEntity.tagName);
          }}
        >
          重命名
        </MenuItem>
        <MenuItem
          onClick={async () => {
            await tagEntity.delete();
            setMenuPosition(null);
          }}
        >
          删除
        </MenuItem>
      </Menu>
    </>
  );
}
