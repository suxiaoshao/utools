import React, { startTransition, useCallback, useEffect, useImperativeHandle } from 'react';
import * as monaco from 'monaco-editor';
import monankai from './monankai';
import { Box, type BoxProps } from '@mui/material';

self.MonacoEnvironment = {
  getWorker: (_moduleId, label) => {
    if (label === 'json') {
      return new Worker(new URL('monaco-editor/esm/vs/language/json/json.worker', import.meta.url));
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new Worker(new URL('monaco-editor/esm/vs/language/css/css.worker', import.meta.url));
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new Worker(new URL('monaco-editor/esm/vs/language/html/html.worker', import.meta.url));
    }
    if (label === 'typescript' || label === 'javascript') {
      return new Worker(new URL('monaco-editor/esm/vs/language/typescript/ts.worker', import.meta.url));
    }
    return new Worker(new URL('monaco-editor/esm/vs/editor/editor.worker', import.meta.url));
  },
};

monaco.editor.defineTheme('monankai', monankai);

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 可写情况下的 editProp
 * */
export interface NotReadOnlyEditProp extends Omit<BoxProps, 'onChange'> {
  /**
   * 要显示的代码字符串
   * */
  value: string;
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
  onChange?(newCode: string): void;
  ref?: React.Ref<HTMLDivElement | undefined>;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 编辑器组件
 * */
function Edit({ value: code, language, readonly = false, onChange: onChangeCode, ref, ...props }: NotReadOnlyEditProp) {
  /**
   * 编辑器绑定的 dom 的引用
   * */
  const [editRef, setEditRef] = React.useState<HTMLDivElement | undefined>();
  /**
   * 编辑器实体
   * */
  const [edit, setEdit] = React.useState<monaco.editor.IStandaloneCodeEditor | undefined>();
  /**
   * 编辑器要绑定的 dom 生成时,再这个 dom 上新建一个编辑器,并赋值给 edit
   * */
  useEffect(() => {
    if (
      editRef &&
      ((edit === undefined && editRef.firstChild === null) ||
        (edit?.getModel()?.getLanguageId() && edit?.getModel()?.getLanguageId() !== language))
    ) {
      edit?.dispose();
      while (editRef.firstChild) {
        editRef.firstChild.remove();
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
        wordWrap: 'on',
      });
      return setEdit(newEditor);
    }
  }, [code, edit, editRef, language, readonly]);

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
  useImperativeHandle(ref, () => editRef, [editRef]);

  return <Box {...props} ref={setEditRef} />;
}

export default Edit;
