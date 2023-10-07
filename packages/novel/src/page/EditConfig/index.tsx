import { useState } from 'react';
import { Close, ExitToApp, FileOpen, Save } from '@mui/icons-material';
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCustomNavigate } from '@novel/app/history/historySlice';
import { useAppDispatch } from '@novel/app/hooks';
import { TotalDataBuild } from '@novel/utils/data/totalData';
import { initConfig } from '@novel/app/config/configSlice';
import { enqueueSnackbar } from 'notify';
import { FormProvider, useForm } from 'react-hook-form';
import BasicInfo from './components/BasicInfo';
import SearchForm from './components/SearchForm';
import NovelForm from './components/NovelForm';
import ChapterForm from './components/ChapterForm';
import { defaultCode } from './const';
import { Config, schema } from './const';
import { useToggle } from '@novel/hooks/async/useToggle';
import ExportDialog from './components/ExportDialog';

/**
 * 编辑源配置
 * */
export default function EditConfig(): JSX.Element {
  const [code] = useState(defaultCode);
  const navigate = useCustomNavigate();
  const dispatch = useAppDispatch();
  const methods = useForm<Config>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const { open, handleToggle } = useToggle({});

  return (
    <FormProvider {...methods}>
      <Box sx={{ width: '100%', height: '100%', overflowY: 'auto', pb: 1 }}>
        <BasicInfo />
        <SearchForm />
        <NovelForm />
        <ChapterForm />
        <SpeedDial icon={<SpeedDialIcon />} sx={{ position: 'absolute', bottom: 16, right: 16 }} ariaLabel={'打开'}>
          <SpeedDialAction
            onClick={() => {
              const totalData = TotalDataBuild.getTotalData();
              const message = totalData.addConfig(code);
              if (message) {
                enqueueSnackbar(message, {
                  variant: 'error',
                });
              } else {
                navigate('', { tag: 'goBack', data: 1 });
                dispatch(initConfig());
              }
            }}
            icon={<Save />}
            tooltipTitle={'保存'}
          />
          <SpeedDialAction
            icon={<Close />}
            tooltipTitle={'取消'}
            onClick={() => {
              navigate('', { tag: 'goBack', data: 1 });
            }}
          />
          <SpeedDialAction
            onClick={() => {
              utools.shellOpenExternal('https://yuanliao.info/d/1392-0-3-1-utools/176');
            }}
            icon={<ExitToApp />}
            tooltipTitle={'查看默认源配置'}
          />
          <SpeedDialAction onClick={handleToggle} icon={<FileOpen />} tooltipTitle={'导入'} />
        </SpeedDial>
        <ExportDialog handleToggle={handleToggle} open={open} />
      </Box>
    </FormProvider>
  );
}
