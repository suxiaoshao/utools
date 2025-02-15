/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2023-12-31 16:03:02
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2023-12-31 16:16:56
 * @FilePath: /utools/common/notify/src/index.tsx
 */
import { IconButton } from '@mui/material';
import {
  type OptionsObject,
  type SnackbarMessage,
  useSnackbar,
  SnackbarProvider as SourceSnackbarProvider,
} from 'notistack';
import { type ReactNode, useEffect, useRef } from 'react';
import { Subject } from 'rxjs';
import { Close } from '@mui/icons-material';

export type SnackbarData = [SnackbarMessage, OptionsObject?];
const snackbarSubject = new Subject<SnackbarData>();
export function enqueueSnackbar(...data: SnackbarData) {
  snackbarSubject.next(data);
}
function useSnackbarInit() {
  const { enqueueSnackbar: open } = useSnackbar();
  useEffect(() => {
    const key = snackbarSubject.subscribe((data) => {
      open(...data);
    });
    return () => {
      key.unsubscribe();
    };
  }, [open]);
}
export function SnackbarProvider({ children }: { children: ReactNode }) {
  const ref = useRef<SourceSnackbarProvider>(null);
  function InnerUseComponent() {
    useSnackbarInit();
    return children;
  }
  return (
    <SourceSnackbarProvider
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      maxSnack={5}
      ref={ref}
      action={(key) => (
        <IconButton
          onClick={() => {
            ref.current?.closeSnackbar(key);
          }}
        >
          <Close sx={{ color: '#fff' }} />
        </IconButton>
      )}
      variant="error"
    >
      <InnerUseComponent />
    </SourceSnackbarProvider>
  );
}
