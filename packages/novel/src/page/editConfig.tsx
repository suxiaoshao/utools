import MyBreadcrumbs from '../components/myBreadcrumbs';
import React from 'react';
import '../utils/edit/init';
import Edit from '../components/common/editor/edit';
import { Close, ExitToApp, Save } from '@mui/icons-material';
import { historyStore } from '../store/history.store';
import { configStore } from '../store/config.store';
import { notifySubject } from '../components/common/notify';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';

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
  return (
    <MyBreadcrumbs sx={{ display: 'flex', flexDirection: 'column' }}>
      <Edit sx={{ flex: '1 1 0' }} onChangeCode={setCode} code={code} />
      <SpeedDial
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        icon={<SpeedDialIcon />}
        sx={{ position: 'absolute', bottom: 2, right: 2 }}
        ariaLabel={'打开'}
        open={open}
      >
        <SpeedDialAction
          onClick={() => {
            const message = configStore.addConfig(code);
            if (message) {
              notifySubject.next({
                message,
                options: {
                  variant: 'error',
                },
              });
            } else {
              historyStore.goBack();
            }
          }}
          icon={<Save />}
          tooltipTitle={'保存'}
        />
        <SpeedDialAction
          icon={<Close />}
          tooltipTitle={'取消'}
          onClick={() => {
            historyStore.goBack();
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
    </MyBreadcrumbs>
  );
}
