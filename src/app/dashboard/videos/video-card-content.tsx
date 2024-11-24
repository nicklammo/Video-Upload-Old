"use client";
import { Video } from "@prisma/client";
import { CardContent } from "@/components/ui/card";
import VideoThumbnail from "@/app/components/video-thumbnail";
import Link from "next/link";
import { useScrollableList } from "./hooks/useScrollableList";

const VideoCardContent: React.FC<{
  videos: Video[],
  isScrolling: boolean,
  scrollDirection: 'left' | 'right' | 'none',
}> = ({ videos, isScrolling, scrollDirection }) => {

  const { scrollableList } = useScrollableList({ list: videos, isScrolling, scrollDirection });

  if (scrollableList) return (
    <CardContent className="flex flex-row gap-3">
      {scrollableList.map(video =>
        <div
          key={video.id}
          className="flex flex-col gap-1 dark:hover:text-[#FF0E48]"
        >
          <Link href={`/video/${video.id}`} prefetch>
            <VideoThumbnail url={video.thumbnailUrl} width={200} className="rounded" />
            <span className="text-sm font-semibold">{video.title}</span>
          </Link>
        </div>
      )}
    </CardContent>
  );
};

export default VideoCardContent;