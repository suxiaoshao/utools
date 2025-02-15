import { Button, type ButtonProps, Menu, MenuItem } from '@mui/material';
import { match } from 'ts-pattern';
import React from 'react';

/**
 * @author sushao
 * @version 0.4.0
 * @since 0.4.0
 * @description 单个选择器
 * */
export interface ItemListProp<T> {
  /**
   * 这个选项的值
   * */
  value: T;
  /**
   * 显示在选项里的文字或 html
   * */
  text: React.ReactNode;
}

/**
 * @author sushao
 * @version 0.4.0
 * @since 0.4.0
 * @description 选择器组建的 prop
 * */
export interface MySelectorProp<T extends number | string | undefined | null> {
  /**
   * 被选择的值
   * */
  value: T;
  /**
   * 值和显示文字的对照列表
   * */
  itemList: ItemListProp<T>[];

  /**
   * 修改值的触发方法
   * */
  onValueChange(newValue: T): void;
}

function MySelector<T extends number | string | undefined | null>(
  { value, itemList, onValueChange, sx, ...props }: MySelectorProp<T> & ButtonProps,
  ref?: ((instance: HTMLButtonElement | null) => void) | React.RefObject<HTMLButtonElement> | null | undefined,
) {
  /**
   * 点击时间的触发组件,如果取消的话为 null
   * */
  const [menuEl, setMenuEl] = React.useState<HTMLButtonElement | null>(null);
  return (
    <>
      {/* 触发菜单的按钮*/}
      <Button
        {...props}
        sx={{ textTransform: 'none', ...sx }}
        onClick={(e) => {
          setMenuEl(e.currentTarget);
        }}
        ref={match(ref)
          .when(
            (r) => typeof r === 'function',
            () => ref,
          )
          .otherwise(() => undefined)}
      >
        {itemList.find((item) => item.value === value)?.text ?? '不是合法的值'}
      </Button>
      {/* 菜单,menuEl 不为 bull 时显示 */}
      <Menu
        open={Boolean(menuEl)}
        anchorEl={menuEl}
        onClose={() => {
          setMenuEl(null);
        }}
      >
        {itemList.map((item) => (
          /**
           * 点击触发修改方法并关闭菜单
           * */
          <MenuItem
            selected={item.value === value}
            key={item.value}
            onClick={() => {
              onValueChange(item.value);
              setMenuEl(null);
            }}
          >
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default MySelector;
