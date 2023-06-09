import React from 'react';
import {
  Chip,
  IconButton,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import { RequestUploadFile } from '@http/utils/http/requestUploadFile';
import { Delete, Error, InsertDriveFile, Refresh } from '@mui/icons-material';
import { useForceUpdate } from '@http/hooks/useForceUpdate';
import CustomSelector from '../../../../components/CustomSelector';
import { useTableAdd } from '@http/hooks/useTableAdd';
import { RequestContext } from '../request';
import { CommonStyle } from '@http/hooks/useRestyle';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description form-data 表格, 用于输入 form-data 数据
 * */
export default function ReqFormData(): JSX.Element {
  const forceUpdate = useForceUpdate();
  const {
    request: { dataForms },
  } = React.useContext(RequestContext);
  const { setKeyFlag, setValueFlag, keyRef, valueRef } = useTableAdd([dataForms.length]);
  return (
    <TableContainer sx={{ width: '100%', height: '100%' }} component={Paper}>
      <Table stickyHeader size={'small'}>
        {/* 表头 */}
        <TableHead>
          <TableRow>
            <TableCell padding="none">
              <IconButton
                onClick={() => {
                  forceUpdate();
                }}
              >
                <Refresh fontSize="small" />
              </IconButton>
            </TableCell>
            <TableCell>key</TableCell>
            <TableCell>value</TableCell>
            <TableCell>select</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataForms.map((value, index) => (
            <TableRow key={index}>
              <TableCell padding="none">
                <IconButton
                  onClick={() => {
                    dataForms.splice(index, 1);
                    forceUpdate();
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
                  onChange={(event) => {
                    value.key = event.target.value;
                    forceUpdate();
                  }}
                  inputRef={index === dataForms.length - 1 ? keyRef : undefined}
                />
              </TableCell>
              <TableCell>
                {value.isFile ? (
                  value.path === null ? (
                    <Chip
                      onClick={() => {
                        value.setPath();
                        forceUpdate();
                      }}
                      size="small"
                      label="选择文件"
                      icon={<InsertDriveFile />}
                    />
                  ) : (
                    <Tooltip title={value.path}>
                      {value.fileExists() ? (
                        <Chip
                          icon={<InsertDriveFile />}
                          size="small"
                          label={value.getFileName()}
                          onDelete={() => {
                            value.setIsFile();
                            forceUpdate();
                          }}
                          color="primary"
                        />
                      ) : (
                        <Chip
                          size="small"
                          label="似乎文件不存在"
                          onDelete={() => {
                            value.setIsFile();
                            forceUpdate();
                          }}
                          icon={<Error />}
                          color="secondary"
                        />
                      )}
                    </Tooltip>
                  )
                ) : (
                  <InputBase
                    placeholder="value"
                    value={value.value}
                    onChange={(event) => {
                      value.setValue(event.target.value);
                      forceUpdate();
                    }}
                    inputRef={index === dataForms.length - 1 ? valueRef : undefined}
                  />
                )}
              </TableCell>
              <TableCell>
                <CustomSelector<'text' | 'file'>
                  variant="contained"
                  color="primary"
                  value={value.isFile ? 'file' : 'text'}
                  onValueChange={(newValue) => {
                    if (newValue === 'text') {
                      value.setNotFile();
                    } else {
                      value.setIsFile();
                    }
                    forceUpdate();
                  }}
                  itemList={[
                    { text: 'file', value: 'file' },
                    { value: 'text', text: 'text' },
                  ]}
                />
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell padding="checkbox" />
            <TableCell>
              <InputBase
                sx={CommonStyle.tableInput}
                placeholder="key"
                value={''}
                onChange={(event) => {
                  setKeyFlag();
                  dataForms.push(new RequestUploadFile(event.target.value, false, '', null));
                  forceUpdate();
                }}
              />
            </TableCell>
            <TableCell>
              <InputBase
                value=""
                sx={CommonStyle.tableInput}
                placeholder="value"
                onChange={(event) => {
                  setValueFlag();
                  dataForms.push(new RequestUploadFile('', false, event.target.value, null));
                  forceUpdate();
                }}
              />
            </TableCell>
            <TableCell>
              <CustomSelector<'text' | 'file'>
                variant="contained"
                color="primary"
                value={'text'}
                onValueChange={(newValue) => {
                  if (newValue === 'text') {
                    dataForms.push(new RequestUploadFile('', false, '', null));
                  } else {
                    dataForms.push(new RequestUploadFile('', true, '', null));
                  }
                  forceUpdate();
                }}
                itemList={[
                  { text: 'file', value: 'file' },
                  { value: 'text', text: 'text' },
                ]}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
