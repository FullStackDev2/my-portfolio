'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import NavIndicator from '@/components/ui/NavIndicator';
import Image from 'next/image';

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

  // Tıklama ile kaydırma yapılırken observer'ı susturmak için bir kilit ref'i
  const isScrollingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [active, setActive] = useState('hero');
  const [activeRect, setActiveRect] = useState({ left: 0, width: 0 });

  const { scrollY } = useScroll();

  const blurValue = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(12px)'],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Eğer kullanıcı bir linke tıkladıysa ve sayfa kayıyorsa observer'ı yok say
        if (isScrollingRef.current) return;

        let bestEntry: IntersectionObserverEntry | null = null;

        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (
              !bestEntry ||
              entry.intersectionRatio > bestEntry.intersectionRatio
            ) {
              bestEntry = entry;
            }
          }
        }

        if (bestEntry) {
          setActive(bestEntry.target.id);
        }
      },
      {
        root: null,
        // rootMargin'i biraz daha esnettik, threshold'u basitleştirdik
        rootMargin: '-30% 0px -30% 0px',
        threshold: 0.2,
      },
    );

    const els: Element[] = [];

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) {
        observer.observe(el);
        els.push(el);
      }
    });

    return () => {
      els.forEach((el) => observer.unobserve(el));
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
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

  // Ortak kaydırma fonksiyonu
  const handleNavClick = (id: string) => {
    setActive(id);

    // Kilit mekanizmasını devreye sok
    isScrollingRef.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    // Kaydırma bitene kadar observer'ı engelle (yaklaşık 800ms)
    timeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <motion.div
        style={{
          backdropFilter: blurValue,
        }}
        className="h-16 bg-white/30 backdrop-blur-md border-b border-white/20"
      >
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          {/* Circular Profile Icon (Mockup Style) */}
          {/* Circular Profile Icon (Next.js Image Sürümü) */}
          <div
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Animasyonlu Dış Kapsayıcı */}
            <div className="relative w-11 h-11 flex items-center justify-center overflow-visible">
              {/* Arkadaki Dönen Renkli Canlı Halkalar */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#08d565] via-[#ff3d6e] to-[#ff5b8a] opacity-70 blur-[2px] group-hover:opacity-100 group-hover:blur-[4px] transition-all duration-300"
              />

              {/* Profil Resminin Olduğu Maskelenmiş İç Kısım */}
              <div
                onClick={() => handleNavClick('hero')}
                className="flex items-center gap-3 cursor-pointer group"
              >
                {/* Animasyonlu Dış Kapsayıcı */}
                <div className="relative w-11 h-11 flex items-center justify-center overflow-visible">
                  {/* Arkadaki Dönen Renkli Canlı Halkalar */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: 'linear',
                    }}
                    className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#08d565] via-[#ff3d6e] to-[#ff5b8a] opacity-70 blur-[2px] group-hover:opacity-100 group-hover:blur-[4px] transition-all duration-300"
                  />

                  {/* Profil Resminin Olduğu Maskelenmiş İç Kısım */}
                  <div className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md bg-zinc-100 z-10">
                    <Image
                      src="/for_cv.jpg"
                      alt="Profile Icon"
                      fill
                      sizes="(max-width: 768px) 44px, 44px"
                      priority
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            </div>

            <span className="font-black tracking-[0.25em] text-[#282829]">
              NURETTIN D.
            </span>
          </div>

          {/* Navigation */}
          <nav ref={navRef} className="relative flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                ref={(el) => {
                  itemRefs.current[item.id] = el;
                }}
                onClick={() => handleNavClick(item.id)}
                className={`
                  cursor-pointer
                  text-sm
                  font-medium
                  transition-all
                  duration-300
                  ${
                    active === item.id
                      ? 'bg-gradient-to-r from-[#ff3d6e] to-[#ff5b8a] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,61,110,0.5)] scale-105'
                      : 'text-zinc-900'
                  }
                `}
              >
                {item.label}
              </a>
            ))}

            <NavIndicator activeRect={activeRect} />
          </nav>
        </div>
      </motion.div>
    </header>
  );
}
