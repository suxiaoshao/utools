/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2023-09-26 17:24:42
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2024-03-08 20:55:48
 * @FilePath: /tauri/Users/weijie.su/Documents/code/self/utools/packages/novel/src/page/EditConfig/components/ExportDialog.tsx
 */
import { AppBar, Box, Button, Dialog, IconButton, Input, Toolbar, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import type { ToggleReturn } from '@novel/hooks/async/useToggle';
import { Close, ContentCopy, Upload } from '@mui/icons-material';
import { useCallback, useState } from 'react';
import Edit from '@novel/components/common/editor/edit';
import { useFormContext } from 'react-hook-form';
import type { TotalConfig } from '../const';
import { enqueueSnackbar } from 'common/notify/src';
import { match, P } from 'ts-pattern';

export default function ExportDialog({ handleToggle, open }: ToggleReturn) {
  const [code, setCode] = useState<string>();
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/json': ['.json'] },
    onDrop: async (acceptedFiles) => {
      setCode(await acceptedFiles[0].text());
    },
    multiple: false,
  });
  const handleClear = useCallback(() => {
    setCode(undefined);
  }, []);
  const { reset } = useFormContext<TotalConfig>();
  const handleSave = useCallback(() => {
    try {
      if (code === undefined) {
        throw new Error('导入的数据不能为空');
      }
      const data = JSON.parse(code);
      reset(data);
      handleToggle();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);

      // eslint-disable-next-line prefer-await-to-callbacks
      match(error)
        // eslint-disable-next-line prefer-await-to-callbacks
        .with({ message: String }, (err) => {
          enqueueSnackbar(`导入的数据格式不正确:${err.message}`, { variant: 'error' });
        })
        // eslint-disable-next-line prefer-await-to-callbacks
        .with(P.instanceOf(Error), (error) => {
          enqueueSnackbar(`导入的数据格式不正确:${error.message}`, { variant: 'error' });
        })
        // eslint-disable-next-line prefer-await-to-callbacks
        .with({ message: String }, (err) => {
          enqueueSnackbar(`导入错误:${err.message}`, { variant: 'error' });
        })
        // eslint-disable-next-line prefer-await-to-callbacks
        .otherwise((err) => {
          enqueueSnackbar(`未知错误:${err}`, { variant: 'error' });
        });
    }
  }, [code, handleToggle, reset]);
  return (
    <Dialog fullScreen open={open} onClose={handleToggle} fullWidth>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleToggle} aria-label="close">
            <Close />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            导入
          </Typography>
          <Button color="inherit" onClick={handleClear}>
            清空
          </Button>
          <Button color="inherit" onClick={handleSave}>
            保存
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ width: '100%', height: '100%' }}>
        {match(code)
          .with(undefined, () => (
            <Box sx={{ p: 1 }}>
              <Button startIcon={<Upload />} {...getRootProps()}>
                <Input inputProps={getInputProps()} />
                点击或者拖拽 .json 文件上传
              </Button>
              <Button
                onClick={async () => {
                  const text = await navigator.clipboard.readText();
                  setCode(text);
                }}
                startIcon={<ContentCopy />}
              >
                从剪切板导入
              </Button>
            </Box>
          ))
          .otherwise((e) => (
            <Edit sx={{ width: '100%', height: '100%' }} code={e} />
          ))}
      </Box>
    </Dialog>
  );
}
