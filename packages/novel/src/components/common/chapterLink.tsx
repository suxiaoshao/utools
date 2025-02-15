import { Link, type LinkProps } from '@mui/material';
import type { Chapter } from '@novel/utils/web/novelInfo';
import { useCustomNavigate } from '@novel/app/history/historySlice';

export interface ChapterLinkProp extends LinkProps {
  chapter: Chapter;
  novelId: string;
  url: string;
}

export default function ChapterLink({ chapter, novelId, url, ...props }: ChapterLinkProp) {
  const navigate = useCustomNavigate();
  return (
    <Link
      {...props}
      href={`#/chapter?novelId=${novelId}&url=${url}&chapterId=${chapter.chapterId}`}
      onClick={(event: React.MouseEvent) => {
        event.preventDefault();
        navigate(chapter.name, {
          tag: 'push',
          data: `/chapter?novelId=${novelId}&url=${url}&chapterId=${chapter.chapterId}`,
        });
      }}
    >
      {chapter.name}
    </Link>
  );
}
