interface VideoThumbnail extends React.ImgHTMLAttributes<HTMLImageElement> {
  url: string,
  width: number,
}

const VideoThumbnail: React.FC<VideoThumbnail> = ({ url, width, ...props }) => {
  const aspectRatio = 16 / 9;
  const calculatedHeight = width ? (width / aspectRatio) : undefined;
  return (
    <img src={url} width={width} height={calculatedHeight} alt="" {...props} />
  );
}

export default VideoThumbnail;