import MyError from '@http/components/icon/myError';
import { Paper, Typography } from '@mui/material';

export interface ErrorTabProps {
  message: string;
}

export default function ErrorTab({ message }: ErrorTabProps) {
  return (
    <Paper
      sx={(theme) => ({
        width: `calc(100% - ${theme.spacing(2)})`,
        height: `calc(100% - ${theme.spacing(2)})`,
        margin: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
      })}
    >
      <MyError sx={{ width: '30vh', height: '30vh' }} />
      <Typography variant="h6">{message}</Typography>
    </Paper>
  );
}
