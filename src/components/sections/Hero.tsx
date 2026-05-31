'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Scroll Progress dinlemesini snap yapısına optimize ediyoruz
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Layout Shift yaratmamak için transform yüzdelerini ve opaklığı yumuşatıyoruz
  const y = useTransform(scrollYProgress, [0, 0.8], ['0px', '150px']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-6"
      style={{
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
      }}
    >
      {/* Tüm içerik grid yapısıyla siber kartı sağa, yazıları sola alacak şekilde dağılıyor */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center will-change-transform"
      >
        {/* SOL TARAF: Yazılar ve Butonlar */}
        <div className="space-y-8 text-left order-2 md:order-1">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-white/60 font-medium font-mono tracking-wide">
              {'SYSTEM_STATUS : AVAILABLE FOR WORK HYBRID-REMOTE'}
            </span>
          </div>

          {/* Big Bold Typography */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight select-none bg-clip-text bg-gradient-to-b from-white to-white/70">
            NURETTIN
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/60 max-w-xl font-normal font-sans border-l border-white/10 pl-4">
            I build modern SaaS platforms, dashboards and web applications
            focused on performance, scalability and user experience.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <a
              href="#projects"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 active:scale-95 transition-all text-center text-sm"
            >
              View Projects
            </a>

            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-center text-sm"
            >
              Contact Me
            </a>
          </div>

          {/* Premium Minimal Stats */}
          <div className="flex flex-wrap gap-10 border-t border-white/5 pt-8 mt-12">
            <div className="min-w-[80px]">
              <h3 className="text-2xl font-bold tracking-tight font-mono">
                4+
              </h3>
              <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1 font-mono">
                Team Projects
              </p>
            </div>

            <div className="min-w-[80px]">
              <h3 className="text-2xl font-bold tracking-tight text-blue-400 font-mono">
                HTML5
              </h3>
              <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1 font-mono">
                Frontend
              </p>
            </div>

            <div className="min-w-[80px]">
              <h3 className="text-2xl font-bold tracking-tight text-purple-400 font-mono">
                CSS3
              </h3>
              <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1 font-mono">
                Frontend
              </p>
            </div>

            <div className="min-w-[80px]">
              <h3 className="text-2xl font-bold tracking-tight text-purple-400 font-mono">
                Javascript
              </h3>
              <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1 font-mono">
                Frontend
              </p>
            </div>

            <div className="min-w-[80px]">
              <h3 className="text-2xl font-bold tracking-tight text-purple-400 font-mono">
                React
              </h3>
              <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1 font-mono">
                Frontend
              </p>
            </div>

            <div className="min-w-[80px]">
              <h3 className="text-2xl font-bold tracking-tight text-purple-400 font-mono">
                Node.js
              </h3>
              <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1 font-mono">
                Backend
              </p>
            </div>
          </div>
        </div>

        {/* SAĞ TARAF: Büyütülmüş ve Dış Kaplamalı Siber Hologram Kartı */}
        <div className="relative flex justify-center items-center w-full max-w-md lg:max-w-lg mx-auto aspect-[4/5] order-1 md:order-2 p-4">
          {/* Katman 1: En Arka Büyük Savaş Ekranı Glow'u (Mavi/Mor Hibrit) */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-indigo-500/5 blur-[100px] rounded-full scale-90 animate-pulse pointer-events-none" />

          {/* Katman 2: En Dış Teknik Ölçüm Çerçevesi (Genişletilmiş Koruma) */}
          <div className="absolute -inset-1 border border-white/[0.03] rounded-3xl pointer-events-none">
            {/* Köşelerdeki Endüstriyel Çift Çizgi Detayları */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-blue-500/30" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-blue-500/30" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-blue-500/30" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-blue-500/30" />
          </div>

          {/* Katman 3: Dış Mekanik Zırh Kaplaması (Görseldeki İnce Çizgisel UI Yapısı) */}
          <div className="absolute -inset-4 border border-white/[0.05] rounded-3xl pointer-events-none">
            {/* Köşelerdeki Küçük Teknik UI Artı (+) Sembolleri */}
            <span className="absolute -top-2 -left-1.5 font-mono text-[10px] text-white/20 select-none">
              +
            </span>
            <span className="absolute -top-2 -right-1.5 font-mono text-[10px] text-white/20 select-none">
              +
            </span>
            <span className="absolute -bottom-2.5 -left-1.5 font-mono text-[10px] text-white/20 select-none">
              +
            </span>
            <span className="absolute -bottom-2.5 -right-1.5 font-mono text-[10px] text-white/20 select-none">
              +
            </span>

            {/* Yan Kenarlardaki Grid Ölçüm Noktaları */}
            <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-1 h-8 border-l border-white/20" />
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-1 h-8 border-r border-white/20" />
          </div>

          {/* Katman 4: Ana Ağır Kart Gövdesi */}
          <div className="relative w-full h-full bg-zinc-950/60 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl group shadow-[0_0_50px_rgba(0,0,0,0.9)]">
            {/* Üst Kısımdaki Kalın Lazer Tarama Çizgisi */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent z-10 shadow-[0_1px_10px_rgba(59,130,246,0.5)]" />

            {/* Yanıp sönen nokta ve BIOMETRIC_SCANNING */}
            <div className="absolute bottom-4 right-5 z-10 flex items-center gap-2 font-mono text-[9px] text-blue-400/50 tracking-widest select-none animate-pulse">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500" />
              </span>
              <span>{'BIOMETRIC_SCANNING...'}</span>
            </div>

            {/* Güvenli ve Hatasız Siyah-Beyaz Fotoğraf Alanı */}
            <div className="relative w-full h-full overflow-hidden bg-zinc-950 opacity-80 group-hover:opacity-100 transition-all duration-750 grayscale contrast-115 brightness-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100">
              <Image
                src="/for_cv.jpg"
                alt="Nurettin Dincer Hero Portrait"
                fill
                loading="eager"
                className="absolute inset-0 w-full h-full object-cover object-center scale-102 group-hover:scale-100 transition-transform duration-1000 ease-out"
              />
              {/* YENİ: Çizgiler yerine Hover durumunda beliren fütüristik dijital grid (matris) katmanı */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none"
                style={{
                  backgroundImage: `
        linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)
      `,
                  backgroundSize: '24px 24px',
                }}
              />

              {/* YENİ: Kartın üzerinden geçen sinematik bir ışık süzmesi (Işık parlaması efekti) */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-white/[0.03] to-blue-500/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-out pointer-events-none" />

              {/* Sinematik Derinlik Katan İç Gölgeler (Vignette) */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/40 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Kartın İç Çevresindeki Siber Neon Parıltı Çerçevesi */}
            <div className="absolute inset-0 border border-white/5 group-hover:border-blue-500/20 rounded-2xl transition-all duration-500 pointer-events-none" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
