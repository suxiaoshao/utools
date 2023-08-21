import { Box } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Config } from '.';

export default function ChapterForm() {
  const {} = useFormContext<Config>();
  return <Box>ChapterForm</Box>;
}
