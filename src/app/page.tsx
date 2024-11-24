const fetchAllVideos = async () => {
  const res = await fetch('http://localhost:3000/api/video/all');
  if (res.ok) {
    const data = await res.json();
    return data.videos;
  }
}

const HomePage: React.FC<{
  session: string,
}> = async () => {
  const videos = await fetchAllVideos();
  return (
    <div className="flex flex-row">
      {videos.map(video =>
        <div key={video.id}>
          <img src={video.thumbnailUrl} />
          <div>{video.title}</div>
          <div>{video.description}</div>
          <div>{video.author.username}</div>
        </div>
      )}
    </div>
  );
};

export default HomePage;