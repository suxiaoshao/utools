import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
} from '@mui/material';
import { Cookie } from '../../utils/http/cookie';
import { DateTimePicker } from '@mui/lab';
import { Dayjs } from 'dayjs';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description cookieForm 的 prop
 * */
export interface CookieFormProp {
  /**
   * 需要修改保存的 cookie
   * */
  formCookie: Cookie | null;
  /**
   * formCookie 修改时触发的方法
   * */
  onChangeCookie(newCookie: Cookie | null): void;
}

export default function CookieForm(props: CookieFormProp): JSX.Element {
  const { formCookie } = props;
  return (
    <>
      {formCookie !== null && (
        <Dialog open={true}>
          <DialogTitle>修改/添加 cookie</DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }}>
              {/* name */}
              <TextField
                label={'name'}
                value={props.formCookie?.name}
                onChange={(event) => {
                  formCookie.name = event.target.value;
                  props.onChangeCookie(formCookie.clone());
                }}
                error={formCookie.name === ''}
                helperText={formCookie.name === '' ? 'name 不能为空' : undefined}
              />
              {/* value */}
              <TextField
                label={'value'}
                value={formCookie.value}
                onChange={(event) => {
                  formCookie.value = event.target.value;
                  props.onChangeCookie(formCookie.clone());
                }}
                error={formCookie.value === ''}
                helperText={formCookie.value === '' ? 'value 不能为空' : undefined}
              />
              {/* domain */}
              <TextField
                label={'domain'}
                value={formCookie?.domain}
                onChange={(event) => {
                  formCookie.domain = event.target.value;
                  props.onChangeCookie(formCookie.clone());
                }}
                error={formCookie.domain === ''}
                helperText={formCookie.domain === '' ? 'domain 不能为空' : undefined}
              />
              {/* path */}
              <TextField
                label={'path'}
                value={props.formCookie?.path}
                onChange={(event) => {
                  formCookie.path = event.target.value;
                  props.onChangeCookie(formCookie.clone());
                }}
                error={formCookie.path.match(/^\//) === null}
                helperText={formCookie.path.match(/^\//) === null ? `path 需要以 '/' 开头` : undefined}
              />
              {/* maxAge 为 null 时不显示修改 maxAge 的表单 */}
              <Box sx={{ display: 'flex' }}>
                {formCookie.maxAge !== null ? (
                  <>
                    <Switch
                      sx={{ flex: '0 0 auto', ml: -2 }}
                      checked={true}
                      onChange={() => {
                        formCookie.maxAge = null;
                        props.onChangeCookie(formCookie.clone());
                      }}
                    />
                    <TextField
                      type={'number'}
                      label={'max-age'}
                      value={props.formCookie?.maxAge}
                      onChange={(event) => {
                        formCookie.maxAge = parseInt(event.target.value);
                        props.onChangeCookie(formCookie.clone());
                      }}
                      sx={{ flex: '1 1 0' }}
                    />
                  </>
                ) : (
                  <>
                    <FormControlLabel
                      sx={{ margin: 0 }}
                      labelPlacement="start"
                      control={
                        <Switch
                          checked={false}
                          onChange={() => {
                            formCookie.maxAge = 0;
                            props.onChangeCookie(formCookie.clone());
                          }}
                        />
                      }
                      label={'max-age'}
                    />
                  </>
                )}
              </Box>
              {/* expires 为 null 时不显示修改 expires 的表单 */}
              <Box sx={{ display: 'flex' }}>
                {formCookie.expires !== null ? (
                  <>
                    <Switch
                      sx={{ flex: '0 0 auto', ml: -2 }}
                      checked={true}
                      onChange={() => {
                        formCookie.expires = null;
                        props.onChangeCookie(formCookie.clone());
                      }}
                    />
                    <DateTimePicker
                      label={'expires'}
                      value={props.formCookie?.expires}
                      onChange={(date: Dayjs) => {
                        formCookie.expires = date?.toDate() ?? new Date();
                        props.onChangeCookie(formCookie.clone());
                      }}
                      sx={{ flex: '1 1 0' }}
                      format="yyyy/MM/dd HH:mm"
                      ampm={false}
                      disablePast
                    />
                  </>
                ) : (
                  <>
                    <FormControlLabel
                      sx={{ margin: 0 }}
                      labelPlacement="start"
                      control={
                        <Switch
                          checked={false}
                          onChange={() => {
                            formCookie.expires = new Date();
                            props.onChangeCookie(formCookie.clone());
                          }}
                        />
                      }
                      label={'expires'}
                    />
                  </>
                )}
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            {/* 取消不保存 */}
            <Button
              color={'secondary'}
              onClick={() => {
                props.onChangeCookie(null);
              }}
            >
              取消
            </Button>
            {/* 保存后关闭表单 */}
            <Button
              color={'primary'}
              disabled={!formCookie.check()}
              onClick={async () => {
                formCookie?.getCookieEntity().save();
                props.onChangeCookie(null);
              }}
            >
              保存
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
