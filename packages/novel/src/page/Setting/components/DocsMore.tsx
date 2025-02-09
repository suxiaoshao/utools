import {
  Avatar,
  Card,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { Comment, Description, GitHub, NearMe, Person } from '@mui/icons-material';
import { blueGrey } from '@mui/material/colors';
import { settingSx } from './themeEdit/themeEdit';

export default function DocsMore() {
  return (
    <Card sx={settingSx.card}>
      <CardHeader
        avatar={
          <Avatar sx={{ color: '#fff', backgroundColor: blueGrey[600] }}>
            <Description />
          </Avatar>
        }
        title="关于"
      />
      <List>
        <ListItem>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="作者" secondary="sushao" />
          <ListItemSecondaryAction>
            <Tooltip title="打开作者 github">
              <IconButton
                onClick={() => {
                  utools.shellOpenExternal('https://github.com/suxiaoshao');
                }}
              >
                <NearMe />
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <GitHub />
          </ListItemIcon>
          <ListItemText primary="github" secondary="https://github.com/suxiaoshao/utools-novel-reader" />
          <Tooltip title="打开插件 github">
            <IconButton
              onClick={() => {
                utools.shellOpenExternal('https://github.com/suxiaoshao/utools-novel-reader');
              }}
            >
              <NearMe />
            </IconButton>
          </Tooltip>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Comment />
          </ListItemIcon>
          <ListItemText primary="交流地址" secondary="https://yuanliao.info/d/1392" />
          <Tooltip title="打开插件交流贴">
            <IconButton
              onClick={() => {
                utools.shellOpenExternal('https://yuanliao.info/d/1392');
              }}
            >
              <NearMe />
            </IconButton>
          </Tooltip>
        </ListItem>
      </List>
    </Card>
  );
}
