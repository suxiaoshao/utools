import { Avatar, Card, CardContent, CardHeader, IconButton, Tooltip } from '@mui/material';
import { Add, PermDataSetting } from '@mui/icons-material';
import { brown } from '@mui/material/colors';
import { useTotalConfigs } from '../../../../store/config.store';
import ConfigChip from './configChip';
import { historyStore } from '../../../../store/history.store';
import { settingSx } from '../themeEdit/themeEdit';

export default function ConfigCard(): JSX.Element {
  const [allConfigs] = useTotalConfigs();
  return (
    <Card sx={settingSx.card}>
      <CardHeader
        avatar={
          <Avatar sx={{ color: '#fff', backgroundColor: brown[600] }}>
            <PermDataSetting />
          </Avatar>
        }
        title={'小说源配置'}
        action={
          <Tooltip title={'添加配置'}>
            <IconButton
              onClick={() => {
                historyStore.push({ name: '添加新源', pathname: '/editConfig' });
              }}
            >
              <Add />
            </IconButton>
          </Tooltip>
        }
      />
      <CardContent>
        {allConfigs.map((value) => (
          <ConfigChip sx={{ margin: 1 }} config={value} key={value.mainPageUrl} />
        ))}
      </CardContent>
    </Card>
  );
}
