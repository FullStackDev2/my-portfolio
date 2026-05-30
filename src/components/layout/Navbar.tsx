'use client';

import { motion } from 'framer-motion';
import useScrollSpy from '@/hooks/useScrollSpy';

export default function Navbar() {
  const activeSection = useScrollSpy(['about', 'projects', 'contact']);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      {/* OUTER PILL */}
      <div className="flex items-center gap-12 px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl w-fit">
        {/* LOGO */}
        <h1 className="flex-shrink-0 whitespace-nowrap font-bold tracking-widest text-white">
          NURETTIN
        </h1>

        {/* NAV */}
        <nav className="relative flex items-center gap-8 flex-shrink-0 whitespace-nowrap text-sm">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`transition ${
                  isActive ? 'text-white' : 'text-white/40'
                }`}
              >
                {item.label}
              </a>
            );
          })}

          {/* indicator (SAFE VERSION) */}
          <motion.div
            layout
            className="absolute -bottom-2 left-0 h-[2px] bg-white rounded-full"
            style={{ width: 60 }}
          />
        </nav>
      </div>
    </header>
  );
}
