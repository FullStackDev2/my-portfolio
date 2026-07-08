'use client';

import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import NavIndicator from '@/components/ui/NavIndicator';
import Image from 'next/image';

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'vision', label: 'Vision' },
  { id: 'connect', label: 'Connect' },
  { id: 'contact', label: 'Contact' },
];

const CV_LINK =
  'https://drive.google.com/file/d/1SqiJXKksRqB6GdshcjXZiaWCJWvAyNHa/view?usp=drive_link';

export default function Navbar() {
  const navRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const [active, setActive] = useState('hero');
  const [activeRect, setActiveRect] = useState({ left: 0, width: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Butonun scroll ile kaybolması için (sadece desktop'ta anlamlı)
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

      if (!el) return;

      setActiveRect({
        left: el.offsetLeft,
        width: el.offsetWidth,
      });
    };

    updateIndicator();

    window.addEventListener('resize', updateIndicator);

    return () => window.removeEventListener('resize', updateIndicator);
  }, [active]);

  // Mobil menü açıkken arka planın scroll olmasını engelle
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Ekran lg breakpoint üzerine büyürse mobil menüyü otomatik kapat
  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', closeOnResize);

    return () => window.removeEventListener('resize', closeOnResize);
  }, []);

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';

    setTimeout(() => {
      const el = document.getElementById(id);

      if (!el) return;

      const y = el.getBoundingClientRect().top + window.scrollY - 80;

      window.scrollTo({
        top: y,
        behavior: 'smooth',
      });
    }, 300);
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
        <div className="max-w-[100rem] mx-auto h-full flex items-center justify-between px-4 md:px-8">
          {/* Logo / Profil */}
          <div
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
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
                  width={40}
                  height={40}
                  className="object-cover object-top"
                />
              </div>
            </div>
            <span className="font-black tracking-wider text-lg text-zinc-100">
              ND.
            </span>
          </div>

          {/* Desktop / geniş tablet navigasyonu (lg ve üzeri) */}
          <nav ref={navRef} className="hidden lg:flex items-center gap-6">
            <div className="relative flex items-center gap-6 ml-6">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  ref={(el) => {
                    itemRefs.current[item.id] = el;
                  }}
                  onClick={() => handleNavClick(item.id)}
                  className={`cursor-pointer text-base font-medium transition-all whitespace-nowrap ${
                    active === item.id
                      ? 'bg-gradient-to-r from-[#ff3d6e] to-[#ff5b8a] bg-clip-text text-transparent'
                      : 'text-zinc-100'
                  }`}
                >
                  {item.label}
                </a>
              ))}

              <NavIndicator activeRect={activeRect} />
            </div>

            <motion.div
              style={{
                opacity: buttonOpacity,
                pointerEvents: buttonPointerEvents,
              }}
            >
              <a
                href={CV_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-6 py-2 rounded-xl border-gradient-br-blue-green-gray-900 border-transparent border-solid border-2 overflow-hidden transition-all duration-500 text-gray-100 text-lg"
              >
                <span className="absolute inset-0 bg-cyan-400 rounded-[10px] -translate-x-[105%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></span>

                <span className="relative z-10 font-semibold tracking-wide text-gray-100 group-hover:text-zinc-900 transition-colors duration-500">
                  View CV
                </span>
              </a>
            </motion.div>
          </nav>

          {/* Mobil / tablet: hamburger butonu (lg altı) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
            className="relative flex lg:hidden items-center justify-center w-11 h-11 rounded-lg text-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3d6e] shrink-0"
          >
            <span className="sr-only">
              {isMobileMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            </span>
            <div className="relative w-6 h-5 flex flex-col justify-between">
              <motion.span
                animate={
                  isMobileMenuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="block h-0.5 w-full bg-current rounded-full origin-center"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="block h-0.5 w-full bg-current rounded-full"
              />
              <motion.span
                animate={
                  isMobileMenuOpen
                    ? { rotate: -45, y: -9 }
                    : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="block h-0.5 w-full bg-current rounded-full origin-center"
              />
            </div>
          </button>
        </div>
      </motion.div>

      {/* Mobil / tablet açılır menü (lg altı) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 top-20 bg-black/20 lg:hidden z-40"
            />

            {/* Menu */}
            <motion.div
              id="mobile-nav-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="relative z-50 lg:hidden overflow-hidden bg-slate-900/95 backdrop-blur-xl border-b border-zinc-500/30"
            >
              <nav
                onClick={(e) => e.stopPropagation()}
                className="max-w-[100rem] mx-auto flex flex-col px-4 py-4 gap-1"
              >
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`cursor-pointer text-base font-medium py-3 px-2 rounded-lg transition-all border-b border-white/5 last:border-b-0 ${
                      active === item.id
                        ? 'bg-gradient-to-r from-[#ff3d6e] to-[#ff5b8a] bg-clip-text text-transparent'
                        : 'text-zinc-100'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}

                <a
                  href={CV_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group relative mt-3 inline-flex items-center justify-center px-6 py-3 rounded-xl border-transparent border-solid border-2 overflow-hidden transition-all duration-500 text-gray-100 text-lg"
                >
                  <span className="absolute inset-0 bg-cyan-400 rounded-[10px] -translate-x-[105%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></span>

                  <span className="relative z-10 font-semibold tracking-wide text-gray-100 group-hover:text-zinc-900 transition-colors duration-500">
                    View CV
                  </span>
                </a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
