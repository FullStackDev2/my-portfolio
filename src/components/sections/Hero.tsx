'use client';

import { motion, Variants, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

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
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDismissed = localStorage.getItem('portfolio_dev_warn_v2');
      if (!isDismissed) {
        const timer = setTimeout(() => setShowModal(true), 1000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const closeModal = () => {
    localStorage.setItem('portfolio_dev_warn_v2', 'true');
    setShowModal(false);
  };

  return (
    <>
      {/* SİBER UYARI MODALİ (SYSTEM WARNING) */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-zinc-950/40 backdrop-blur-md"
              onClick={closeModal}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-md bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.15)] z-10 p-6"
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500" />

              <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4">
                <div className="flex items-center gap-2 font-mono text-[10px] text-amber-700 font-bold tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  {'[SYS_STATUS: UNDER_CONSTRUCTION]'}
                </div>
                <span className="font-mono text-[9px] text-zinc-400">
                  v0.4.2 // 2026
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold font-mono tracking-tight text-zinc-900 uppercase">
                  Sistem Güncelleniyor
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed font-sans">
                  Bu portfolyo şu anda aktif olarak geliştirilme ve test
                  aşamasındadır. Bazı animasyonlar, bağlantılar ve yerleşimler
                  optimizasyon sürecindedir.
                </p>
                <div className="bg-zinc-50 border border-zinc-100 rounded-lg p-3 font-mono text-[11px] text-zinc-500 leading-normal">
                  <span className="text-blue-600 font-bold">$&gt;</span> npm run
                  dev --build_logs
                  <br />
                  <span className="text-emerald-600">✓</span> UI/UX structure
                  initialized.
                  <br />
                  <span className="text-amber-500">⚠</span> Responsive testing
                  in progress...
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-5 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs font-bold tracking-wider transition-all duration-200 active:scale-95 shadow-sm"
                >
                  SİSTEME GİRİŞ YAP
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <section
        ref={ref}
        id="hero"
        className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-6 bg-[#f5f7ff]"
        style={{
          scrollSnapAlign: 'start',
          scrollSnapStop: 'always',
        }}
      >
        {/* Arka Plan Efektleri */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at top right, rgba(124,58,237,.25), transparent 30%),
              radial-gradient(circle at right center, rgba(56,189,248,.18), transparent 35%),
              radial-gradient(circle at bottom center, rgba(255,220,220,.25), transparent 35%)
            `,
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(0,0,0,.6) 1px, transparent 1px)',
            backgroundSize: '18px 18px',
            maskImage:
              'radial-gradient(circle at top right, black 10%, transparent 55%), radial-gradient(circle at bottom left, black 10%, transparent 55%)',
            WebkitMaskImage:
              'radial-gradient(circle at top right, black 10%, transparent 55%), radial-gradient(circle at bottom left, black 10%, transparent 55%)',
          }}
        />

        <div className="absolute bottom-[-20%] right-[-15%] w-[600px] h-[600px] bg-violet-400/12 blur-[180px] rounded-full pointer-events-none z-0" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] aspect-square bg-indigo-300/10 blur-[100px] rounded-full pointer-events-none z-0" />

        {/* ORTA ALT: SCROLL TO EXPLORE */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-cyan-600 z-20 select-none">
          <span>SCROLL TO EXPLORE</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-3 bg-cyan-500 rounded-full"
          />
        </div>

        {/* ANA İÇERİK GRID YAPISI */}
        <div className="relative z-10 max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* SOL TARAF */}
          <div className="flex flex-col justify-center space-y-6 max-w-xl text-left">
            <div className="flex flex-col space-y-3">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 w-fit font-mono text-sm text-emerald-700 font-bold tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                WORK_STATUS : AVAILABLE FOR WORK!
              </div>
              <p
                style={{ fontFamily: 'GeneralSans_bold' }}
                className="text-sm md:text-lg font-black tracking-tighter text-zinc-700 uppercase pt-8"
              >
                HELLO, I&#39;M
              </p>
            </div>

            <motion.div
              variants={nameContainerVariants}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <motion.div
                variants={nameContainerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-1"
              >
                <motion.h1
                  style={{ fontFamily: 'GeneralSans_normal' }}
                  variants={textItemVariants}
                  className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-r from-[#ff3d6e] to-[#ff5b8a] bg-clip-text text-transparent"
                >
                  Nurettin Dincer
                </motion.h1>
              </motion.div>

              <motion.div
                variants={lineVariants}
                className="w-full flex justify-between items-end border-b border-zinc-200 pb-3 mt-4 origin-left"
              >
                <p
                  style={{ fontFamily: 'GeneralSans_normal' }}
                  className="text-5xl md:text-2xl font-mono tracking-[0.12em] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400"
                >
                  FULL STACK DEVELOPER
                </p>
              </motion.div>
            </motion.div>

            <p
              style={{ fontFamily: 'GeneralSans_paragh' }}
              className="text-zinc-600 text-sm md:text-base leading-relaxed border-l-3 border-l-orange-400 pl-4 font-sans pt-2"
            >
              I bridge the gap between complex backend architecture and
              pixel-perfect interactive user interfaces, crafting
              high-performance digital experiences.
            </p>

            <div className="flex items-center gap-4 pt-4">
              <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm tracking-wide transition-all duration-300 shadow-[0_4px_14px_rgba(37,99,235,0.3)] active:scale-95">
                View Projects
              </button>
              <button className="px-6 py-3 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-100 font-medium text-sm tracking-wide text-zinc-700 transition-all duration-300 shadow-sm active:scale-95">
                Contact Me
              </button>
            </div>

            {/* İstatistikler */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 border-t border-zinc-200/80 pt-6 mt-8">
              <div className="text-left">
                <h3 className="text-xl font-bold tracking-tight font-mono text-zinc-800">
                  4+
                </h3>
                <p className="text-[9px] text-zinc-400 uppercase tracking-widest mt-0.5 font-mono">
                  Projects
                </p>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold tracking-tight text-blue-600 font-mono">
                  HTML5
                </h3>
                <p className="text-[9px] text-zinc-400 uppercase tracking-widest mt-0.5 font-mono">
                  Frontend
                </p>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold tracking-tight text-zinc-600 font-mono">
                  CSS3
                </h3>
                <p className="text-[9px] text-zinc-400 uppercase tracking-widest mt-0.5 font-mono">
                  Frontend
                </p>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold tracking-tight text-zinc-600 font-mono">
                  JS
                </h3>
                <p className="text-[9px] text-zinc-400 uppercase tracking-widest mt-0.5 font-mono">
                  Frontend
                </p>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold tracking-tight text-zinc-600 font-mono">
                  React
                </h3>
                <p className="text-[9px] text-zinc-400 uppercase tracking-widest mt-0.5 font-mono">
                  Frontend
                </p>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold tracking-tight text-zinc-600 font-mono">
                  Node
                </h3>
                <p className="text-[9px] text-zinc-400 uppercase tracking-widest mt-0.5 font-mono">
                  Backend
                </p>
              </div>
            </div>

            {/* SOSYAL MEDYA ALANI (Artık Sol Taraftaki İçeriğin EN ALTINDA ve Tamamen Hizalı) */}
            <div className="pt-8 border-t border-zinc-200/80 w-full">
              <p className="text-sm md:text-base tracking-[0.3em] font-mono text-zinc-900 uppercase mb-6 font-bold">
                WHERE TO FIND ME
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#"
                  className="flex items-center gap-2 bg-black hover:bg-zinc-900 rounded-lg text-white text-sm px-4 py-2.5 transition-all active:scale-95 shadow-sm hover:-translate-y-0.5"
                >
                  <i className="fab fa-github text-base"></i> Github
                </a>

                <a
                  href="#"
                  className="flex items-center gap-2 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:brightness-110 rounded-lg text-white text-sm px-4 py-2.5 transition-all active:scale-95 shadow-sm font-medium hover:-translate-y-0.5"
                >
                  <i className="fab fa-instagram text-base"></i> Instagram
                </a>

                <a
                  href="https://www.linkedin.com/in/kullanici-adin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#0A66C2] hover:bg-[#004182] rounded-lg text-white text-sm px-4 py-2.5 transition-all active:scale-95 shadow-sm hover:-translate-y-0.5"
                >
                  <i className="fab fa-linkedin-in text-base"></i> LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* SAĞ TARAF (Profil Fotoğrafı Alanı) */}
          <div className="relative flex justify-center items-center w-full max-w-md lg:max-w-lg mx-auto aspect-[4/5] p-4">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/30 to-indigo-100/20 blur-[100px] rounded-full scale-90 pointer-events-none" />

            <div className="absolute -inset-1 border border-zinc-300/50 rounded-3xl pointer-events-none">
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-blue-600/30" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-blue-600/30" />
            </div>

            <div className="relative w-full h-full bg-white border border-zinc-200 rounded-2xl overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-600/50 to-transparent z-10" />

              <div className="absolute bottom-4 right-5 z-10 flex items-center gap-2 font-mono text-[9px] text-blue-600/60 tracking-widest select-none">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-600" />
                </span>
                <span>{'BIOMETRIC_SCANNING...'}</span>
              </div>

              <div className="relative w-full h-full overflow-hidden bg-zinc-100 transition-all duration-750 group-hover:brightness-102">
                <Image
                  src="/for_cv.jpg"
                  alt="Nurettin Dincer Hero Portrait"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="eager"
                  priority
                  className="absolute inset-0 w-full h-full object-cover object-center scale-102 group-hover:scale-100 transition-transform duration-1000 ease-out"
                />

                <div
                  className="absolute inset-0 opacity-[0.02] pointer-events-none"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")",
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/20 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="absolute inset-0 border border-zinc-200 group-hover:border-blue-600/30 rounded-2xl transition-all duration-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
