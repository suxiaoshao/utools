import { Avatar, Card, CardContent, CardHeader, IconButton, Tooltip } from '@mui/material';
import { Add, PermDataSetting } from '@mui/icons-material';
import { brown } from '@mui/material/colors';
import { useTotalConfigs } from '../../../../store/config.store';
import ConfigChip from './configChip';
import { settingSx } from '../themeEdit/themeEdit';
import { useCustomNavigate } from '../../../../app/history/historySlice';

export default function ConfigCard(): JSX.Element {
  const [allConfigs] = useTotalConfigs();
  const navigate = useCustomNavigate();
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
                navigate('添加新源', { tag: 'push', data: '/editConfig' });
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
