'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 90, damping: 14 },
  },
};

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden border-t border-zinc-800/50 bg-[#020617]">
      {/* Arka Plan Dokusu */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      {/* SİNEMATİK ARKA PLAN IŞIKLARI */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(34,211,238,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(139,92,246,0.04),transparent_45%)]" />
      </div>

      <div className="max-w-[1400px] mx-auto h-screen flex flex-col md:flex-row items-center px-6 lg:px-16">
        {/* SOL: İÇERİK */}
        <div className="flex-1 flex flex-col justify-center z-20 pt-20 md:pt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 border border-white/10 bg-white/5 w-fit px-4 py-1.5 rounded-full mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            <span className="text-[11px] font-mono tracking-widest text-zinc-300 uppercase">
              Available for new opportunities
            </span>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-2"
          >
            <motion.h1
              variants={textItemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight"
            >
              Frontend Developer
            </motion.h1>
            <motion.h2
              variants={textItemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-cyan-500 via-blue-500 via-indigo-600 to-fuchsia-900 bg-clip-text text-transparent tracking-tight leading-[1.2] pb-2"
            >
              Building Digital
            </motion.h2>
            <motion.h2
              variants={textItemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-zinc-300 tracking-tight"
            >
              Experiences
            </motion.h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 text-zinc-400 max-w-lg text-lg leading-relaxed font-light"
          >
            Crafting performant, accessible, and beautiful web applications with
            modern technologies and a keen eye for detail.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-2.5 rounded-full p-[1.5px] bg-gradient-to-r from-blue-500 to-purple-500 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]"
            >
              <span className="flex items-center gap-2.5 rounded-full bg-[#0a0a0f] px-8 py-4 text-[15px] font-semibold text-white">
                View Projects
                <svg
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full border border-zinc-700 text-white font-semibold hover:border-zinc-500 hover:bg-zinc-900 transition-colors"
            >
              Contact Me
            </motion.button>
          </motion.div>
        </div>

        {/* SAĞ: PORTRE - YUKARI ALINDI */}
        <div
          className="absolute right-0 top-16 w-[40%] h-[85%] hidden md:block pointer-events-none z-10 
                [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]"
        >
          <div className="relative w-full h-full">
            <Image
              src="/NobackGroundd.png"
              alt="Nurettin Dincer"
              fill
              className="object-contain object-bottom scale-100 origin-bottom grayscale contrast-120 brightness-[60%]"
              priority
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent" />
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <span className="text-[10px] tracking-[0.2em] text-zinc-500 font-bold">
          SCROLL
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-zinc-500" />
      </div>
    </section>
  );
}
