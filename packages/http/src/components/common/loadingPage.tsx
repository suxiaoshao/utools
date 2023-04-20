import { useSqlData } from '../../store/sqlStore';
import { Backdrop, CircularProgress, Typography } from '@mui/material';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description loading 组件,如果 sqlData 的 loading 为 true 则引用了这个组建的父组件会被这个 loading 组件覆盖
 * */
export default function LoadingPage(): JSX.Element {
  const [sqlData] = useSqlData();
  return (
    <>
      <Backdrop
        open={sqlData.loading}
        sx={{
          zIndex: (theme) => theme.zIndex.modal + 1,
          position: 'absolute',
          right: 0,
          left: 0,
          top: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          flexDirection: 'column',
        }}
      >
        <CircularProgress color="inherit" sx={{ width: '10vh !important', height: '10vh !important' }} />
        <Typography variant="h6">数据加载中...</Typography>
      </Backdrop>
    </>
  );
}
