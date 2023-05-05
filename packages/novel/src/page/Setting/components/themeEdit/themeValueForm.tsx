import { Box } from '@mui/material';

const classes = {
  main: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    margin: 1,
  },
  light: {
    backgroundColor: '#fff',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  dark: {
    backgroundColor: '#424242',
    color: '#fff',
  },
  yellow: {
    backgroundColor: '#fafafa',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  green: {
    backgroundColor: '#424242',
    color: '#fff',
  },
};

export interface ThemeFormProp {
  // /**
  //  * 绑定的主题值
  //  * */
  // value: ThemeValue;
  // /**
  //  * 修改
  //  * */
  // onChange(newValue: ThemeValue): void;
}

/**
 * 编辑 settingValue
 * */
export default function ThemeValueForm({}: ThemeFormProp): JSX.Element {
  // const themeList = useThemeList();
  return (
    <Box sx={classes.main}>
      {/* {themeList.map((value) => (
        <ThemeEnv theme={value} key={value.name}>
          <ThemeButton
            onClick={() => {
              props.onChange(value);
            }}
            disabled={props.value.name === value.name}
          >
            {value.name}
          </ThemeButton>
        </ThemeEnv>
      ))} */}
    </Box>
  );
}
