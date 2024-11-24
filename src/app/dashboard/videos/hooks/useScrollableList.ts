import { useEffect, useState } from "react";

type UseScrollList = ({
  list: any[],
  isScrolling: boolean,
  scrollDirection: 'left' | 'right' | 'none',
});

const useScrollableList = ({ list, isScrolling, scrollDirection }: UseScrollList) => {
  const [scrollableList, setScrollableList] = useState<any[] | undefined>(list);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isScrolling) {
      interval = setInterval(() => {
        setScrollableList(prevList => {
          if (!prevList) return undefined;
          const newList = [...prevList];
          if (scrollDirection === 'left') {
            const firstItem = newList.shift();
            return firstItem ? [...newList, firstItem] : prevList;
          } else if (scrollDirection === 'right') {
            const lastItem = newList.pop();
            return lastItem ? [lastItem, ...newList] : prevList;
          } else {
            return prevList;
          }
        });
      }, 200);
    }

    return () => clearInterval(interval);
  }, [isScrolling, scrollDirection, scrollableList]);

  return { scrollableList };
};

export { useScrollableList };