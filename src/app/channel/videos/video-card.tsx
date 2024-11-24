import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Video } from "@prisma/client";
import VideoThumbnail from "@/app/components/video-thumbnail";
import Timeago from "@/app/components/time-ago";
import { baseUrl } from "@/env";

const VideoCard: React.FC<{
  video: Video
}> = ({ video }) => {
  const formattedUrl = `${baseUrl}/video/${video.id}`;
  return (
    <Link href={formattedUrl} key={video.id}>
      <Card>
        <CardHeader>
          <CardTitle>{video.title}</CardTitle>
          <CardDescription>{video.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <VideoThumbnail url={video.thumbnailUrl} width={340} className="rounded-lg" />
        </CardContent>
        <CardFooter>
          <span className="text-sm">
            <Timeago date={new Date(video.createdAt)} />
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default VideoCard;