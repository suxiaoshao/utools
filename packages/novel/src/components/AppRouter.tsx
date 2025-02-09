import { Routes, Route } from 'react-router-dom';
import SearchPage from '@novel/page/Search';
import SettingPage from '@novel/page/Setting';
import Bookshelf from '@novel/page/bookshelf';
import ChapterPage from '@novel/page/chapterPage';
import EditConfig from '@novel/page/EditConfig';
import NovelPage from '@novel/page/novelPage';
import ReadFile from '@novel/page/readFile';
import Sponsorship from '@novel/page/sponsorship';
import TestPage from '@novel/page/testPage';
import AppTabs from './AppTabs';
import { useEffect } from 'react';
import { useCustomNavigate } from '@novel/app/history/historySlice';
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
        <Route path="/" element={<SearchPage />} />
        <Route path="/bookshelf" element={<Bookshelf />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/sponsorship" element={<Sponsorship />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/readFile" element={<ReadFile />} />
      </Route>
      <Route element={<AppBreadcrumbs />}>
        <Route path="/novel" element={<NovelPage />} />
        <Route path="/chapter" element={<ChapterPage />} />
        <Route path="/editConfig" element={<EditConfig />} />
      </Route>
    </Routes>
  );
}
