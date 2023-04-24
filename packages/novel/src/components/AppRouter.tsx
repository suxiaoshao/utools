import { Routes, Route } from 'react-router-dom';
import SearchPage from '../page/Search';
import SettingPage from '../page/Setting';
import Bookshelf from '../page/bookshelf';
import ChapterPage from '../page/chapterPage';
import EditConfig from '../page/editConfig';
import NovelPage from '../page/novelPage';
import ReadFile from '../page/readFile';
import Sponsorship from '../page/sponsorship';
import TestPage from '../page/testPage';
import AppTabs from './AppTabs';
import { useEffect } from 'react';
import { useCustomNavigate } from '../app/history/historySlice';
import AppBreadcrumbs from './AppBreadcrumbs';

export default function AppRouter() {
  const navigate = useCustomNavigate();
  useEffect(() => {
    utools.onPluginEnter((params) => {
      if (params.code === 'bookshelf') {
        navigate('书架', { tag: 'replace', data: '/bookshelf' });
      } else {
        navigate('搜索', { tag: 'replace', data: '/' });
      }
    });
  }, [navigate]);
  return (
    <Routes>
      <Route element={<AppTabs />}>
        <Route path="/" element={<SearchPage />}></Route>
        <Route path="/bookshelf" element={<Bookshelf />}></Route>
        <Route path="/setting" element={<SettingPage />}></Route>
        <Route path="/sponsorship" element={<Sponsorship />}></Route>
        <Route path="/test" element={<TestPage />}></Route>
        <Route path="/readFile" element={<ReadFile />}></Route>
      </Route>
      <Route element={<AppBreadcrumbs />}>
        <Route path="/novel" element={<NovelPage />}></Route>
        <Route path="/chapter" element={<ChapterPage />}></Route>
        <Route path="/editConfig" element={<EditConfig />}></Route>
      </Route>
    </Routes>
  );
}
