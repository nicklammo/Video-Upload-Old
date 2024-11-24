import { Video as VideoType } from "@prisma/client";
import VideoCard from "../videos/video-card";

const Videos: React.FC<Readonly<{
  videos: VideoType[] | null,
}>> = ({ videos }) => {
  if (videos) return (
    <div className="grid grid-cols-3 gap-3 mt-3">
      {videos.map(video => 
        <VideoCard key={video.id} video={video} />
      )}
    </div>
  );
}

export default Videos;