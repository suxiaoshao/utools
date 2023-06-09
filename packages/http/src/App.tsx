import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Sponsorship from './page/Sponsorship';
import Work from './page/Work';
import CookiePage from './page/Cookie';
import HistoryPage from './page/History';
import AppDrawer from './components/AppDrawer';
import { Provider } from 'react-redux';
import store from './app/store';
import { CustomTheme } from 'theme';
import { SnackbarProvider } from 'notify';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 插件的主要部分,包裹了主题和路由
 * */
export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <CustomTheme>
        <SnackbarProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Router>
              <Routes>
                <Route path="/" element={<AppDrawer />}>
                  <Route index element={<Work />}></Route>
                  <Route path="/sponsorship" element={<Sponsorship />}></Route>
                  <Route path="/cookies" element={<CookiePage />}></Route>
                  <Route path="/history" element={<HistoryPage />}></Route>
                </Route>
              </Routes>
            </Router>
          </LocalizationProvider>
        </SnackbarProvider>
      </CustomTheme>
    </Provider>
  );
}
