'use client';

import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

// 1. ANİMASYON VARYASYONLARI
const nameContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const textItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 14,
    },
  },
};

const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: 'easeOut', delay: 0.4 },
  },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 0.8], ['0px', '150px']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      // GÜNCELLEME: Arka plan artık açık tech-minimalist gri/beyaz (bg-zinc-50)
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-6 bg-zinc-50"
      style={{
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
      }}
    >
      {/* GÜNCELLEME: Açık renkli temada milimetrik grid çizgileri (Koyu gri/siyah opaklıkta) */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.8) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.8) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center will-change-transform"
      >
        {/* SOL TARAF: Açık Temaya Uygun Tipografi */}
        <div className="flex flex-col justify-center space-y-6 max-w-xl text-left">
          {/* Üst Kısım: Durum İndikatörü */}
          <div className="flex flex-col space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 w-fit font-mono text-[10px] text-emerald-700 font-bold tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {'SYSTEM_STATUS : AVAILABLE_FOR_WORK'}
            </div>

            <p className="text-xs md:text-sm font-mono tracking-[0.25em] text-zinc-400 uppercase pt-2">
              HELLO, IM
            </p>
          </div>

          {/* ANİMASYONLU İSİM ALANI (Açık Tema Renkleri) */}
          <motion.div
            variants={nameContainerVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <div className="flex items-baseline gap-4 flex-wrap">
              {/* NURETTIN - Artık Koyu Antrasit / Siyah */}
              <motion.h1
                variants={textItemVariants}
                className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 uppercase select-none leading-none"
              >
                NURETTIN
              </motion.h1>

              {/* Siber Ayraç - Canlı Kobalt Mavisi */}
              <motion.span
                variants={textItemVariants}
                className="text-3xl md:text-5xl font-light text-blue-600 drop-shadow-[0_0_8px_rgba(37,99,235,0.3)] select-none"
              >
                |
              </motion.span>

              {/* DINCER - Yumuşak Koyu Gri */}
              <motion.h2
                variants={textItemVariants}
                className="text-4xl md:text-6xl font-semibold tracking-tight text-zinc-500 uppercase select-none leading-none font-mono"
              >
                DINCER
              </motion.h2>
            </div>

            {/* Alt Bilgi Şeridi */}
            <motion.div
              variants={lineVariants}
              className="w-full flex justify-between items-end border-b border-zinc-200 pb-3 mt-4 origin-left"
            >
              <p className="text-xs font-mono tracking-widest text-blue-600 font-medium">
                INTEL_CORE_SYSTEM
              </p>

              {/* İstenen Kod Alanı - Açık temada daha net okunması için gölgesi ve rengi optimize edildi */}
              <p className="text-xs md:text-sm font-mono font-bold text-blue-600 tracking-wider drop-shadow-[0_0_6px_rgba(37,99,235,0.2)] animate-pulse">
                LN_042 // RE_2026
              </p>
            </motion.div>
          </motion.div>

          {/* Açıklama Kutusu */}
          <p className="text-zinc-600 text-sm md:text-base leading-relaxed border-l-2 border-blue-600/50 pl-4 font-sans pt-2">
            I bridge the gap between complex backend architecture and
            pixel-perfect interactive user interfaces, crafting high-performance
            digital experiences.
          </p>

          {/* Butonlar */}
          <div className="flex items-center gap-4 pt-4">
            <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm tracking-wide transition-all duration-300 shadow-[0_4px_14px_rgba(37,99,235,0.3)] active:scale-95">
              View Projects
            </button>
            <button className="px-6 py-3 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-100 font-medium text-sm tracking-wide text-zinc-700 transition-all duration-300 shadow-sm active:scale-95">
              Contact Me
            </button>
          </div>

          {/* Minimal Stats */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 border-t border-zinc-200 pt-6 mt-6">
            <div className="min-w-[70px]">
              <h3 className="text-xl font-bold tracking-tight font-mono text-zinc-800">
                4+
              </h3>
              <p className="text-[9px] text-zinc-400 uppercase tracking-widest mt-0.5 font-mono">
                Projects
              </p>
            </div>
            <div className="min-w-[70px]">
              <h3 className="text-xl font-bold tracking-tight text-blue-600 font-mono">
                HTML5
              </h3>
              <p className="text-[9px] text-zinc-400 uppercase tracking-widest mt-0.5 font-mono">
                Frontend
              </p>
            </div>
            <div className="min-w-[70px]">
              <h3 className="text-xl font-bold tracking-tight text-zinc-600 font-mono">
                CSS3
              </h3>
              <p className="text-[9px] text-zinc-400 uppercase tracking-widest mt-0.5 font-mono">
                Frontend
              </p>
            </div>
            <div className="min-w-[70px]">
              <h3 className="text-xl font-bold tracking-tight text-zinc-600 font-mono">
                JS
              </h3>
              <p className="text-[9px] text-zinc-400 uppercase tracking-widest mt-0.5 font-mono">
                Frontend
              </p>
            </div>
            <div className="min-w-[70px]">
              <h3 className="text-xl font-bold tracking-tight text-zinc-600 font-mono">
                React
              </h3>
              <p className="text-[9px] text-zinc-400 uppercase tracking-widest mt-0.5 font-mono">
                Frontend
              </p>
            </div>
            <div className="min-w-[70px]">
              <h3 className="text-xl font-bold tracking-tight text-zinc-600 font-mono">
                Node
              </h3>
              <p className="text-[9px] text-zinc-400 uppercase tracking-widest mt-0.5 font-mono">
                Backend
              </p>
            </div>
          </div>
        </div>

        {/* SAĞ TARAF: Açık Temaya Uygun Fotoğraf Kartı */}
        <div className="relative flex justify-center items-center w-full max-w-md lg:max-w-lg mx-auto aspect-[4/5] p-4">
          {/* Yumuşak Arka Işık Parlaması */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/30 to-indigo-100/20 blur-[100px] rounded-full scale-90 pointer-events-none" />

          {/* Dış Çerçeveler */}
          <div className="absolute -inset-1 border border-zinc-300/50 rounded-3xl pointer-events-none">
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-blue-600/30" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-blue-600/30" />
          </div>

          {/* Ana Kart Gövdesi */}
          <div className="relative w-full h-full bg-white border border-zinc-200 rounded-2xl overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-600/50 to-transparent z-10" />

            <div className="absolute bottom-4 right-5 z-10 flex items-center gap-2 font-mono text-[9px] text-blue-600/60 tracking-widest select-none">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-600" />
              </span>
              <span>{'BIOMETRIC_SCANNING...'}</span>
            </div>

            {/* Fotoğraf Alanı (Açık temada renkli/canlı başlar, hover'da netleşir) */}
            <div className="relative w-full h-full overflow-hidden bg-zinc-100 transition-all duration-750 group-hover:brightness-102">
              <Image
                src="/for_cv.jpg"
                alt="Nurettin Dincer Hero Portrait"
                fill
                loading="eager"
                className="absolute inset-0 w-full h-full object-cover object-center scale-102 group-hover:scale-100 transition-transform duration-1000 ease-out"
              />

              {/* Hover Grid Katmanı */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(0,0,0,1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(0,0,0,1) 1px, transparent 1px)
                  `,
                  backgroundSize: '24px 24px',
                }}
              />

              {/* İpince Gölge Maskesi */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/20 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="absolute inset-0 border border-zinc-200 group-hover:border-blue-600/30 rounded-2xl transition-all duration-500 pointer-events-none" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
