import { Divider, IconButton, InputBase, Paper, Theme, Tooltip } from '@mui/material';
import MySelector from '@novel/components/common/mySelector';
import { ExitToApp, Search } from '@mui/icons-material';
import { useAppSelector } from '@novel/app/hooks';
import { SelectConfig } from '@novel/app/config/configSlice';
import { TotalConfig } from '@novel/page/EditConfig/const';

export const urlStyle = {
  form: (theme: Theme) => ({
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: `calc(100% - ${theme.spacing(2)})`,
    margin: 1,
    flex: '0 0 auto',
  }),
  input: {
    marginLeft: 1,
    flex: 1,
  },
  iconButton: {
    padding: 1,
  },
  divider: {
    height: '28px',
    margin: 0.5,
  },
  speedDial: {
    position: 'fixed',
    right: 2,
    top: 11,
    zIndex: 100,
  },
  loadingFather: {
    position: 'relative',
  },
  loading: {
    color: (theme: Theme) => theme.palette.primary.main,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
};

export interface SearchInputProp {
  /**
   * 活跃的配置
   * */
  activeConfig: TotalConfig | undefined;

  /**
   * 修改活跃的配置
   * */
  onActiveConfigChange(newConfig: TotalConfig | undefined): void;

  /**
   * 搜索关键词
   * */
  searchName: string;

  /**
   * 修改搜索关键词
   * */
  onSearchNameChange(newSearchName: string): void;

  /**
   * 搜索
   * */
  onSearch(): void;
}

/**
 * @author sushao
 * @version 0.4.0
 * @since 0.4.0
 * @description 搜索输入框
 * */
export default function SearchInput(props: SearchInputProp): JSX.Element {
  const totalConfigs = useAppSelector(SelectConfig);
  return (
    <Paper component="form" sx={urlStyle.form}>
      <MySelector<string | undefined>
        itemList={totalConfigs.map((value) => ({ text: value.name, value: value.mainPageUrl }))}
        onValueChange={(newValue) => {
          props.onActiveConfigChange(totalConfigs.find((value) => value.mainPageUrl === newValue));
        }}
        value={props.activeConfig?.mainPageUrl}
        sx={urlStyle.iconButton}
      />
      <Divider sx={urlStyle.divider} orientation="vertical" />
      <InputBase
        placeholder="搜索内容"
        sx={urlStyle.input}
        value={props.searchName}
        onChange={(event) => {
          props.onSearchNameChange(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            props.onSearch();
          }
        }}
      />
      <Tooltip title={'前往源网站'}>
        <IconButton
          onClick={() => {
            utools.shellOpenExternal(props.activeConfig?.mainPageUrl ?? '');
          }}
        >
          <ExitToApp />
        </IconButton>
      </Tooltip>
      <Divider sx={urlStyle.divider} orientation="vertical" />
      <Tooltip title={'搜索'}>
        <IconButton onClick={props.onSearch} disabled={props.activeConfig === undefined}>
          <Search />
        </IconButton>
      </Tooltip>
    </Paper>
  );
}
