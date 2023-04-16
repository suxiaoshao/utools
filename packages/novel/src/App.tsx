import './app.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Sponsorship from './view/sponsorship';
import Work from './view/work';
import { MyThemeProvider } from './components/myTheme';
import CookiePage from './view/cookiePage';
import HistoryPage from './view/historyPage';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 插件的主要部分,包裹了主题和路由
 * */
export default function App(): JSX.Element {
  return (
    <Router>
      <MyThemeProvider>
        <Routes>
          <Route path="/">
            <Work />
          </Route>
          <Route path="/sponsorship">
            <Sponsorship />
          </Route>
          <Route path="/cookies">
            <CookiePage />
          </Route>
          <Route path="/history">
            <HistoryPage />
          </Route>
        </Routes>
      </MyThemeProvider>
    </Router>
  );
}
