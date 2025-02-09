import { HashRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { CustomTheme } from 'theme';
import { SnackbarProvider } from 'notify';

function App() {
  return (
    <CustomTheme>
      <SnackbarProvider>
        <HashRouter>
          <AppRouter />
        </HashRouter>
      </SnackbarProvider>
    </CustomTheme>
  );
}

export default App;
