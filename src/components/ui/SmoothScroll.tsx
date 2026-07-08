'use client';

import Lenis from 'lenis';
import { useEffect, useRef } from 'react';

const SCROLL_STORAGE_KEY = 'lenis-scroll-position';

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    (window as typeof window & { lenis?: Lenis }).lenis = lenis;
    lenisRef.current = lenis;

    // DevTools, viewport ve içerik yüksekliği değişince Lenis'i güncelle
    const handleResize = () => {
      lenis.resize();
    };

    window.addEventListener('resize', handleResize);

    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });

    resizeObserver.observe(document.documentElement);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      sessionStorage.setItem(SCROLL_STORAGE_KEY, Math.round(scroll).toString());
    });

    const restore = async () => {
      const saved = sessionStorage.getItem(SCROLL_STORAGE_KEY);
      const target = saved ? parseInt(saved, 10) : NaN;

      if (Number.isNaN(target) || target <= 0) return;

      await document.fonts.ready;

      let frames = 0;

      const waitForLenis = () => {
        lenis.resize();

        if (lenis.limit > 0 || frames > 180) {
          lenis.scrollTo(target, {
            immediate: true,
            force: true,
          });
          return;
        }

        frames++;
        requestAnimationFrame(waitForLenis);
      };

      requestAnimationFrame(waitForLenis);
    };

    if (document.readyState === 'complete') {
      restore();
    } else {
      window.addEventListener('load', restore);
    }

    return () => {
      window.removeEventListener('load', restore);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
