/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2023-08-22 10:15:12
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2023-11-09 19:41:15
 * @FilePath: /tauri/Users/weijie.su/Documents/code/self/utools/packages/novel/src/page/EditConfig/index.tsx
 */
import { Box } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import BasicInfo from './components/BasicInfo';
import SearchForm from './components/SearchForm';
import NovelForm from './components/NovelForm';
import ChapterForm from './components/ChapterForm';
import { Config, schema } from './const';
import { createPortal } from 'react-dom';
import { Toolbar } from './components/Toolbar';
import useCheckDomElement from '@novel/hooks/useCheckDomElement';

/**
 * 编辑源配置
 * */
export default function EditConfig(): JSX.Element {
  const methods = useForm<Config>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const container = useCheckDomElement('#breadcrumbs');

  return (
    <FormProvider {...methods}>
      {container && createPortal(<Toolbar />, container)}
      <Box sx={{ width: '100%', height: '100%', overflowY: 'auto', pb: 1 }}>
        <BasicInfo />
        <SearchForm />
        <NovelForm />
        <ChapterForm />
      </Box>
    </FormProvider>
  );
}
