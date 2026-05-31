'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import NavIndicator from '@/components/ui/NavIndicator';

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const navRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const [active, setActive] = useState('hero');
  const [activeRect, setActiveRect] = useState({ left: 0, width: 0 });

  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 100], [0, -6]);
  const blurValue = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(16px)'],
  );
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0.03)', 'rgba(9, 9, 11, 0.65)'],
  );
  const borderOpacity = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.05)'],
  );

  // 2. ADIM: Bağımlılık dizisi artık boş [] kalabilir, ESLint hata vermez.
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0.15,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions,
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = itemRefs.current[active];
    const nav = navRef.current;

    if (!el || !nav) return;

    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    setActiveRect({
      left: elRect.left - navRect.left,
      width: elRect.width,
    });
  }, [active]);

  return (
    <motion.header
      style={{ y }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 will-change-transform"
    >
      <motion.div
        style={{
          backdropFilter: blurValue,
          backgroundColor,
          borderColor: borderOpacity,
        }}
        className="flex items-center gap-12 px-8 py-4 rounded-full border transition-shadow duration-500 shadow-none hover:shadow-2xl hover:shadow-black/40"
      >
        <h1
          onClick={() => {
            document
              .getElementById('hero')
              ?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex-shrink-0 font-bold tracking-widest text-white text-sm cursor-pointer select-none bg-clip-text bg-gradient-to-b from-white to-zinc-400"
        >
          NURETTIN
        </h1>

        <nav
          ref={navRef}
          className="relative flex items-center gap-8 text-sm whitespace-nowrap"
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              ref={(el) => {
                itemRefs.current[item.id] = el;
              }}
              onClick={() => {
                setActive(item.id);
                document.getElementById(item.id)?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                });
              }}
              className={`cursor-pointer transition-colors duration-300 font-medium text-xs uppercase tracking-wider ${
                active === item.id
                  ? 'text-white'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              {item.label}
            </a>
          ))}

          <NavIndicator activeRect={activeRect} />
        </nav>
      </motion.div>
    </motion.header>
  );
}
