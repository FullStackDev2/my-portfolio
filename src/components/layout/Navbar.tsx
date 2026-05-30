'use client';

import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="backdrop-blur-xl border border-white/10 bg-white/5 rounded-full px-6 py-4 flex items-center gap-8">
        <h1 className="font-bold tracking-widest">NURETTIN</h1>

        <nav className="hidden md:flex items-center gap-6 text-sm text-white/60">
          <a href="#about" className="hover:text-white transition">
            About
          </a>

          <a href="#projects" className="hover:text-white transition">
            Projects
          </a>

          <a href="#contact" className="hover:text-white transition">
            Contact
          </a>

          <a href="#skills" className="hover:text-white transition">
            Skills
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
