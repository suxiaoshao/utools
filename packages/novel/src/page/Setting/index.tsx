import ThemeEdit from './components/themeEdit/themeEdit';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import FontCard from './components/fontCard';
import DocsMore from './components/DocsMore';
import ConfigCard from './components/configCard/configCard';

const useClasses = makeStyles(() =>
  createStyles({
    page: {
      overflow: 'auto',
    },
  }),
);

export default function SettingPage(): JSX.Element {
  const classes = useClasses();
  return (
    <div className={classes.page}>
      <ThemeEdit />
      <FontCard />
      <ConfigCard />
      <DocsMore />
    </div>
  );
}
