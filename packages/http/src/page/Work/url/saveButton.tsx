import React from 'react';
import { HttpContext } from '../workPanel';
import { IconButton, Tooltip, Typography } from '@mui/material';
import { SaveAlt } from '@mui/icons-material';
import SaveHttp from '@http/components/httpSave/saveHttp';
import { httpArray } from '@http/store/httpArray';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 保存此 http 请求的按钮
 * */
export default function SaveButton() {
  const [saveHttpOpen, setSaveHttpOpen] = React.useState<boolean>(false);
  const { httpManager } = React.useContext(HttpContext);
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
      <SaveHttp
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
      />
    </>
  );
}
