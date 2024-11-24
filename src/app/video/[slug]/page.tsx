/* COMPONENTS */
import { Card, CardContent } from "@/components/ui/card";
import Comments from "../comments";
import VideoPlayer from "@/app/components/video-player";
/* UTILITIES */
import { getSession } from "@/auth";
import { getVideoComments, getVideoInfo } from "../utils";
import { userIsVideoAuthor } from "../utils";
/* THIRD PARTY */
import { notFound } from "next/navigation";
import VideoCardHeader from "./video-card-header";

const VideoPage: React.FC<{
  params: {
    slug: string,
  }
}> = async({ params }) => {
  const user = (await getSession())?.user;
  const video = await getVideoInfo(params.slug);
  const comments = await getVideoComments(params.slug);
  if (!video) return notFound();

  const isVideoAuthor = await userIsVideoAuthor(user?.username, video.author.username);
  
  if (video) return (
    <div className="container max-w-[1200px] flex flex-col gap-3 p-3">
      <Card>
        <VideoCardHeader video={{id: video.id, title: video.title, description: video.description}} isVideoAuthor={isVideoAuthor} />
        <CardContent className="p-3">
          <VideoPlayer src={video.url} />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-3">
          <Comments comments={comments} videoId={video.id} user={user} />
        </CardContent>
      </Card>
    </div>
  );
}

export default VideoPage; 