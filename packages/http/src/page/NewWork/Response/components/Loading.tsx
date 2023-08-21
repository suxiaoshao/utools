import { LinearProgress, Backdrop, Button } from '@mui/material';

export interface LoadingProps {
  controller: AbortController;
}

export default function Loading({ controller }: LoadingProps): JSX.Element {
  return (
    <>
      <LinearProgress
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 2, position: 'absolute', right: 0, left: 0, top: 0 }}
      />
      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          position: 'absolute',
          right: 0,
          left: 0,
          top: 0,
          bottom: 0,
        }}
        open
      >
        <Button
          color="primary"
          onClick={() => {
            controller.abort();
          }}
          variant="contained"
        >
          取消
        </Button>
      </Backdrop>
    </>
  );
}
