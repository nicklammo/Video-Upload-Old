import UploadAvatar from "./upload-avatar";
import UploadVideo from "./upload-video";
import { getSession } from "@/auth";
import VideosWidget from "./videos-widget";

const DashboardPage: React.FC = async() => {
  const user = (await getSession())?.user;
  if (user) return (
    <div className="container">
      <div>
        <VideosWidget user={user} />
      </div>
      <div className="grid grid-cols-2 *:h-min">
        <UploadVideo />
        <UploadAvatar user={user} />
      </div>
    </div>
  );
};

export default DashboardPage;