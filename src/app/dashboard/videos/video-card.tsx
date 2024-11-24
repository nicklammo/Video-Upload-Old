"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import VideoCardContent from "./video-card-content";
import { Video } from "@prisma/client";
import { useScrollButtons } from "./hooks/useScrollButtons";

const VideoCard: React.FC<{
  videos: Video[],
}> = ({ videos }) => {

  const { ScrollLeftButton, ScrollRightButton, isScrolling, scrollDirection } = useScrollButtons();

  if (videos) return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Your Videos</CardTitle>
        <div className="flex flex-row justify-center gap-6">
          <ScrollLeftButton />
          <ScrollRightButton />
        </div>
      </CardHeader>
      <VideoCardContent videos={videos} isScrolling={isScrolling} scrollDirection={scrollDirection} />
    </Card>
  );
}

export default VideoCard;