import { HashRouter } from 'react-router-dom';
import { MyThemeProvider } from './components/myTheme';
import { Provider } from 'react-redux';
import store from './app/store';
import AppRouter from './components/AppRouter';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <HashRouter>
        <MyThemeProvider>
          <AppRouter />
        </MyThemeProvider>
      </HashRouter>
    </Provider>
  );
}

export default App;
