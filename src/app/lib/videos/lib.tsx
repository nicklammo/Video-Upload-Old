const getVideoThumbnail = (url: string) => {
  return (
    <video aria-label="Video thumbnail">
      <source src={`${url}#t=5`} type="video/mp4" />
    </video>
  )
}

const getVideoPlayer = (url: string) => {
  return (
    <video controls autoPlay aria-label="Video player">
      <source src={url} type="video/mp4" />
    </video>
  )
}

export { getVideoThumbnail, getVideoPlayer };