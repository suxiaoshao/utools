import ThemeEdit from './components/themeEdit/themeEdit';
import FontCard from './components/fontCard';
import DocsMore from './components/DocsMore';
import ConfigCard from './components/configCard/configCard';
import { Box } from '@mui/material';

export default function SettingPage(): JSX.Element {
  return (
    <Box sx={{ overflow: 'auto', height: '100%', width: '100%' }}>
      <ThemeEdit />
      <FontCard />
      <ConfigCard />
      <DocsMore />
    </Box>
  );
}
