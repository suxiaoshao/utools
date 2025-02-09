import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Sponsorship from './page/Sponsorship';
import Work from './page/Work';
import CookiePage from './page/Cookie';
import HistoryPage from './page/History';
import AppDrawer from './components/AppDrawer';
import { CustomTheme } from 'theme';
import { SnackbarProvider } from 'notify';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import NewWork from './page/NewWork';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 插件的主要部分,包裹了主题和路由
 * */
export default function App() {
  return (
    <CustomTheme>
      <SnackbarProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Router>
            <Routes>
              <Route path="/" element={<AppDrawer />}>
                <Route index element={<Work />} />
                <Route path="/sponsorship" element={<Sponsorship />} />
                <Route path="/cookies" element={<CookiePage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/new_work" element={<NewWork />} />
              </Route>
            </Routes>
          </Router>
        </LocalizationProvider>
      </SnackbarProvider>
    </CustomTheme>
  );
}
