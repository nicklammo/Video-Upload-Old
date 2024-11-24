"use server";
const isValidImage = async(image: File) => {
  const validImageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  if (
    image.size > 0 && 
    image.size < (1 * 1024 * 1024) && 
    image.name !== 'undefined' && 
    image.name.trim() !== '' && 
    validImageTypes.includes(image.type)
  ) {
    return true;
  }

  return false;
}

const isValidVideo = async(video: File) => {
  const validVideoTypes = ['video/mp4'];
  if (
    video.size > 0 && 
    video.size < (1 * 1024 * 1024) && 
    video.name !== 'undefined' && 
    video.name.trim() !== '' && 
    validVideoTypes.includes(video.type)
  ) {
    return true;
  }

  return false;
}

export { isValidImage, isValidVideo };