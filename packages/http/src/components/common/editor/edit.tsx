import React, { startTransition, useCallback, useEffect } from 'react';
import './init';
import * as monaco from 'monaco-editor';
import monankai from './monankai';
import { Box, BoxProps } from '@mui/material';

monaco.editor.defineTheme('monankai', monankai);

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
   * 使用哪种语言显示
   * */
  language: string;
  /**
   * 是否只读
   * */
  readonly?: boolean;

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
export default function Edit({
  code,
  language,
  readonly = false,
  onChangeCode,
  ...props
}: NotReadOnlyEditProp): JSX.Element {
  /**
   * 编辑器绑定的 dom 的引用
   * */
  const [editRef, setEditRef] = React.useState<HTMLDivElement>();
  /**
   * 编辑器实体
   * */
  const [edit, setEdit] = React.useState<monaco.editor.IStandaloneCodeEditor | undefined>();
  /**
   * 编辑器要绑定的 dom 生成时,再这个 dom 上新建一个编辑器,并赋值给 edit
   * */
  React.useEffect(() => {
    setEdit((oldEditor) => {
      if ((oldEditor === undefined || oldEditor.getModel()?.getLanguageId() !== language) && editRef !== undefined) {
        oldEditor?.dispose();
        while (editRef.firstChild) {
          editRef.removeChild(editRef.firstChild);
        }
        const newEditor = monaco.editor.create(editRef, {
          value: code,
          theme: 'vs-dark',
          automaticLayout: true,
          language: language,
          fontSize: 16,
          minimap: {
            enabled: false,
          },
          readOnly: readonly,
        });
        return newEditor;
      }
    });
  }, [code, editRef, language, readonly]);

  /**
   * props.readonly 改变时修改编辑器的只读属性
   * */
  useEffect(() => {
    if (!readonly) {
      const id = edit?.getModel()?.onDidChangeContent(() => {
        const content = edit?.getValue();
        if (content) {
          onChangeCode?.(content);
        }
      });
      return () => {
        id?.dispose();
      };
    }
  }, [edit, readonly, onChangeCode]);
  /**
   * props.code 改变时,如果 props.code和编辑器本身储存的 code 不一样,则重设编辑器的值
   * */
  React.useEffect(() => {
    if (code !== edit?.getValue() && !readonly) {
      edit?.setValue(code);
    }
  }, [edit, code, readonly]);
  const format = useCallback(async () => {
    if (readonly && edit) {
      edit.updateOptions({
        readOnly: false,
      });
      await edit.getAction('editor.action.formatDocument')?.run();
      edit.updateOptions({
        readOnly: readonly,
      });
    }
  }, [edit, readonly]);
  useEffect(() => {
    startTransition(() => {
      format();
    });
  }, [format]);

  return <Box {...props} ref={setEditRef} />;
}
