"use client";
import { forwardRef } from "react";

interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  file: File;
}
const Video = forwardRef<HTMLVideoElement, VideoProps>(({ file, ...props }, ref) => {
  const url = URL.createObjectURL(file);
  return (
    <video controls aria-label="Video player" ref={ref} {...props}>
      <source src={url} type={file.type} />
    </video>
  );
});

Video.displayName = "Video";

export default Video;