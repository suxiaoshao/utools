import React from 'react';
import { editor } from 'monaco-editor';
import monankai from './monankai';
import { Box, BoxProps } from '@mui/material';

editor.defineTheme('monankai', monankai);

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
export default function Edit({ code, language, readonly, onChangeCode, ...props }: NotReadOnlyEditProp): JSX.Element {
  /**
   * 编辑器绑定的 dom 的引用
   * */
  const editRef = React.useRef<HTMLDivElement>(null);
  /**
   * 编辑器实体
   * */
  const [edit, setEdit] = React.useState<editor.IStandaloneCodeEditor | undefined>();
  /**
   * 编辑器要绑定的 dom 生成时,再这个 dom 上新建一个编辑器,并赋值给 edit
   * */
  React.useEffect(() => {
    if (editRef.current !== null) {
      setEdit(
        editor.create(editRef?.current, {
          value: code,
          theme: 'vs-dark',
          automaticLayout: true,
          language: language,
          fontSize: 16,
          minimap: {
            enabled: false,
          },
          readOnly: readonly,
        }),
      );
    }
    // eslint-disable-next-line
  }, [editRef]);
  /**
   * 编辑器退出时,使用 editor 的方法注销编辑器
   * */
  React.useEffect(() => {
    return () => {
      edit?.dispose();
    };
  }, [edit]);
  /**
   * props.readonly 改变时修改编辑器的只读属性
   * */
  React.useEffect(() => {
    if (!readonly) {
      edit?.onMouseLeave(() => {
        onChangeCode?.(edit?.getValue());
      });
    }
    // eslint-disable-next-line
  }, [edit, readonly]);
  /**
   * props.code 改变时,如果 props.code和编辑器本身储存的 code 不一样,则重设编辑器的值
   * */
  React.useEffect(() => {
    if (code !== edit?.getValue()) {
      edit?.setValue(code);
    }
  }, [edit, code]);
  /**
   * props.language改变时,重设编辑器的语言
   * */
  React.useEffect(() => {
    edit?.setModel(editor.createModel(code, language));
    // eslint-disable-next-line
  }, [edit, language]);
  /**
   * 以上任意一值改变时,观察是否是只读的,如果是:自动格式化代码
   * */
  React.useEffect(() => {
    if (readonly) {
      window.setTimeout(() => {
        edit?.updateOptions({
          readOnly: false,
        });
        edit?.trigger('anyString', 'editor.action.formatDocument', '');
        window.setTimeout(() => {
          edit?.updateOptions({
            readOnly: true,
          });
        }, Math.max(code.length / 50, 300));
      }, 100);
    }
  }, [edit, code, language, readonly]);
  return <Box {...props} ref={editRef} />;
}
