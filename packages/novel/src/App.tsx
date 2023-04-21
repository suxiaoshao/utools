import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { MyThemeProvider } from './components/myTheme';
import SearchPage from './views/searchPage';
import ReadFile from './views/readFile';
import Bookshelf from './views/bookshelf';
import TestPage from './views/testPage';
import NovelPage from './views/novelPage';
import ChapterPage from './views/chapterPage';
import SettingPage from './views/settingPage';
import Sponsorship from './views/sponsorship';
import EditConfig from './views/editConfig';
import MyTabs from './components/myTabs';

function App(): JSX.Element {
  return (
    <HashRouter>
      <MyThemeProvider>
        <Routes>
          <Route element={<MyTabs />}>
            <Route path="/" element={<SearchPage />}></Route>
            <Route path="/bookshelf" element={<Bookshelf />}></Route>
            <Route path="/setting" element={<SettingPage />}></Route>
            <Route path="/sponsorship" element={<Sponsorship />}></Route>
            <Route path="/test" element={<TestPage />}></Route>
            <Route path="/readFile" element={<ReadFile />}></Route>
          </Route>
          <Route path="/novel" element={<NovelPage />}></Route>
          <Route path="/chapter" element={<ChapterPage />}></Route>
          <Route path="/editConfig" element={<EditConfig />}></Route>
        </Routes>
      </MyThemeProvider>
    </HashRouter>
  );
}

export default App;
