import React from 'react';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { Delete, Edit, Reply } from '@mui/icons-material';
import { httpArray } from '@http/store/httpArray';
import { useNavigate } from 'react-router-dom';
import SaveHttp from '@http/components/httpSave/saveHttp';
import { brown, green, grey, lightBlue, orange, purple, red } from '@mui/material/colors';
import { HttpManager } from '@http/utils/http/httpManager';
import type { HttpEntity } from '@http/database/entity/http.entity';
import { useAppDispatch } from '@http/app/hooks';
import { updateActiveTab } from '@http/app/features/tabsSlice';
import { match } from 'ts-pattern';

const Color = {
  DELETE: {
    backgroundColor: red[400],
  },
  POST: {
    backgroundColor: orange[400],
  },
  GET: {
    backgroundColor: green[400],
  },
  PUT: {
    backgroundColor: lightBlue[400],
  },
  HEAD: {
    backgroundColor: grey[400],
  },
  OPTIONS: {
    backgroundColor: brown[400],
  },
  PATCH: {
    backgroundColor: purple[400],
  },
};

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 每个历史组件的 prop
 * */
export interface HistoryItemProp {
  /**
   * 要显示的历史数据库数据
   * */
  http: HttpEntity;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 二秘阁历史记录的组件
 * */
export default function HistoryItem(props: HistoryItemProp) {
  /**
   * react-dom-router 的跳转函数
   * */
  const myHistory = useNavigate();
  /**
   * 是否打开修改页面
   * */
  const [modifyOpen, setModifyOpen] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  return (
    <>
      <Card sx={(theme) => ({ margin: `0 ${theme.spacing(2)} ${theme.spacing(2)} ${theme.spacing(2)}` })}>
        <CardHeader
          avatar={
            /**
             * 显示 http 方法
             * */
            <Avatar sx={Color[props.http.method ?? 'GET']}>{(props.http.method ?? 'GET').slice(0, 3)}</Avatar>
          }
          /** http 保存名 */
          title={props.http.name}
          /** url */
          subheader={`${props.http.url}`}
          subheaderTypographyProps={{ noWrap: true }}
          sx={{
            '& .MuiCardHeader-content': {
              maxWidth: `calc(100% - ${56}px)`,
            },
          }}
        />
        {/* http 保存的标签 */}
        <CardContent>
          {match(props.http.tags?.length)
            .with(0, () => (
              <Typography variant="body2" color="textSecondary">
                该 http 请求没有标签
              </Typography>
            ))
            .otherwise(() =>
              props.http.tags?.map((value) => (
                <Chip
                  color="primary"
                  sx={(theme) => ({ margin: `${theme.spacing(0.5)} ${theme.spacing(1)}` })}
                  key={value.tagId}
                  label={value.tagName}
                />
              )),
            )}
        </CardContent>
        <CardActions disableSpacing>
          {/* 添加至工作区 */}
          <Tooltip title={<Typography variant="body2">添加至工作区</Typography>}>
            <IconButton
              onClick={() => {
                const index = httpArray.addFromHttpManager(HttpManager.fromEntity(props.http));
                dispatch(updateActiveTab(index));
                myHistory({ pathname: '/' });
              }}
            >
              <Reply />
            </IconButton>
          </Tooltip>
          {/* 打开修改窗口 */}
          <Tooltip title={<Typography variant="body2">修改</Typography>}>
            <IconButton
              onClick={() => {
                setModifyOpen(true);
              }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          {/* 删除该 http历史 */}
          <Tooltip title={<Typography variant="body2">删除</Typography>}>
            <IconButton
              sx={{ marginLeft: 'auto' }}
              onClick={() => {
                props.http.delete();
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
      <SaveHttp
        open={modifyOpen}
        onClose={() => {
          setModifyOpen(false);
        }}
        onSave={() => {
          setModifyOpen(false);
        }}
        httpManager={HttpManager.fromEntity(props.http)}
      />
    </>
  );
}
