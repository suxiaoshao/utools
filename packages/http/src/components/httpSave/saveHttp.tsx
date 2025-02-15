import React from 'react';
import { AppBar, Box, Dialog, IconButton, Slide, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import { Close, SaveAlt } from '@mui/icons-material';
import TagsForm from '../tag/tagsForm';
import type { HttpEntity } from '@http/database/entity/http.entity';
import type { HttpManager } from '@http/utils/http/httpManager';
import { useSqlData } from '@http/store/sqlStore';
import type { TagEntity } from '@http/database/entity/tag.entity';
import type { TransitionProps } from '@mui/material/transitions';
import { enqueueSnackbar } from 'notify';
import { match, P } from 'ts-pattern';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description saveHttp 组件显示时展现的动画
 * */
const Transition = function Transition({
  ref,
  ...props
}: TransitionProps & {
  children: React.ReactElement;
  ref: React.Ref<unknown>;
}) {
  return <Slide direction="up" ref={ref} {...props} />;
};

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description saveHttp 组件的 prop
 * */
export interface SaveHttpProp {
  /**
   * saveHttp 组件是否打开
   * */
  open: boolean;
  /**
   * 将要保存的 httpManager
   * */
  httpManager: HttpManager;

  /**
   * 触发关闭时调用的方法
   * */
  onClose(): void;

  /**
   * 触发保存时调用的方法
   * */
  onSave(newHttpEntity: HttpEntity): void;
}

export default function SaveHttp(props: SaveHttpProp) {
  /**
   * 将要保存的 httpManger
   * */
  const { httpManager } = props;
  /**
   * 数据库数据
   * */
  const [sqlData] = useSqlData();
  /**
   * 被选择的 tag
   * */
  const [selectedTags, setSelectedTags] = React.useState<TagEntity[]>([]);
  /**
   * http 保存名
   * */
  const [name, setName] = React.useState<string>(httpManager.name);
  /**
   * 一下任意一个东西被修改时,从数据库中读取这个 http 关联的 tag 赋值给被选择的 tag
   * */
  React.useEffect(() => {
    setSelectedTags(sqlData.https.find((value) => value.httpId === httpManager.httpId)?.tags ?? []);
  }, [props.open, httpManager.httpId, sqlData.https]);
  return (
    <Dialog fullScreen open={props.open} onClose={props.onClose} slots={{ transition: Transition }}>
      <AppBar sx={{ position: 'relative', display: 'flex' }} color="inherit">
        <Toolbar variant="dense">
          {/* 取消按钮 */}
          <Tooltip title={<Typography variant="body2">取消</Typography>}>
            <IconButton edge="start" color="secondary" onClick={props.onClose}>
              <Close />
            </IconButton>
          </Tooltip>
          {/* http 名 */}
          <Typography variant="h6" sx={{ ml: 2, flex: 1, mr: 2 }}>
            {match(name)
              .with(P.nullish, () => httpManager.url || '暂未命名')
              .otherwise(() => name)}
          </Typography>
          {/* 保存按钮 */}
          <Tooltip title={<Typography variant="body2">保存</Typography>}>
            <div>
              <IconButton
                edge="end"
                onClick={async () => {
                  /**
                   * 新建一个数据库 http 对象
                   * */
                  httpManager.name = name;
                  const httpEntity = httpManager.getHttpEntity([...selectedTags]);
                  /**
                   * 尝试保存,如果成功触发保存方法
                   * */
                  try {
                    await httpEntity.save();
                    props.onSave(httpEntity);
                  } catch (error) {
                    /**
                     * 如果失败,通知用户
                     * */
                    enqueueSnackbar(`保存失败:${error}`, {
                      variant: 'error',
                      autoHideDuration: 2000,
                    });
                  }
                }}
                color="primary"
                disabled={name === ''}
              >
                <SaveAlt />
              </IconButton>
            </div>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: (theme) => theme.palette.background.default,
          position: 'relative',
        }}
      >
        {/* http 名字 文本框 */}
        <TextField
          sx={{ width: '40%', mt: 1, flex: '0 0 auto' }}
          variant="filled"
          value={name}
          label="名字"
          error={name === ''}
          helperText={match(name)
            .with('', () => 'name 不能为空')
            .otherwise(() => undefined)}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        {/* tag 选择组件 */}
        <TagsForm
          sx={{ flex: '1 1 0', width: '100%' }}
          onSelectedTasChanges={setSelectedTags}
          selectedTags={selectedTags}
        />
      </Box>
    </Dialog>
  );
}
