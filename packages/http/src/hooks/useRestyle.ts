import { Theme } from '@mui/material';

export const CommonStyle = {
  main: {
    flex: '1 1 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxHeight: 'calc(100% - 49px)',
    position: 'relative',
  },
  toggleButton: {
    textTransform: 'none',
  },
  toggle: {
    flex: '0 0 auto',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
  },
  page: {
    flex: '1 1 0',
    width: '100%',
    height: 'calc(100% - 35px)',
  },
  table: {
    maxHeight: '100%',
    width: '100%',
  },
  tableContainer: {
    m: 1,
    height: (theme: Theme) => `calc(100% - ${theme.spacing(2)})`,
    width: (theme: Theme) => `calc(100% - ${theme.spacing(2)}) !important`,
  },
  tableInput: {
    width: '100%',
  },
  tableInputDelete: {
    textDecoration: 'line-through',
  },
};
