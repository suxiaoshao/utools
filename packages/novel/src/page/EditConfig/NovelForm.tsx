import { Box } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Config } from '.';

export default function NovelForm() {
  const {} = useFormContext<Config>();
  return <Box>novel form</Box>;
}
