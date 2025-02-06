import { useState, useEffect } from "react";

const useScrollspy = (ids: string[]) => {
  const [activeIds, setActiveIds] = useState<string[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const activeIdSet = new Set<string>(activeIds);
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            activeIdSet.add(entry.target.id);
          } else {
            activeIdSet.delete(entry.target.id);
          }
        });
        setActiveIds(Array.from(activeIdSet));
      },
      { rootMargin: "-100px", threshold: 0.2 }
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      ids.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [activeIds, ids]);

  return activeIds;
};

export default useScrollspy;
