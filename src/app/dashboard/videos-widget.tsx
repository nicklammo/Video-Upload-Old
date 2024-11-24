import { getChannelData } from "@/app/channel/utils";
import { User } from "@/types";
import VideoCard from "./videos/video-card";

const VideosWidget: React.FC<{
  user: User,
}> = async({ user }) => {
  const videos = (await getChannelData(user.username))?.videos;
  if (videos) return (
    <VideoCard videos={videos} />
  );
};

export default VideosWidget;