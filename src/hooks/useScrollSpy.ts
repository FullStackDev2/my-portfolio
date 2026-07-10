'use client';

import { useEffect, useState } from 'react';

export default function useScrollSpy(ids: string[]) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);

        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: '-40% 0px -50% 0px',
        threshold: 0.1,
      }
    );

    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    const hash = window.location.hash.replace('#', '');

    if (hash && ids.includes(hash)) {
      setActiveId(hash);
    }

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
