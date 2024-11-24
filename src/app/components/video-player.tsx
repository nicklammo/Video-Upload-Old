"use client";
import { useEventListener } from "@/_hooks/useEventListener";
import { Button } from "@/components/ui/button";
import { JWSSignatureVerificationFailed } from "jose/errors";
import { useEffect, useRef, useState, Fragment } from "react";

interface VideoPlayer extends React.VideoHTMLAttributes<HTMLVideoElement> {

}

const VideoPlayer: React.FC<VideoPlayer> = ({ ...props }) => {

  const videoRef = useRef<HTMLVideoElement>(null);
  const playPauseButtonRef = useRef<HTMLButtonElement>(null);
  const volumeSliderRef = useRef<HTMLInputElement>(null);
  const controlBarRef = useRef<HTMLDivElement>(null);
  const progressSliderRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0);

  const video = videoRef.current;

  useEffect(() => {

    let interval: NodeJS.Timeout;

    if (video) {
      if (isPlaying) {
        interval = setInterval(() =>  {
        setProgress((video.currentTime / video.duration) * 100);
        }, 50);
        if (video.ended) {
          setIsPlaying(false);
        }
      }
    }

    return () => clearInterval(interval);

  }, [progress, isPlaying]);

  const handleKeyDown = (e: KeyboardEvent) => {

    if (video) {
      if (e.key === ' ') {
        if (e.target === document.body) {
          e.preventDefault();
        }
        if (document.activeElement === playPauseButtonRef.current) {
          return;
        }
        if (isPlaying) {
          video.pause();
          setIsPlaying(false);
        } else {
          video.play();
          setIsPlaying(true);
        }
      } else if (e.key === 'ArrowLeft') {
        if (e.target === document.body) {
          e.preventDefault();
        }
        if (document.activeElement === volumeSliderRef.current) {
          return;
        }
        if (video.currentTime - 10 >= 0) {
          video.currentTime = video.currentTime - 10;
          setProgress((video.currentTime / video.duration) * 100);
          if (!isPlaying) {
            video.play();
            setIsPlaying(true);
          }
        } else {
          video.currentTime = 0;
          setProgress(0);
        }
      } else if (e.key === 'ArrowRight') {
        if (e.target === document.body) {
          e.preventDefault();
        }
        if (document.activeElement === volumeSliderRef.current) {
          return;
        }
        if (video.currentTime + 10 <= video.duration) {
          video.currentTime = video.currentTime + 10;
          setProgress((video.currentTime / video.duration) * 100);
          if (!isPlaying) {
            video.play();
            setIsPlaying(true);
          }
        } else {
          video.currentTime = video.duration;
          setProgress(100);
          setIsPlaying(false);
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [video, progress]);

  useEffect(() => {
    if (video) {
      setVolume(video.volume * 100);
    }
  }, [video, isPlaying]);


  return (
  <Fragment>
    <div 
      className="relative transition-opacity"
      onMouseEnter={() => {
        if (controlBarRef.current) {
          controlBarRef.current.className = "relative opacity-100";
        }
      }}
      onMouseLeave={() => {
        if (controlBarRef.current) {
          controlBarRef.current.className = "relative opacity-0"
        }
      }}
    >
      <video
        {...props}
        ref={videoRef} 
        onClick={() => {
          if (videoRef.current) {
            if (isPlaying) {
              videoRef.current.pause();
              setIsPlaying(false);
             } else {
              videoRef.current.play();
              setIsPlaying(true);
             }
          }
        }}
      />
    <div className="flex flex-col absolute bottom-0 w-full opacity-0 *:outline-none" ref={controlBarRef} >
      <input 
          type="range"
          min={0}
          max={100}
          value={progress} 
          onChange={(e) => {
            const newValue = parseInt(e.target.value);
            setProgress(newValue);
            if (videoRef.current) {
              const newTime = videoRef.current.duration * newValue / 100;
              videoRef.current.currentTime = newTime;
            }
          }}
          ref={progressSliderRef}
          className="w-full absolute accent-[#FF0E48]" 
        />
        <div className="flex flex-row gap-6 pb-1 pt-2 px-2 bg-black bg-opacity-50">
          {isPlaying ? (
            <Button 
              variant="ghost" 
              className="p-2 hover:bg-black hover:bg-opacity-30"
              onClick={() => { 
                if (videoRef.current) {
                  videoRef.current.pause();
                  setIsPlaying(false);
                }
              }}
              ref={playPauseButtonRef}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
              </svg>
            </Button>
          ) : (
          <Button 
            variant="ghost" 
            className="p-2 hover:bg-black hover:bg-opacity-30"
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.play();
                setIsPlaying(true);
              }
            }}
            ref={playPauseButtonRef}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
            </svg>
          </Button>
          )}
          <div className="flex flex-row gap-1">
            <Button 
              variant="ghost" 
              className="p-2 hover:bg-black hover:bg-opacity-30"
              onClick={() => {
                if (videoRef.current) {
                  if (volume > 0) {
                    videoRef.current.volume = 0;
                    setVolume(0);
                  } else {
                    const newVolume = 100;
                    videoRef.current.volume = newVolume / 100;
                    setVolume(newVolume);
                  }
                }
              }}
              >
              {volume > 0 ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
                <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
              </svg>
              ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z" />
              </svg>
              )}
            </Button>
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              ref={volumeSliderRef}
              onChange={(e) => {
                const newVolume = parseInt(e.target.value);
                setVolume(newVolume);
                if (videoRef.current) {
                  videoRef.current.volume = newVolume / 100;
                }
              }}
              className="accent-[#FF0E48]" 
            />
          </div>
        </div>
      </div>
    </div>
  </Fragment>
  );
};

export default VideoPlayer;