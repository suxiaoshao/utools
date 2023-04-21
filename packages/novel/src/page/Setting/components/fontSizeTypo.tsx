import { Theme, Typography } from '@material-ui/core';
import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { FontStyleProp } from '../../chapterPage';
import { FontSize } from '../../../store/setting.store';

export interface FontSizeTypoProp {
  fontSize: FontSize;
}

const useClasses = makeStyles<Theme, FontStyleProp>((theme) =>
  createStyles({
    font: {
      fontSize: (props) => {
        return theme.spacing(1.5 + props.fontSize / 10);
      },
    },
  }),
);

export default function FontSizeTypo(props: FontSizeTypoProp): JSX.Element {
  const classes = useClasses(props);
  return <Typography className={classes.font}>字号{props.fontSize}</Typography>;
}
