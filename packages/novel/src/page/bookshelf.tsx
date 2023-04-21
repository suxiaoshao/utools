import {
  Avatar,
  Box,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import ChapterLink from '../components/common/chapterLink';
import { Delete } from '@mui/icons-material';
import { useReadRecords } from '../hooks/data/useReadRecords';
import { TotalDataBuild } from '../utils/data/totalData';
import { historyStore } from '../store/history.store';

export default function Bookshelf(): JSX.Element {
  const { readRecords, updateReadRecords } = useReadRecords();
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <TableContainer
        sx={{
          margin: 1,
          width: (theme) => `calc(100% - ${theme.spacing(2)})`,
          overflow: 'auto',
          height: (theme) => `calc(100% - ${theme.spacing(2)})`,
        }}
        component={Paper}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>小说信息</TableCell>
              <TableCell>作者</TableCell>
              <TableCell>最后阅读章节</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {readRecords.map((value) => (
              <TableRow key={value.novelId + value.mainPageUrl}>
                <TableCell padding={'none'} sx={{ maxWidth: 30 }}>
                  <ListItem
                    button
                    onClick={() => {
                      historyStore.push({
                        pathname: '/novel',
                        search: `novelId=${value.novelId}&url=${value.mainPageUrl}`,
                        name: value.name,
                      });
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar src={value.image ?? undefined} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={value.name}
                      secondary={value.desc}
                      secondaryTypographyProps={{ noWrap: true }}
                    />
                  </ListItem>
                </TableCell>
                <TableCell>{value.author}</TableCell>
                <TableCell>
                  <ChapterLink chapter={value.chapter} novelId={value.novelId} url={value.mainPageUrl} />
                </TableCell>
                <TableCell padding={'none'}>
                  <Tooltip title={'删除记录'}>
                    <IconButton
                      onClick={() => {
                        const totalData = TotalDataBuild.getTotalData();
                        totalData.removeRecord(value.novelId, value.mainPageUrl);
                        updateReadRecords();
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
