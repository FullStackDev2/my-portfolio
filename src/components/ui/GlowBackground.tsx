'use client';

import { useEffect, useState } from 'react';

// Klasöründeki section dosyalarına göre ID'ler (Küçük harf hassasiyeti önemlidir)
const SECTIONS = ['hero', 'about', 'skills', 'projects', 'contact'];

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
    <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden select-none">
      <div
        className={`absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-500/10 blur-[128px] transition-opacity duration-1000 ${activeSection === 'hero' ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[160px] transition-opacity duration-1000 ${activeSection === 'about' ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        className={`absolute top-1/3 right-10 w-[450px] h-[450px] rounded-full bg-amber-500/5 blur-[140px] transition-opacity duration-1000 ${activeSection === 'skills' ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        className={`absolute bottom-10 right-10 w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[180px] transition-opacity duration-1000 ${activeSection === 'projects' ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        className={`absolute inset-0 m-auto w-80 h-80 rounded-full bg-rose-500/10 blur-[120px] transition-opacity duration-1000 ${activeSection === 'contact' ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
