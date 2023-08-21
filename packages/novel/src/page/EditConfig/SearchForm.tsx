import { Box } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Config } from '.';

export default function SearchForm() {
  const {} = useFormContext<Config>();
  return <Box>search</Box>;
}
