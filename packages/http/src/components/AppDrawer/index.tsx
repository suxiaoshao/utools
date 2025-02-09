import { Box, List, ListItemButton, ListItemIcon, ListItemText, Paper, type Theme } from '@mui/material';
import { AvTimer, History, MonetizationOn, NetworkCheck } from '@mui/icons-material';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import type { JSX } from 'react';
import { match } from 'ts-pattern';

const listWidth = 170;

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 侧边栏路由按钮的 prop
 * */
export interface RouterListItemProp {
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
function RouterListItem(props: RouterListItemProp) {
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
      sx={match(myLocation.pathname === props.path)
        .with(true, () => () => ({
          color: (theme: Theme) => theme.palette.info.light,
          '& > *': {
            color: (theme: Theme) => theme.palette.info.light,
          },
        }))
        .otherwise(() => undefined)}
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
export default function AppDrawer() {
  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
      <List sx={{ flex: `0 0 ${listWidth}px` }} component={Paper} square elevation={1}>
        <RouterListItem path="/" icon={<NetworkCheck />} text="工作区" />
        <RouterListItem path="/new_work" icon={<NetworkCheck />} text="新工作区" />
        <RouterListItem icon={<History />} text="历史记录" path="/history" />
        <RouterListItem icon={<AvTimer />} text="cookies" path="/cookies" />
        <RouterListItem icon={<MonetizationOn />} text="支持作者" path="/sponsorship" />
      </List>
      <Box
        component="main"
        sx={{ display: 'flex', height: '100%', flex: `1 1 0`, maxWidth: `calc(100% - ${listWidth}px)` }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
