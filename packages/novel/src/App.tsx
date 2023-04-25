import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import AppRouter from './components/AppRouter';
import { CustomTheme } from 'theme';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <HashRouter>
        <CustomTheme>
          <AppRouter />
        </CustomTheme>
      </HashRouter>
    </Provider>
  );
}

export default App;
