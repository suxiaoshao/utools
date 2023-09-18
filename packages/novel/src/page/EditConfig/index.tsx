import React, { useMemo, useState } from 'react';
import { Close, ExitToApp, Save } from '@mui/icons-material';
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon, Step, StepButton, Stepper } from '@mui/material';
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
import { Config, schema, steps } from './const';

/**
 * 编辑源配置
 * */
export default function EditConfig(): JSX.Element {
  const [code] = useState(defaultCode);
  const [open, setOpen] = useState(false);
  const navigate = useCustomNavigate();
  const dispatch = useAppDispatch();
  const methods = useForm<Config>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const [activeStep, setActiveStep] = useState(0);
  const [completed] = useState<{
    [k: number]: boolean;
  }>({});

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const content = useMemo(() => {
    switch (activeStep) {
      case 0:
        return <BasicInfo />;
      case 1:
        return <SearchForm />;
      case 2:
        return <NovelForm />;
      case 3:
        return <ChapterForm />;
    }
  }, [activeStep]);
  return (
    <FormProvider {...methods}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
        <Box
          sx={{
            flex: '1 1 0',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          {content}
        </Box>
        <SpeedDial
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          icon={<SpeedDialIcon />}
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          ariaLabel={'打开'}
          open={open}
        >
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
        </SpeedDial>
      </Box>
    </FormProvider>
  );
}
