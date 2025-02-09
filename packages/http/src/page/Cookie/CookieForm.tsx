import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  type SxProps,
  TextField,
  type Theme,
} from '@mui/material';
import type { Cookie } from '@http/utils/http/cookie';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { match } from 'ts-pattern';

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

const ItemSx: SxProps<Theme> = { mt: 2 };

export default function CookieForm(props: CookieFormProp) {
  const { formCookie } = props;
  return (
    formCookie !== null && (
      <Dialog open={formCookie !== null} fullWidth maxWidth="sm">
        <DialogTitle>修改/添加 cookie</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }}>
            {/* name */}
            <TextField
              label="name"
              value={props.formCookie?.name}
              onChange={(event) => {
                formCookie.name = event.target.value;
                props.onChangeCookie(formCookie.clone());
              }}
              error={formCookie.name === ''}
              helperText={match(formCookie.name)
                .with('', () => 'name 不能为空')
                .otherwise(() => null)}
              sx={ItemSx}
            />
            {/* value */}
            <TextField
              label="value"
              value={formCookie.value}
              onChange={(event) => {
                formCookie.value = event.target.value;
                props.onChangeCookie(formCookie.clone());
              }}
              error={formCookie.value === ''}
              helperText={match(formCookie.value)
                .with('', () => 'value 不能为空')
                .otherwise(() => null)}
              sx={ItemSx}
            />
            {/* domain */}
            <TextField
              label="domain"
              value={formCookie?.domain}
              onChange={(event) => {
                formCookie.domain = event.target.value;
                props.onChangeCookie(formCookie.clone());
              }}
              error={formCookie.domain === ''}
              helperText={match(formCookie.domain)
                .with('', () => 'domain 不能为空')
                .otherwise(() => null)}
              sx={ItemSx}
            />
            {/* path */}
            <TextField
              label="path"
              value={props.formCookie?.path}
              onChange={(event) => {
                formCookie.path = event.target.value;
                props.onChangeCookie(formCookie.clone());
              }}
              error={formCookie.path.match(/^\//) === null}
              helperText={match(formCookie.path.match(/^\//))
                .with(null, () => `path 需要以 '/' 开头`)
                .otherwise(() => null)}
              sx={ItemSx}
            />
            {/* maxAge 为 null 时不显示修改 maxAge 的表单 */}
            <Box sx={{ display: 'flex', ...ItemSx }}>
              {match(formCookie.maxAge)
                .with(null, () => (
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
                    label="max-age"
                  />
                ))
                .otherwise((maxAge) => (
                  <>
                    <Switch
                      sx={{ flex: '0 0 auto', ml: -2 }}
                      checked
                      onChange={() => {
                        formCookie.maxAge = null;
                        props.onChangeCookie(formCookie.clone());
                      }}
                    />
                    <TextField
                      type="number"
                      label="max-age"
                      value={maxAge}
                      onChange={(event) => {
                        formCookie.maxAge = Number.parseInt(event.target.value, 10);
                        props.onChangeCookie(formCookie.clone());
                      }}
                      sx={{ flex: '1 1 0' }}
                    />
                  </>
                ))}
            </Box>
            {/* expires 为 null 时不显示修改 expires 的表单 */}
            <Box sx={{ display: 'flex', ...ItemSx }}>
              {match(formCookie.expires)
                .with(null, () => (
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
                    label="expires"
                  />
                ))
                .otherwise((expires) => (
                  <>
                    <Switch
                      sx={{ flex: '0 0 auto', ml: -2 }}
                      checked
                      onChange={() => {
                        formCookie.expires = null;
                        props.onChangeCookie(formCookie.clone());
                      }}
                    />
                    <DateTimePicker
                      label="expires"
                      value={dayjs(expires)}
                      onChange={(date) => {
                        formCookie.expires = date?.toDate() ?? new Date();
                        props.onChangeCookie(formCookie.clone());
                      }}
                      sx={{ flex: '1 1 0' }}
                      format="YYYY/MM/DD HH:mm"
                      ampm={false}
                      disablePast
                    />
                  </>
                ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          {/* 取消不保存 */}
          <Button
            color="secondary"
            onClick={() => {
              props.onChangeCookie(null);
            }}
          >
            取消
          </Button>
          {/* 保存后关闭表单 */}
          <Button
            color="primary"
            disabled={!formCookie.check()}
            onClick={() => {
              formCookie?.getCookieEntity().save();
              props.onChangeCookie(null);
            }}
          >
            保存
          </Button>
        </DialogActions>
      </Dialog>
    )
  );
}
