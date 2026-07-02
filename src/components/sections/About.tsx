'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';
import Reveal from '../ui/Reveal';

interface TimelineItem {
  year: string;
  title: string;
  subtitle?: string;
  description: string;
  type: 'experience' | 'education';
}

// Her nokta aktif olduğunda kullanacağı renk paleti (sırayla döner)
const ACTIVE_COLORS = [
  {
    hex: '#10b981',
    shadow: 'rgba(16,185,129,0.9)',
    text: 'text-emerald-500',
  }, // emerald
  { hex: '#a78bfa', shadow: 'rgba(167,139,250,0.9)', text: 'text-violet-400' }, // violet
  { hex: '#f472b6', shadow: 'rgba(244,114,182,0.9)', text: 'text-pink-400' }, // pink/fuchsia
  { hex: '#34d399', shadow: 'rgba(52,211,153,0.9)', text: 'text-emerald-400' }, // emerald
];

export default function About() {
  const academicData: TimelineItem[] = [
    {
      year: '2021 — 2025',
      title: 'Bachelor of Computer Science',
      subtitle: 'Software Engineering Focus',
      description:
        'Focused on Software Engineering and Distributed Systems. Developed a deep understanding of data structures and algorithm optimization.',
      type: 'education',
    },
    {
      year: '2020 — 2021',
      title: 'Full Stack Specialization',
      subtitle: 'Intensive Technical Training',
      description:
        'Intensive certification program focusing on the MERN stack and modern cloud deployment strategies.',
      type: 'education',
    },
  ];

  const journeyData: TimelineItem[] = [
    {
      year: '2026 — PRESENT',
      title: 'Lead Frontend Developer',
      subtitle: 'SaaS Enterprise Solutions',
      description:
        'Kurumsal düzeyde dashboard ve premium SaaS arayüz mimarilerinin geliştirilmesi. Piksel kusursuz teslimat, performance optimizasyonu ve modern bileşen sistemlerinin kurgulanması.',
      type: 'experience',
    },
    {
      year: '2024 — 2026',
      title: 'Frontend Engineer',
      subtitle: 'SaaS Tech Studio',
      description:
        "Kompleks veri görselleştirme araçları ve interaktif analitik panellerinin React/Next.js ile inşası. Sayfa yüklenme hızlarında %40'a varan optimizasyon başarımları.",
      type: 'experience',
    },
    {
      year: '2021 — 2025',
      title: 'Bachelor of Computer Science',
      subtitle: 'Software Engineering Focus',
      description:
        'Yazılım mühendisliği, veri yapıları ve algoritma optimizasyonu üzerine akademik temel. Dağıtık sistemler ve modern web mimarileri üzerine uzmanlaşma.',
      type: 'education',
    },
  ];

  const timelinesRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: sharedProgress } = useScroll({
    target: timelinesRef,
    offset: ['start 0.85', 'end 0.4'],
  });

  const lineHeight = useTransform(sharedProgress, [0, 1], ['0%', '100%']);
  const [academicActiveIndex, setAcademicActiveIndex] = useState(-1);
  const [journeyActiveIndex, setJourneyActiveIndex] = useState(-1);

  useMotionValueEvent(sharedProgress, 'change', (latest) => {
    const academicIdx = Math.floor(latest * academicData.length);
    setAcademicActiveIndex(
      latest > 0 ? Math.min(academicIdx, academicData.length - 1) : -1,
    );

    const journeyIdx = Math.floor(latest * journeyData.length);
    setJourneyActiveIndex(
      latest > 0 ? Math.min(journeyIdx, journeyData.length - 1) : -1,
    );
  });

  // Bir noktanın aktif olup olmadığını ve rengini hesaplayan yardımcı fonksiyon
  const getPointState = (index: number, activeIndex: number) => {
    const isActive = index <= activeIndex;
    const color = ACTIVE_COLORS[index % ACTIVE_COLORS.length];
    return { isActive, color };
  };

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center px-6 py-32 relative overflow-hidden border-t border-zinc-800/50 scroll-mt-20"
      style={{
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
      }}
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(34,211,238,0.04),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(139,92,246,0.03),transparent_45%)]" />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="max-w-6xl w-full mx-auto flex flex-col gap-32 relative z-10">
        {/* ================= 1. KISIM: CORE IDENTITY ================= */}
        <div className="text-center flex flex-col items-center justify-center min-h-[40vh] pt-12">
          <Reveal>
            <p className="text-zinc-500 uppercase tracking-[0.4em] text-xs font-mono mb-4">
              CORE IDENTITY
            </p>
          </Reveal>

          <Reveal>
            <h2 className="text-6xl md:text-8xl font-black tracking-tight text-white uppercase select-none">
              WHO AM{' '}
              <span
                className="text-cyan-400"
                style={{ textShadow: '0 0 35px rgba(34, 211, 238, 0.65)' }}
              >
                I?
              </span>
            </h2>
          </Reveal>

          <Reveal>
            <div
              className="w-20 h-[3px] bg-cyan-400 rounded-full mt-6 mb-8"
              style={{ boxShadow: '0 0 20px rgba(34, 211, 238, 0.8)' }}
            />
          </Reveal>

          <Reveal>
            <p className="text-zinc-400 text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto">
              A look into the vision, personality, and technical drive behind
              the code.
            </p>
          </Reveal>
        </div>

        {/* ================= 2. KISIM: ABOUT ME BİLGİLERİ ================= */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto border-t border-zinc-700/60 pt-24 w-full">
          <Reveal>
            <p className="text-white-500/90 uppercase tracking-[0.4em] text-sm font-mono mb-6">
              ABOUT ME
            </p>
          </Reveal>

          <Reveal>
            <h3 className="text-4xl md:text-6xl font-black text-white mb-10 tracking-tight">
              Nurettin <span className="text-cyan-400">Dincer</span>
            </h3>
          </Reveal>

          <div className="space-y-6 text-zinc-300 text-xl md:text-2xl font-light leading-relaxed max-w-3xl">
            <Reveal>
              <p>
                I am a{' '}
                <strong className="text-cyan-400 font-bold">
                  Frontend Developer
                </strong>{' '}
                focused on building premium SaaS interfaces and cinematic web
                experiences. My approach combines technical rigor with a deep
                understanding of user psychology.
              </p>
            </Reveal>
            <Reveal>
              <p>
                Based in Istanbul, I thrive in environments where{' '}
                <strong className="text-white font-medium">performance</strong>,{' '}
                <strong className="text-white font-medium">scalability</strong>,
                and{' '}
                <strong className="text-white font-medium">clean design</strong>{' '}
                are the primary objectives. I architect digital systems that
                bridge the gap between human emotion and machine logic.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 pt-12 mt-4 font-mono text-xs tracking-widest text-cyan-400/90">
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-cube text-[14px] text-cyan-400"></i>{' '}
                MODERN ARCHITECTURE
              </span>
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-bolt text-[14px] text-cyan-400"></i>{' '}
                HIGH PERFORMANCE
              </span>
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-wand-magic-sparkles text-[14px] text-cyan-400"></i>{' '}
                USER-CENTRIC DESIGN
              </span>
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-leaf text-[14px] text-cyan-400"></i>{' '}
                SUSTAINABLE
              </span>
            </div>
          </Reveal>
        </div>

        {/* ================= 3. KISIM: LOWER SECTION (BÜYÜTÜLMÜŞ TIMELINE'LAR) ================= */}
        <div
          ref={timelinesRef}
          className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-stretch  border-t border-zinc-800/60 pt-24"
        >
          {/* SOL SÜTUN - ACADEMIC FOUNDATION TIMELINE */}
          <div className="space-y-12 h-full flex flex-col">
            <Reveal>
              <div className="space-y-2">
                <p className="text-zinc-500 uppercase tracking-[0.3em] text-sm font-mono">
                  EDUCATION
                </p>
                <h3 className="text-4xl md:text-5xl font-black tracking-tight text-white">
                  Academic{' '}
                  <span
                    className="text-cyan-400"
                    style={{ textShadow: '0 0 20px rgba(34,211,238,0.5)' }}
                  >
                    Foundation
                  </span>
                </h3>
              </div>
            </Reveal>

            <div className="relative ml-2 pl-6 md:pl-10 space-y-10">
              {/* Sönük taban çizgisi */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-800" />

              {/* Neon ilerleme çizgisi — scroll'a bağlı */}
              <motion.div
                className="absolute left-0 top-0 w-px bg-cyan-400"
                style={{
                  height: lineHeight,
                  boxShadow:
                    '0 0 8px 2px rgba(34,211,238,0.8), 0 0 20px 6px rgba(34,211,238,0.35)',
                }}
              />

              {/* Çizginin ucundaki parlayan nokta */}
              <motion.div
                className="absolute left-[-3.5px] w-[8px] h-[8px] rounded-full bg-cyan-400"
                style={{
                  top: lineHeight,
                  boxShadow: '0 0 12px 4px rgba(34,211,238,0.9)',
                }}
              />

              {academicData.map((item, index) => {
                const { isActive, color } = getPointState(
                  index,
                  academicActiveIndex,
                );
                return (
                  <div key={index} className="relative group">
                    <div
                      className="absolute -left-[31px] md:-left-[45px] top-2.5 w-2.5 h-2.5 rounded-full transition-all duration-500 z-10"
                      style={{
                        backgroundColor: isActive ? color.hex : '#09090b',
                        borderWidth: 2,
                        borderColor: isActive ? color.hex : '#3f3f46',
                        boxShadow: isActive
                          ? `0 0 14px 4px ${color.shadow}`
                          : 'none',
                      }}
                    />

                    <Reveal>
                      <div
                        className="bg-zinc-900/20 backdrop-blur-sm border rounded-2xl p-8 md:p-10 transition-all duration-300"
                        style={{
                          borderColor: isActive
                            ? `${color.hex}55`
                            : 'rgba(63,63,70,0.4)',
                        }}
                      >
                        <div
                          className="font-mono text-sm font-bold tracking-wider mb-2 transition-colors duration-300"
                          style={{ color: isActive ? color.hex : '#22d3ee' }}
                        >
                          {item.year}
                        </div>

                        <div className="flex flex-wrap items-baseline gap-2 mb-3">
                          <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors duration-300">
                            {item.title}
                          </h4>
                          {item.subtitle && (
                            <span className="text-zinc-400 text-base font-medium ml-1">
                              @ {item.subtitle}
                            </span>
                          )}

                          <span className="ml-auto text-xs font-mono font-bold tracking-widest px-3 py-1 rounded-full uppercase bg-violet-500/10 text-violet-400 border border-violet-500/20">
                            {item.type}
                          </span>
                        </div>

                        <p className="text-zinc-400 text-lg leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </Reveal>
                  </div>
                );
              })}
            </div>

            {/* Boş spacer — sütunu diğerine boy olarak eşitler, çizgiyi ETKİLEMEZ */}
            <div className="flex-1" />
          </div>

          {/* SAĞ SÜTUN - MY JOURNEY TIMELINE */}
          <div className="space-y-12 h-full flex flex-col">
            <Reveal>
              <div className="space-y-2">
                <p className="text-zinc-500 uppercase tracking-[0.3em] text-sm font-mono">
                  MILESTONES
                </p>
                <h3 className="text-4xl md:text-5xl font-black tracking-tight text-white">
                  My{' '}
                  <span
                    className="text-cyan-400"
                    style={{ textShadow: '0 0 20px rgba(34,211,238,0.5)' }}
                  >
                    Journey
                  </span>
                </h3>
              </div>
            </Reveal>

            <div className="relative ml-2 pl-6 md:pl-10 space-y-10">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-800" />

              <motion.div
                className="absolute left-0 top-0 w-px bg-cyan-400"
                style={{
                  height: lineHeight,
                  boxShadow:
                    '0 0 8px 2px rgba(34,211,238,0.8), 0 0 20px 6px rgba(34,211,238,0.35)',
                }}
              />

              <motion.div
                className="absolute left-[-3.5px] w-[8px] h-[8px] rounded-full bg-cyan-400"
                style={{
                  top: lineHeight,
                  boxShadow: '0 0 12px 4px rgba(34,211,238,0.9)',
                }}
              />

              {journeyData.map((item, index) => {
                const { isActive, color } = getPointState(
                  index,
                  journeyActiveIndex,
                );
                return (
                  <div key={index} className="relative group">
                    <div
                      className="absolute -left-[31px] md:-left-[45px] top-2.5 w-2.5 h-2.5 rounded-full transition-all duration-500 z-10"
                      style={{
                        backgroundColor: isActive ? color.hex : '#09090b',
                        borderWidth: 2,
                        borderColor: isActive ? color.hex : '#3f3f46',
                        boxShadow: isActive
                          ? `0 0 14px 4px ${color.shadow}`
                          : 'none',
                      }}
                    />

                    <Reveal>
                      <div
                        className="bg-zinc-900/20 backdrop-blur-sm border rounded-2xl p-8 md:p-10 transition-all duration-300"
                        style={{
                          borderColor: isActive
                            ? `${color.hex}55`
                            : 'rgba(63,63,70,0.4)',
                        }}
                      >
                        <div
                          className="font-mono text-sm font-bold tracking-wider mb-2 transition-colors duration-300"
                          style={{ color: isActive ? color.hex : '#22d3ee' }}
                        >
                          {item.year}
                        </div>

                        <div className="flex flex-wrap items-baseline gap-2 mb-3">
                          <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors duration-300">
                            {item.title}
                          </h4>
                          {item.subtitle && (
                            <span className="text-zinc-400 text-base font-medium ml-1">
                              @ {item.subtitle}
                            </span>
                          )}

                          <span
                            className={`ml-auto text-xs font-mono font-bold tracking-widest px-3 py-1 rounded-full uppercase ${
                              item.type === 'experience'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-violet-500/10 text-violet-400 border border-violet-500/20'
                            }`}
                          >
                            {item.type}
                          </span>
                        </div>

                        <p className="text-zinc-400 text-lg leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </Reveal>
                  </div>
                );
              })}
            </div>

            {/* Boş spacer */}
            <div className="flex-1" />
          </div>
        </div>
      </div>
    </section>
  );
}
