import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { MyThemeProvider } from './components/myTheme';
import SearchPage from './page/Search';
import ReadFile from './page/readFile';
import Bookshelf from './page/bookshelf';
import TestPage from './page/testPage';
import NovelPage from './page/novelPage';
import ChapterPage from './page/chapterPage';
import SettingPage from './page/Setting';
import Sponsorship from './page/sponsorship';
import EditConfig from './page/editConfig';
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
