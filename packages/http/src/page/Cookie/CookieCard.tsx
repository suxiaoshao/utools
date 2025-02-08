import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Chip,
  IconButton,
  Typography,
} from '@mui/material';
import { Add, DeleteForever, ExpandMore } from '@mui/icons-material';
import { Cookie } from '@http/utils/http/cookie';
import CookieForm from './CookieForm';
import { useSqlData } from '@http/store/sqlStore';
import type { CookieEntity } from '@http/database/entity/cookie.entity';
import { execSql } from '@http/database/mapper/util';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description cookieCard prop
 * */
export interface CookieCardProp {
  /**
   * 这个 cookie 集合的domain
   * */
  domain: string;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description cookieCard 组件
 * */
export default function CookieCard(props: CookieCardProp) {
  /**
   * 所有数据库信息
   * */
  const [sqlData] = useSqlData();
  /**
   * 获取所有 domain 为 props.domain 的 cookie
   * */
  const cookies = React.useMemo<CookieEntity[]>(() => {
    return sqlData.cookies.filter((value) => value.domain === props.domain);
  }, [props.domain, sqlData]);
  /**
   * 表单 cookie 数据
   * */
  const [formCookie, setFormCookie] = React.useState<Cookie | null>(null);
  return (
    <Accordion>
      {/* domain cookie 详情 */}
      <AccordionSummary expandIcon={<ExpandMore />}>
        {/* 删除这个 domain 的所有 cookie */}
        <IconButton
          sx={{ margin: '-12px 0 -12px -16px' }}
          onClick={() => {
            execSql(`delete from cookie where domain='${props.domain}'`);
          }}
        >
          <DeleteForever />
        </IconButton>
        {/* domain 名字 */}
        <Box sx={{ flex: '1 1 0' }}>
          <Typography sx={(theme) => ({ fontSize: theme.typography.pxToRem(15) })}>{props.domain}</Typography>
        </Box>
        {/* 这个domain 有几个 cookie */}
        <Box sx={{ flex: '1 1 0' }}>
          <Typography
            sx={(theme) => ({ fontSize: theme.typography.pxToRem(15), color: theme.palette.text.secondary })}
          >{`${cookies.length} cookies`}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {cookies.map((value) => (
          <Chip
            sx={{ textTransform: 'none', m: 1 }}
            avatar={<Avatar>{value.name[0]}</Avatar>}
            key={value.name}
            label={value.name}
            onDelete={() => {
              value.delete();
            }}
            onClick={() => {
              setFormCookie(value.toCookie());
            }}
          />
        ))}
        {/* 给这个 domain 添加 cookie */}
        <IconButton
          color="primary"
          onClick={() => {
            setFormCookie(new Cookie('', '', props.domain, '/', Date.now(), null, null));
          }}
        >
          <Add />
        </IconButton>
      </AccordionDetails>
      <CookieForm
        formCookie={formCookie}
        onChangeCookie={(newCookie) => {
          setFormCookie(newCookie);
        }}
      />
    </Accordion>
  );
}
