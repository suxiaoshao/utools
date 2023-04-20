import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { AvTimer, History, MonetizationOn, NetworkCheck } from '@mui/icons-material';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

const listWidth = 170;

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 侧边栏路由按钮的 prop
 * */
export interface MyRouterListItemProp {
  /**
   * 按钮 icon
   * */
  icon: JSX.Element;
  /**
   * 显示的文字
   * */
  text: string;
  /**
   * 按钮指向的路径
   * */
  path: string;
}
/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 侧边栏按钮
 * */
function MyRouterListItem(props: MyRouterListItemProp) {
  /**
   * 路由信息
   * */
  const myLocation = useLocation();
  /**
   * 跳转
   * */
  const myHistory = useNavigate();
  return (
    <ListItemButton
      onClick={() => {
        myHistory(props.path);
      }}
      selected={myLocation.pathname === props.path}
      sx={
        myLocation.pathname === props.path
          ? (theme) => ({
              color: theme.palette.info.light,
              '& > *': {
                color: theme.palette.info.light,
              },
            })
          : undefined
      }
    >
      <ListItemIcon>{props.icon}</ListItemIcon>
      <ListItemText>{props.text}</ListItemText>
    </ListItemButton>
  );
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 侧边栏组件
 * */
export default function MyDrawer(): JSX.Element {
  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
      <List
        sx={(theme) => ({
          flex: `0 0 ${listWidth}px`,
          display: 'flex',
          flexDirection: 'column',
          background: theme.palette.background.paper,
        })}
      >
        <MyRouterListItem path="/" icon={<NetworkCheck />} text={'工作区'} />
        <MyRouterListItem icon={<History />} text={'历史记录'} path={'/history'} />
        <MyRouterListItem icon={<AvTimer />} text={'cookies'} path={'/cookies'} />
        <MyRouterListItem icon={<MonetizationOn />} text={'支持作者'} path={'/sponsorship'} />
      </List>
      <Box component="main" sx={{ display: 'flex', width: '100%', height: '100%' }}>
        <Outlet />
      </Box>
    </Box>
  );
}
