import React from 'react';
import { historyStore } from '../../store/history.store';
import { Link, LinkProps } from '@mui/material';
import { Chapter } from '../../utils/web/novelInfo';

export interface ChapterLinkProp extends LinkProps {
  chapter: Chapter;
  novelId: string;
  url: string;
}

export default function ChapterLink({ chapter, novelId, url, ...props }: ChapterLinkProp): JSX.Element {
  return (
    <Link
      {...props}
      href={`#/chapter?novelId=${novelId}&url=${url}&chapterId=${chapter.chapterId}`}
      onClick={(event: React.MouseEvent) => {
        event.preventDefault();
        historyStore.push({
          pathname: '/chapter',
          search: `?novelId=${novelId}&url=${url}&chapterId=${chapter.chapterId}`,
          name: chapter.name,
        });
      }}
    >
      {chapter.name}
    </Link>
  );
}
