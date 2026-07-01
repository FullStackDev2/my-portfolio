'use client';

import { useEffect, useState } from 'react';

// Klasöründeki section dosyalarına göre ID'ler (Küçük harf hassasiyeti önemlidir)
const SECTIONS = [
  'hero',
  'about',
  'skills',
  'projects',
  'connect',
  'vision',
  'contact',
];

export default function GlowBackground() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0.2,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions,
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0e1a] pointer-events-none"
    >
      {/* mavi + teal, düşük opaklık — mor yok */}
      <div className="absolute top-[2%] left-[10%] w-[380px] h-[380px] rounded-full bg-[#4facfe] blur-[70px] opacity-[0.22] animate-drift1" />
      <div className="absolute top-[22%] right-[8%] w-[300px] h-[300px] rounded-full bg-[#2dd4bf] blur-[70px] opacity-[0.18] animate-drift2" />
      <div className="absolute top-[55%] left-[60%] w-[340px] h-[340px] rounded-full bg-[#4facfe] blur-[70px] opacity-[0.16] animate-drift1-reverse" />
      <div className="absolute top-[78%] left-[5%] w-[280px] h-[280px] rounded-full bg-[#2dd4bf] blur-[70px] opacity-[0.18] animate-drift2-reverse" />
      <div className="absolute top-[100%] right-[12%] w-[320px] h-[320px] rounded-full bg-[#4facfe] blur-[70px] opacity-[0.16] animate-drift1-slow" />
      <div className="absolute top-[130%] left-[35%] w-[260px] h-[260px] rounded-full bg-[#2dd4bf] blur-[70px] opacity-[0.14] animate-drift2-slow" />
      <div className="absolute top-[160%] right-[5%] w-[300px] h-[300px] rounded-full bg-[#4facfe] blur-[70px] opacity-[0.16] animate-drift1-reverse" />

      {/* çok hafif grain doku — blob'ların "plastik" durmasını önler, opsiyonel */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
