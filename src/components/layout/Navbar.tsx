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

  const [active, setActive] = useState('hero');
  const [activeRect, setActiveRect] = useState({ left: 0, width: 0 });

  const { scrollY } = useScroll();

  const blurValue = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(12px)'],
  );
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(15, 23, 42, 0)', 'rgba(15, 23, 42, 0.9)'],
  );
  const borderColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(161, 161, 170, 0)', 'rgba(161, 161, 170, 0.3)'],
  );

  // Butonun scroll ile kaybolması için
  const buttonOpacity = useTransform(scrollY, [0, 50], [1, 0]);
  const buttonPointerEvents = useTransform(scrollY, [0, 50], ['auto', 'none']);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;

      let current = navItems[0].id;

      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (!el) continue;

        if (el.offsetTop <= scrollPos) {
          current = item.id;
        }
      }

      setActive(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    handleScroll(); // init

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    const updateIndicator = () => {
      const el = itemRefs.current[active];
      const nav = navRef.current;
      if (!el || !nav) return;

      setActiveRect({
        left: el.offsetLeft,
        width: el.offsetWidth,
      });

      const navRect = nav.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();

      setActiveRect({
        left: elRect.left - navRect.left,
        width: elRect.width,
      });
    };

    // İlk yüklemede çalıştır
    updateIndicator();

    // Sayfa boyutu değiştiğinde pozisyonu güncelle (ÇOK ÖNEMLİ!)
    window.addEventListener('resize', updateIndicator);

    return () => window.removeEventListener('resize', updateIndicator);
  }, [active]);

  const handleNavClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <motion.div
        style={{
          backdropFilter: blurValue,
          backgroundColor: backgroundColor,
          borderBottomColor: borderColor,
        }}
        className="h-20 border-b transition-colors duration-300"
      >
        {/* DEĞİŞİKLİK 1: justify-between ekledik, px-4 yaptık ki kenarlara açılsın */}
        <div className="max-w-[100rem] mx-auto h-full flex items-center justify-between">
          {/* Logo / Profil */}
          <div
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Profil ikonun aynı kalıyor */}
            <div className="relative w-12 h-12 flex items-center justify-center overflow-visible">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#08d565] via-[#ff3d6e] to-[#ff5b8a] opacity-70 blur-[2px]"
              />
              <div className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md bg-zinc-100 z-10">
                <Image
                  src="/FOR-CV.JPG"
                  alt="Profile"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
            <span className="font-black tracking-wider text-lg text-zinc-100">
              ND.
            </span>
          </div>

          {/* DEĞİŞİKLİK 2: ml-auto'yu kaldırdık. justify-between zaten sağa itecek */}
          <nav ref={navRef} className="relative flex items-center gap-8">
            <div className="flex items-center gap-8 ml-6">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  ref={(el) => {
                    itemRefs.current[item.id] = el;
                  }}
                  onClick={() => handleNavClick(item.id)}
                  className={`cursor-pointer text-base font-medium transition-all ${
                    active === item.id
                      ? 'bg-gradient-to-r from-[#ff3d6e] to-[#ff5b8a] bg-clip-text text-transparent'
                      : 'text-zinc-100'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <NavIndicator activeRect={activeRect} />

            <motion.div
              style={{
                opacity: buttonOpacity,
                pointerEvents: buttonPointerEvents,
              }}
            >
              <a
                href="https://drive.google.com/file/d/1SqiJXKksRqB6GdshcjXZiaWCJWvAyNHa/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-6 py-2 rounded-xl border-gradient-br-blue-green-gray-900 border-transparent border-solid border-2 overflow-hidden transition-all duration-500 text-gray-100 text-lg"
              >
                {/* Kayan Arka Plan */}
                <span className="absolute inset-0 bg-cyan-400 rounded-[10px] -translate-x-[105%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></span>

                {/* İçerik */}
                <span className="relative z-10 font-semibold tracking-wide text-gray-100 group-hover:text-zinc-900 transition-colors duration-500">
                  View CV
                </span>
              </a>
            </motion.div>
          </nav>
        </div>
      </motion.div>
    </header>
  );
}
