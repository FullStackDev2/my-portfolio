'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { scrollToSection } from '@/lib/smoothScrollTo';
import HeroGlow from '@/components/ui/HeroGlow';

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
    <section
      id="hero"
      className="relative w-full min-h-[100dvh] overflow-hidden border-t border-zinc-800/50 scroll-mt-20"
    >
      {/* Arka Plan Dokusu */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
      <HeroGlow />
      <div className="max-w-[1400px] mx-auto min-h-[100dvh] flex flex-col lg:flex-row items-center px-6 sm:px-8 lg:px-0 py-28 lg:py-0">
        {/* SOL: İÇERİK */}
        <div className="flex flex-col justify-center items-center lg:items-start z-20 w-full text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 border border-white/10 bg-white/5 w-fit px-4 py-1.5 rounded-full mb-6 sm:mb-8 mx-auto lg:mx-0"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-zinc-300 uppercase">
              Available for new opportunities
            </span>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative flex flex-col gap-1 sm:gap-2 items-center lg:items-start"
          >
            <motion.h1
              variants={textItemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tight [text-shadow:_0_0_20px_rgba(255,255,255,0.3)]"
            >
              Frontend Developer
            </motion.h1>
            <motion.h2
              variants={textItemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-cyan-500 via-blue-500 via-indigo-600 to-fuchsia-900 bg-clip-text text-transparent tracking-tight leading-[1.2] pb-1 sm:pb-2 [text-shadow:_0_0_30px_rgba(168,85,247,0.3)]"
            >
              Building Digital
            </motion.h2>
            <motion.h2
              variants={textItemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-zinc-200 tracking-tight [text-shadow:_0_0_15px_rgba(212,212,216,0.3)]"
            >
              Experiences
            </motion.h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-6 sm:mt-8 text-zinc-200 max-w-md sm:max-w-lg mx-auto lg:mx-0 text-base sm:text-lg leading-relaxed font-light px-2 sm:px-0"
          >
            Crafting performant, accessible, and beautiful web applications with modern technologies and a keen eye for
            detail.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row flex-wrap gap-4 mt-8 sm:mt-10 justify-center lg:justify-start w-full sm:w-auto"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 1.08 }}
              onClick={() => scrollToSection('projects')}
              className="group relative inline-flex items-center justify-center gap-2.5 rounded-full p-[1.5px] bg-gradient-to-r from-blue-500 to-purple-500 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] w-full sm:w-auto"
            >
              <span className="flex items-center justify-center gap-2.5 rounded-full bg-[#0a0a0f] px-8 py-3.5 sm:py-4 text-[15px] font-semibold text-white w-full">
                View Projects
                <div className="relative flex items-center justify-center transition-colors duration-300 ease-in-out text-white group-hover:text-[#08d565] group-hover:delay-[100ms]">
                  <svg
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path
                      d="M5 12h14"
                      className="transition-transform duration-300 ease-out group-hover:translate-x-[2px]"
                    />

                    <path
                      d="M12 5l7 7-7 7"
                      className="transition-transform duration-300 ease-out group-hover:translate-x-[5px]"
                    />
                  </svg>
                  <div className="absolute inset-0 -z-10 rounded-full bg-blue-500/0 blur-md transition-all duration-300 group-hover:bg-blue-500/40 group-hover:delay-[300ms]"></div>
                </div>
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3.5 sm:py-4 rounded-full font-semibold text-white group relative w-full sm:w-auto"
              style={{
                backgroundImage:
                  'linear-gradient(#18181b, #18181b), linear-gradient(to top right, #38bdf8, #a855f7, #ec4899)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                border: '1px solid transparent',
              }}
            >
              <span className="absolute inset-0 rounded-full w-0 h-0 m-auto transition-all duration-300 ease-out bg-white group-hover:w-full group-hover:h-full opacity-10 pointer-events-none" />
              <span className="relative">Contact Me</span>
            </motion.button>
          </motion.div>
        </div>

        {/* SAĞ: PORTRE — sadece md ve üstünde, tablette küçültülmüş oranla */}
        <div
          className="absolute right-0 top-16 lg:w-[40%] lg:h-[75%] xl:w-[46%] xl:h-[85%] hidden lg:block pointer-events-none z-10
    [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]"
        >
          <div className="relative w-full h-full">
            <Image
              src="/NobackGroundd.png"
              alt="Nurettin Dincer"
              fill
              quality={75}
              sizes="50vw"
              className="object-contain object-bottom 
        -translate-x-4 md:-translate-x-8 lg:-translate-x-23 
        scale-100 lg:scale-103 
        origin-bottom grayscale contrast-115 brightness-[45%] opacity-70 blur-[1px]"
              priority
              onLoad={() => {
                window.dispatchEvent(new Event('resize'));
              }}
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent" />
        </div>
      </div>

      {/* SCROLL INDICATOR — sadece masaüstünde */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-3 z-20 pointer-events-none"
      >
        <span className="text-[11px] tracking-[0.5em] font-semibold text-zinc-100 uppercase">Scroll to Explore</span>

        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="mt-1"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_10px_rgba(34,211,238,0.9)]"
          >
            <path d="M12 5V18" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" />
            <path
              d="M8 14L12 18L16 14"
              stroke="#22d3ee"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
