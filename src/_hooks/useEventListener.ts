import { useEffect, useRef } from "react";

const useEventListener = (
  eventType: 'keydown',
  callback: (e: any) => void,
  element:Window | HTMLElement,
) => {
  const callbackRef = useRef<any>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (e: Event) => callbackRef.current(e);
    element.addEventListener(eventType, handler);

    return () => element.removeEventListener(eventType, handler);
  }, [element, eventType]);
}

export { useEventListener };