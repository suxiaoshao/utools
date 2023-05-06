import React from 'react';
import Edit from '../components/common/editor/edit';
import { Close, ExitToApp, Save } from '@mui/icons-material';
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { useCustomNavigate } from '../app/history/historySlice';
import { useAppDispatch } from '../app/hooks';
import { TotalDataBuild } from '../utils/data/totalData';
import { initConfig } from '../app/config/configSlice';
import { enqueueSnackbar } from 'notify';

const defaultCode = `{
    "mainPageUrl": "",
    "name": "",
    "search": {
        "li": "",
        "novelId": "",
        "authorName": "",
        "latestChapterId": "",
        "updateTime": "",
        "image": "",
        "label": "",
        "desc": "",
        "encoding": ""
    },
    "novel": {
        "info": {
            "name": "",
            "author": "",
            "lastUpdateTime": "",
            "latestChapterId": "",
            "encoding": "",
            "image": "",
            "desc": ""
        },
        "directory": {
            "chapterId": "",
            "encoding": ""
        }
    },
    "url": {
        "search": "",
        "novelInfo": "",
        "directory": "",
        "chapter": "",
        "searchPlaceholder": "",
        "novelPlaceholder": "",
        "chapterPlaceholder": ""
    },
    "content": {
        "encoding": "",
        "chapterName": "",
        "novelName": "",
        "preChapterId": "",
        "nextChapterId": "",
        "content": "",
        "contentSplit": ""
    },
    "regex": {
        "novel": "",
        "novelIdPlaceholder": "",
        "chapterIdPlaceholder": "",
        "chapter": ""
    }
}`;

/**
 * 编辑源配置
 * */
export default function EditConfig(): JSX.Element {
  const [code, setCode] = React.useState(defaultCode);
  const [open, setOpen] = React.useState(false);
  const navigate = useCustomNavigate();
  const dispatch = useAppDispatch();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <Box sx={{ flex: '1 1 0', width: '100%', height: '100%', overflow: 'hidden' }}>
        <Edit sx={{ width: '100%', height: '100%' }} onChangeCode={setCode} code={code} />
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
  );
}
