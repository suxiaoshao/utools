import React from 'react';
import {
  IconButton,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useTableAdd } from '@http/hooks/useTableAdd';
import { HttpContext } from '../HttpContext';
import { CommonStyle } from '@http/hooks/useRestyle';
import { match } from 'ts-pattern';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 获取基本 url 后缀
 * */
function getBaseSuffixUrl(oldUrl: string, paramsList: { value: string; key: string }[]): string {
  let suffixUrl = '';
  if (!oldUrl.includes('?')) {
    suffixUrl += '?';
  }
  if (paramsList.length > 0 && oldUrl[oldUrl.length - 1] !== '&') {
    suffixUrl += '&';
  }
  return suffixUrl;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description params 组件,用于修改 url 链接上 params 的值
 * */
export default function Params() {
  const { httpManager, fatherUpdate } = React.useContext(HttpContext);
  const { setKeyFlag, setValueFlag, keyRef, valueRef } = useTableAdd([httpManager.url]);
  /**
   * 获取 params 的键值对列表
   * */
  const paramsList = React.useMemo<
    {
      /**
       * params 的值
       * */
      value: string;
      /**
       * params 的键
       * */
      key: string;
    }[]
  >(() => {
    const newUrl = httpManager.url
      .split('?')[1]
      ?.match(/(?<key>[^=&]*)=(?<value>[^=&]*)&?/g)
      ?.map((value) => {
        const data = value.match(/(?<key>[^=&]*)=(?<value>[^=&]*)&?/);
        return {
          value: data?.groups?.value as string,
          key: data?.groups?.key as string,
        };
      });
    if (newUrl === undefined) {
      return [];
    }
    return newUrl;
  }, [httpManager.url]);

  /**
   * 从 paramsList 的变化中更新 url
   * */
  function setUrlFromParamsList(newParamsList: { value: string; key: string }[]) {
    /**
     * paramsList 长度为零的话,只保留 url ? 之前字符串
     * */
    if (newParamsList.length === 0) {
      httpManager.url = httpManager.url.split('?')[0];
      fatherUpdate();
    } else {
      const newUrl =
        httpManager.url.split('?')[0] +
        newParamsList.reduce<string>(
          (previousValue, currentValue) => `${previousValue}${currentValue.key}=${currentValue.value}&`,
          '?',
        );
      httpManager.url = newUrl.slice(0, -1);
      fatherUpdate();
    }
  }

  return (
    <TableContainer component={Paper} sx={CommonStyle.tableContainer}>
      <Table stickyHeader size="small" sx={CommonStyle.table}>
        {/* 表头 */}
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" />
            <TableCell>key</TableCell>
            <TableCell>value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paramsList.map((value, index) => (
            <TableRow key={`${value.key}${index}`}>
              <TableCell padding="none">
                <IconButton
                  onClick={() => {
                    const newParamsList = [...paramsList];
                    newParamsList.splice(index, 1);
                    setUrlFromParamsList(newParamsList);
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </TableCell>
              <TableCell>
                <InputBase
                  sx={CommonStyle.tableInput}
                  placeholder="key"
                  value={value.key}
                  inputRef={match(index)
                    .with(paramsList.length - 1, () => keyRef)
                    .otherwise(() => undefined)}
                  onChange={(event) => {
                    const newParamsList = [...paramsList];
                    newParamsList[index].key = event.target.value;
                    setUrlFromParamsList(newParamsList);
                  }}
                />
              </TableCell>
              <TableCell>
                <InputBase
                  sx={CommonStyle.tableInput}
                  placeholder="value"
                  value={value.value}
                  inputRef={match(index)
                    .with(paramsList.length - 1, () => valueRef)
                    .otherwise(() => undefined)}
                  onChange={(event) => {
                    const newParamsList = [...paramsList];
                    newParamsList[index].value = event.target.value;
                    setUrlFromParamsList(newParamsList);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
          {/* 添加 params 部分 */}
          <TableRow>
            <TableCell padding="checkbox" />
            <TableCell>
              <InputBase
                sx={CommonStyle.tableInput}
                placeholder="key"
                value={''}
                onChange={(event) => {
                  if (event.target.value !== '') {
                    let suffixUrl = getBaseSuffixUrl(httpManager.url, paramsList);
                    suffixUrl += `${event.target.value}=`;
                    setKeyFlag();
                    httpManager.url += suffixUrl;
                    fatherUpdate();
                  }
                }}
              />
            </TableCell>
            <TableCell>
              <InputBase
                sx={CommonStyle.tableInput}
                placeholder="value"
                value={''}
                onChange={(event) => {
                  if (event.target.value !== '') {
                    let suffixUrl = getBaseSuffixUrl(httpManager.url, paramsList);
                    suffixUrl += `=${event.target.value}`;
                    setValueFlag();
                    httpManager.url += suffixUrl;
                    fatherUpdate();
                  }
                }}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
