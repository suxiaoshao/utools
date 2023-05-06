import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import AppRouter from './components/AppRouter';
import { CustomTheme } from 'theme';
import { SnackbarProvider } from 'notify';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <CustomTheme>
        <SnackbarProvider>
          <HashRouter>
            <AppRouter />
          </HashRouter>
        </SnackbarProvider>
      </CustomTheme>
    </Provider>
  );
}

export default App;
