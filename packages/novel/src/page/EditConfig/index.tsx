/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2023-08-22 10:15:12
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2023-11-10 17:53:57
 * @FilePath: /tauri/Users/weijie.su/Documents/code/self/utools/packages/novel/src/page/EditConfig/index.tsx
 */
import { Box } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import BasicInfo from './components/BasicInfo';
import SearchForm from './components/SearchForm';
import NovelForm from './components/NovelForm';
import ChapterForm from './components/ChapterForm';
import { TotalConfig, configSchema } from './const';
import { createPortal } from 'react-dom';
import { Toolbar } from './components/Toolbar';
import useCheckDomElement from '@novel/hooks/useCheckDomElement';
import { useCallback } from 'react';
import { TotalDataBuild } from '@novel/utils/data/totalData';
import { useAppDispatch } from '@novel/app/hooks';
import { useCustomNavigate } from '@novel/app/history/historySlice';
import { initConfig } from '@novel/app/config/configSlice';
import { enqueueSnackbar } from 'notify';

/**
 * 编辑源配置
 * */
export default function EditConfig(): JSX.Element {
  const methods = useForm<TotalConfig>({
    resolver: yupResolver(configSchema),
    mode: 'all',
  });
  const container = useCheckDomElement('#breadcrumbs');
  const dispatch = useAppDispatch();
  const navigate = useCustomNavigate();
  const onSubmit = useCallback(
    (data: TotalConfig) => {
      const totalData = TotalDataBuild.getTotalData();
      const message = totalData.addConfig(data);
      if (message) {
        enqueueSnackbar(message, {
          variant: 'error',
        });
      } else {
        navigate('', { tag: 'goBack', data: 1 });
        dispatch(initConfig());
      }
    },
    [dispatch, navigate],
  );
  const handleSubmit = methods.handleSubmit(onSubmit);

  return (
    <FormProvider {...methods}>
      {container && createPortal(<Toolbar />, container)}
      <Box
        onSubmit={handleSubmit}
        component="form"
        id="add-config"
        sx={{ width: '100%', height: '100%', overflowY: 'auto', pb: 1 }}
      >
        <BasicInfo />
        <SearchForm />
        <NovelForm />
        <ChapterForm />
      </Box>
    </FormProvider>
  );
}
