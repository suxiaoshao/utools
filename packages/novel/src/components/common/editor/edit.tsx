/*
 * @Author: Su Weijie weijie.su@shopee.com
 * @Date: 2023-08-21 18:17:36
 * @LastEditors: Su Weijie weijie.su@shopee.com
 * @LastEditTime: 2023-11-05 02:29:20
 */
import React, { useEffect } from 'react';
import './model';
import { editor } from 'monaco-editor';
import { Box, type BoxProps, useTheme } from '@mui/material';
import { match } from 'ts-pattern';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 可写情况下的 editProp
 * */
export interface NotReadOnlyEditProp extends BoxProps {
  /**
   * 要显示的代码字符串
   * */
  code: string;

  /**
   * 当编辑器代码改变时触发的方法
   * */
  onChangeCode?(newCode: string): void;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 编辑器组件
 * */
export default function Edit({ sx, code, onChangeCode, ...props }: NotReadOnlyEditProp) {
  /**
   * 编辑器绑定的 dom 的引用
   * */
  const [editRef, setEditRef] = React.useState<HTMLDivElement>();
  /**
   * 编辑器实体
   * */
  const [edit, setEdit] = React.useState<editor.IStandaloneCodeEditor | undefined>();
  const theme = useTheme();
  /**
   * 编辑器要绑定的 dom 生成时,再这个 dom 上新建一个编辑器,并赋值给 edit
   * */
  useEffect(() => {
    if (editRef !== undefined && edit === undefined && editRef.firstChild === null) {
      while (editRef.firstChild) {
        // eslint-disable-next-line prefer-dom-node-remove
        editRef.removeChild(editRef.firstChild);
      }
      const newEditor = editor.create(editRef, {
        theme: match(theme.palette.mode)
          .with('dark', () => 'vs-dark' as const)
          .otherwise(() => undefined),
        automaticLayout: true,
        fontSize: 16,
        minimap: {
          enabled: true,
        },
        hover: {
          enabled: true,
          delay: 100,
        },
        language: 'json',
      });
      setEdit(newEditor);
    }
  }, [edit, editRef, theme.palette.mode]);
  /**
   * props.readonly 改变时修改编辑器的只读属性
   * */
  useEffect(() => {
    const id = edit?.getModel()?.onDidChangeContent(() => {
      const content = edit?.getValue();
      if (content) {
        onChangeCode?.(content);
      }
    });
    return () => {
      id?.dispose();
    };
  }, [edit, onChangeCode]);
  /**
   * props.code 改变时,如果 props.code和编辑器本身储存的 code 不一样,则重设编辑器的值
   * */
  useEffect(() => {
    if (code !== edit?.getValue()) {
      edit?.setValue(code);
    }
  }, [edit, code]);
  return <Box {...props} sx={sx} ref={setEditRef} />;
}
