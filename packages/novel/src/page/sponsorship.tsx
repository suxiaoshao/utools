import React from 'react';
import alipay from '@novel/assets/alipay.jpg';
import wepay from '@novel/assets/wepay.jpg';
import Alipay from '@novel/components/common/icon/alipay';
import WePay from '@novel/components/common/icon/wepay';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 支持页面
 * */
export default function Sponsorship(): JSX.Element {
  /**
   * 显示的二维码图片
   * */
  const [imgSrc, setImgSrc] = React.useState<string>(alipay);
  return (
    <Box sx={{ overflow: 'hidden', height: '100%', width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          position: 'relative',
          height: '100%',
        }}
      >
        <Box component="img" sx={{ maxHeight: '80%', maxWidth: '50%' }} src={imgSrc} alt={'二维码'} />
        {/* 切换二维码按钮 */}
        <ToggleButtonGroup
          exclusive
          value={imgSrc}
          onChange={(event, value) => {
            if (value !== null) {
              setImgSrc(value);
            }
          }}
        >
          <ToggleButton value={alipay}>
            <Alipay />
          </ToggleButton>
          <ToggleButton value={wepay}>
            <WePay />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
}
