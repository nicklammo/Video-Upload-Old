import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";


const useScrollButtons = () => {

  const [scrollDirection, setScrollDirection] = useState<'left' | 'right' | 'none'>('none');
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  const scrollLeftRef = useRef<HTMLButtonElement>(null);
  const scrollRightRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {

    const handleScrollMouseUp = () => {
      setScrollDirection('none');
      setIsScrolling(false);
    };

    const leftButton = scrollLeftRef.current;
    const rightButton = scrollRightRef.current;

    if (leftButton && rightButton) {
      document.addEventListener('mouseup', handleScrollMouseUp);
    }

    return () => {
      document.removeEventListener('mouseup', handleScrollMouseUp);
    };
  }, []);

  const LeftButton = ({ ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {

    useEffect(() => {
      const handleMouseDown = () => {
        setScrollDirection('left');
        setIsScrolling(true);
      };

      scrollLeftRef.current?.addEventListener('mousedown', handleMouseDown);

      return () => {
        scrollLeftRef.current?.removeEventListener('mousedown', handleMouseDown);
      };
    }, []);

    return (
      <Button
        className="p-2 h-min rounded-full dark:bg-[#545454] dark:hover:bg-[#FF0E48]"
        {...props}
        ref={scrollLeftRef}
      >
        <svg data-id="21" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="m14 18-6-6 6-6"></path></svg>
      </Button>
    );
  };

  const RightButton = ({ ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {

    useEffect(() => {
      const handleMouseDown = () => {
        setScrollDirection('right');
        setIsScrolling(true);
      };
      scrollRightRef.current?.addEventListener('mousedown', handleMouseDown);

      return () => {
        scrollRightRef.current?.removeEventListener('mousedown', handleMouseDown);
      };
    }, []);

    return (
      <Button
        className="p-2 h-min rounded-full dark:bg-[#545454] dark:hover:bg-[#FF0E48]"
        {...props}
        ref={scrollRightRef}
      >
        <svg data-id="23" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="m10 18 6-6-6-6"></path></svg>
      </Button>
    );
  };

  return { ScrollLeftButton: LeftButton, ScrollRightButton: RightButton, isScrolling, scrollDirection };
};

export { useScrollButtons };

