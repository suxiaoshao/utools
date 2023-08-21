import React from 'react';
import CookieCard from './CookieCard';
import { Cookie } from '@http/utils/http/cookie';
import CookieForm from './CookieForm';
import { Box, Fab } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useSqlData } from '@http/store/sqlStore';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description cookie 页面的组件
 * */
export default function CookiePage(): JSX.Element {
  /**
   * @description 数据库数据
   * */
  const [sqlData] = useSqlData();
  /**
   * @description 数据库中 cookies 的 domains 的不重复集合
   * */
  const domains = React.useMemo<string[]>(() => {
    const filterData = sqlData.cookies.map((value) => {
      return value.domain;
    });
    return [...new Set(filterData)];
  }, [sqlData.cookies]);
  /**
   * @description 被修改或者将被添加的 cookie,诺为 null 说明没有数据要被修改或者被添加
   * */
  const [formCookie, setFormCookie] = React.useState<Cookie | null>(null);
  return (
    <Box sx={{ overflow: 'auto', position: 'relative', p: 2, width: '100%', height: '100%' }}>
      {/* loading 页面 */}
      <Box>
        {/* cookieCard domain 相同的一起展示 */}
        {domains.map((value) => (
          <CookieCard domain={value} key={value} />
        ))}
      </Box>
      {/* 需要修改或者添加的 cookie ,formCookie 为空的时候不展示 */}
      <CookieForm
        formCookie={formCookie}
        onChangeCookie={(newCookie) => {
          setFormCookie(newCookie);
        }}
      />
      {/* 添加新 cookie ,点击的话设置 formCookie 为一个新 cookie */}
      <Fab
        sx={(theme) => ({
          position: 'absolute',
          right: theme.spacing(2),
          bottom: theme.spacing(2),
          zIndex: theme.zIndex.modal - 1,
        })}
        onClick={() => {
          setFormCookie(new Cookie('', '', '', '/', Date.now(), null, null));
        }}
        color={'primary'}
      >
        <Add />
      </Fab>
    </Box>
  );
}
