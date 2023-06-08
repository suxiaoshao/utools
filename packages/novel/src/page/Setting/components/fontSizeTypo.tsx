import { Typography } from '@mui/material';
import { FontSize } from '@novel/app/font/fontSlice';

export interface FontSizeTypoProp {
  fontSize: FontSize;
}

export default function FontSizeTypo(props: FontSizeTypoProp): JSX.Element {
  return (
    <Typography
      sx={{
        fontSize: (theme) => theme.spacing(1.5 + props.fontSize / 10),
      }}
    >
      字号{props.fontSize}
    </Typography>
  );
}
