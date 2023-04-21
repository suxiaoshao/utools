import React from 'react';
import { Link, LinkProps } from '@mui/material';
import { Chapter } from '../../utils/web/novelInfo';
import { useNavigate } from 'react-router-dom';

export interface ChapterLinkProp extends LinkProps {
  chapter: Chapter;
  novelId: string;
  url: string;
}

export default function ChapterLink({ chapter, novelId, url, ...props }: ChapterLinkProp): JSX.Element {
  const navigate = useNavigate();
  return (
    <Link
      {...props}
      href={`#/chapter?novelId=${novelId}&url=${url}&chapterId=${chapter.chapterId}`}
      onClick={(event: React.MouseEvent) => {
        event.preventDefault();
        navigate(`/chapter?novelId=${novelId}&url=${url}&chapterId=${chapter.chapterId}`);
      }}
    >
      {chapter.name}
    </Link>
  );
}
