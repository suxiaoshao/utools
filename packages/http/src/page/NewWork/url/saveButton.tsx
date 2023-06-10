import React from 'react';
import { IconButton, Tooltip, Typography } from '@mui/material';
import { SaveAlt } from '@mui/icons-material';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 保存此 http 请求的按钮
 * */
export default function SaveButton(): JSX.Element {
  const [, setSaveHttpOpen] = React.useState<boolean>(false);
  return (
    <>
      <Tooltip title={<Typography variant="body2">保存此请求</Typography>}>
        <IconButton
          sx={{ p: 1 }}
          onClick={() => {
            setSaveHttpOpen(true);
          }}
        >
          <SaveAlt />
        </IconButton>
      </Tooltip>
      {/* todo */}
      {/* <SaveHttp
        open={saveHttpOpen}
        onClose={() => {
          setSaveHttpOpen(false);
        }}
        onSave={(newHttpEntity) => {
          httpManager.changeFormHttpEntity(newHttpEntity);
          setSaveHttpOpen(false);
          httpArray.update();
        }}
        httpManager={httpManager}
      /> */}
    </>
  );
}
