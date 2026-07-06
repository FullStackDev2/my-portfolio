'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import SectionGlow from '../ui/SectionGlow';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useMotionValue,
  type Transition,
} from 'framer-motion';
import Reveal from '../ui/Reveal';

interface TimelineItem {
  year: string;
  title: string;
  subtitle?: string;
  description: string;
  type: 'experience' | 'education';
}

const ACTIVE_COLORS = [
  { hex: '#10b981', shadow: 'rgba(16,185,129,0.9)', text: 'text-emerald-500' },
  { hex: '#a78bfa', shadow: 'rgba(167,139,250,0.9)', text: 'text-violet-400' },
  { hex: '#f472b6', shadow: 'rgba(244,114,182,0.9)', text: 'text-pink-400' },
  { hex: '#34d399', shadow: 'rgba(52,211,153,0.9)', text: 'text-emerald-400' },
];

// Kart açılma/kapanma animasyonu için ortak layout transition ayarı
const CARD_LAYOUT_TRANSITION: Transition = {
  layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
};

// Slot için ölçüm gelmeden önceki geçici minimum değer (ilk frame flash'ını azaltmak için)
const FALLBACK_MIN_HEIGHT = 220;

export default function About() {
  const academicData: TimelineItem[] = [
    {
      year: '2025 — 2026',
      title: 'Full Stack Developer',
      subtitle: 'GoIT Türkiye',
      description:
        'Focused on Software Engineering and Distributed Systems. Developed a deep understanding of data structures and algorithm optimization.',
      type: 'education',
    },
    {
      year: '2012 — 2014',
      title: 'Kırklareli University - Vocational School of Technical Sciences',
      subtitle: 'Associate Degree, Interior Design',
      description:
        'Intensive certification program focusing on the MERN stack and modern cloud deployment strategies.',
      type: 'education',
    },
    {
      year: '2007 — 2011',
      title: 'Sultanahmet Vocational and Technical Anatolian High School',
      subtitle: 'Art & Design/Art Studies',
      description:
        'Focused on Software Engineering and Distributed Systems. Developed a deep understanding of data structures and algorithm optimization.',
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
        "Kompleks veri görselleştirme araçları ve interaktif analitik panellerinin React/Next.js ile inşası. Sayfa yüklenme hızlarında %40'a varan optimizasyon.",
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

  // --- TEK ORTAK SCROLL PROGRESS: iki sütun da AYNI ANDA başlar, AYNI ANDA biter ---
  const timelinesRef = useRef<HTMLDivElement>(null);

  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);
  const hoveredSideRef = useRef<'left' | 'right' | null>(null);

  const [barsVisible, setBarsVisible] = useState(false);
  const barsVisibleRef = useRef(false);

  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      const side: 'left' | 'right' =
        e.clientX < window.innerWidth / 2 ? 'left' : 'right';
      if (hoveredSideRef.current !== side) {
        hoveredSideRef.current = side;
        setHoveredSide(side);
      }
    };
    window.addEventListener('mousemove', handleWindowMouseMove);
    return () => window.removeEventListener('mousemove', handleWindowMouseMove);
  }, []);

  useEffect(() => {
    const el = timelinesRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        barsVisibleRef.current = entry.isIntersecting;
        setBarsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const isSideOpen = (side: 'left' | 'right') =>
    !barsVisibleRef.current ||
    hoveredSideRef.current === null ||
    hoveredSideRef.current === side;

  const academicBarOpacity =
    !barsVisible || hoveredSide === null || hoveredSide === 'left' ? 1 : 0.3;
  const journeyBarOpacity =
    !barsVisible || hoveredSide === null || hoveredSide === 'right' ? 1 : 0.3;

  const [expandedAcademic, setExpandedAcademic] = useState<number | null>(null);
  const [expandedJourney, setExpandedJourney] = useState<number | null>(null);

  const academicListRef = useRef<HTMLDivElement>(null);
  const journeyListRef = useRef<HTMLDivElement>(null);
  const [academicHeight, setAcademicHeight] = useState(0);
  const [journeyHeight, setJourneyHeight] = useState(0);

  const academicCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const journeyCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [academicBreakpoints, setAcademicBreakpoints] = useState<number[]>([]);
  const [journeyBreakpoints, setJourneyBreakpoints] = useState<number[]>([]);

  const academicCardInnerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const journeyCardInnerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [academicClosedHeights, setAcademicClosedHeights] = useState<number[]>(
    [],
  );
  const [journeyClosedHeights, setJourneyClosedHeights] = useState<number[]>(
    [],
  );

  useLayoutEffect(() => {
    academicCardInnerRefs.current.forEach((el, index) => {
      if (!el) return;
      const h = el.offsetHeight;
      setAcademicClosedHeights((prev) => {
        if (prev[index] === h) return prev;
        const next = [...prev];
        next[index] = h;
        return next;
      });
    });
  }, []);

  useLayoutEffect(() => {
    journeyCardInnerRefs.current.forEach((el, index) => {
      if (!el) return;
      const h = el.offsetHeight;
      setJourneyClosedHeights((prev) => {
        if (prev[index] === h) return prev;
        const next = [...prev];
        next[index] = h;
        return next;
      });
    });
  }, []);

  useEffect(() => {
    const observers: ResizeObserver[] = [];
    academicCardInnerRefs.current.forEach((el, index) => {
      if (!el) return;
      const ro = new ResizeObserver(() => {
        if (expandedAcademic === index) return;
        const h = el.offsetHeight;
        setAcademicClosedHeights((prev) => {
          if (prev[index] === h) return prev;
          const next = [...prev];
          next[index] = h;
          return next;
        });
      });
      ro.observe(el);
      observers.push(ro);
    });
    return () => observers.forEach((ro) => ro.disconnect());
  }, [expandedAcademic]);

  useEffect(() => {
    const observers: ResizeObserver[] = [];
    journeyCardInnerRefs.current.forEach((el, index) => {
      if (!el) return;
      const ro = new ResizeObserver(() => {
        if (expandedJourney === index) return;
        const h = el.offsetHeight;
        setJourneyClosedHeights((prev) => {
          if (prev[index] === h) return prev;
          const next = [...prev];
          next[index] = h;
          return next;
        });
      });
      ro.observe(el);
      observers.push(ro);
    });
    return () => observers.forEach((ro) => ro.disconnect());
  }, [expandedJourney]);

  useEffect(() => {
    const measure = () => {
      if (academicListRef.current) {
        setAcademicHeight(academicListRef.current.offsetHeight);
        setAcademicBreakpoints(
          academicCardRefs.current.map((el) => el?.offsetTop ?? 0),
        );
      }
      if (journeyListRef.current) {
        setJourneyHeight(journeyListRef.current.offsetHeight);
        setJourneyBreakpoints(
          journeyCardRefs.current.map((el) => el?.offsetTop ?? 0),
        );
      }
    };

    measure();

    const ro = new ResizeObserver(measure);
    if (academicListRef.current) ro.observe(academicListRef.current);
    if (journeyListRef.current) ro.observe(journeyListRef.current);
    window.addEventListener('resize', measure);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const maxHeight = Math.max(academicHeight, journeyHeight, 1);

  const academicRatio =
    maxHeight > 0 ? Math.min(academicHeight / maxHeight, 1) : 1;
  const journeyRatio =
    maxHeight > 0 ? Math.min(journeyHeight / maxHeight, 1) : 1;

  const { scrollYProgress: sharedProgress } = useScroll({
    target: timelinesRef,
    offset: ['start 0.85', 'end 0.4'],
  });

  const academicLineHeight = useTransform(
    sharedProgress,
    academicRatio >= 1 ? [0, 1] : [0, academicRatio, 1],
    academicRatio >= 1
      ? [0, academicHeight]
      : [0, academicHeight, academicHeight],
  );
  const journeyLineHeight = useTransform(
    sharedProgress,
    journeyRatio >= 1 ? [0, 1] : [0, journeyRatio, 1],
    journeyRatio >= 1 ? [0, journeyHeight] : [0, journeyHeight, journeyHeight],
  );

  const gatedAcademicHeight = useMotionValue(0);
  const gatedJourneyHeight = useMotionValue(0);

  useMotionValueEvent(academicLineHeight, 'change', (latest) => {
    if (isSideOpen('left')) {
      gatedAcademicHeight.set(latest);
    }
  });

  useMotionValueEvent(journeyLineHeight, 'change', (latest) => {
    if (isSideOpen('right')) {
      gatedJourneyHeight.set(latest);
    }
  });

  const [academicActiveIndex, setAcademicActiveIndex] = useState(-1);
  const [journeyActiveIndex, setJourneyActiveIndex] = useState(-1);

  const academicActiveIndexRef = useRef(-1);
  const journeyActiveIndexRef = useRef(-1);

  useMotionValueEvent(gatedAcademicHeight, 'change', (latest) => {
    let idx = -1;
    for (let i = 0; i < academicBreakpoints.length; i++) {
      if (latest >= academicBreakpoints[i]) idx = i;
    }
    if (academicActiveIndexRef.current !== idx) {
      academicActiveIndexRef.current = idx;
      queueMicrotask(() => flushSync(() => setAcademicActiveIndex(idx)));
    }
  });

  useMotionValueEvent(gatedJourneyHeight, 'change', (latest) => {
    let idx = -1;
    for (let i = 0; i < journeyBreakpoints.length; i++) {
      if (latest >= journeyBreakpoints[i]) idx = i;
    }
    if (journeyActiveIndexRef.current !== idx) {
      journeyActiveIndexRef.current = idx;
      queueMicrotask(() => flushSync(() => setJourneyActiveIndex(idx)));
    }
  });

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
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.12]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_8%,rgba(45,212,191,0.09),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_92%_5%,rgba(34,211,238,0.08),transparent_42%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(34,211,238,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_95%_95%,rgba(139,92,246,0.08),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_5%_92%,rgba(16,185,129,0.08),transparent_42%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_50%,rgba(16,185,129,0.05),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_55%,rgba(45,212,191,0.06),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_90%,rgba(34,211,238,0.05),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(139,92,246,0.05),transparent_38%)]" />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <SectionGlow
        spots={[
          {
            color: 'blue',
            top: '15%',
            left: '2%',
            size: 450,
            opacity: 0.12,
            blur: 90,
            animate: 'drift1',
          },
          {
            color: 'teal',
            top: '5%',
            right: '4%',
            size: 380,
            opacity: 0.18,
            blur: 90,
            animate: 'drift2',
          },
        ]}
      />

      <SectionGlow
        spots={[
          {
            color: 'teal',
            top: '56.5%',
            right: '42%',
            size: 400,
            opacity: 0.15,
            blur: 90,
            animate: 'drift2',
          },
        ]}
      />

      <SectionGlow
        spots={[
          {
            color: 'purple',
            top: '79%',
            left: '7%',
            size: 340,
            opacity: 0.1,
            blur: 85,
            animate: 'drift2',
          },
          {
            color: 'blue',
            top: '62%',
            right: '2%',
            size: 340,
            opacity: 0.13,
            blur: 85,
            animate: 'drift1',
          },
        ]}
      />

      <div className="max-w-6xl w-full mx-auto flex flex-col gap-24 relative z-10">
        {/* ================= 1. KISIM: CORE IDENTITY ================= */}
        <div className="text-center flex flex-col items-center justify-center pt-4 pb-4">
          <Reveal>
            <p className="text-white-500/90 uppercase tracking-[0.4em] text-lg font-mono mb-2">
              CORE IDENTITY
            </p>
          </Reveal>

          <Reveal>
            <h2 className="text-7xl md:text-9xl font-black tracking-tight text-white uppercase select-none">
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
              className="w-28 h-[4px] bg-cyan-400 rounded-full mt-6 mb-8"
              style={{ boxShadow: '0 0 20px rgba(34, 211, 238, 0.8)' }}
            />
          </Reveal>

          <Reveal>
            <p className="text-zinc-300 text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto mb-8">
              A look into the vision, personality, and technical drive behind
              the code.
            </p>
          </Reveal>
        </div>

        <div className="w-full max-w-[2050px] mx-auto flex flex-col xl:flex-row items-center justify-center gap-28 xl:gap-36">
          {/* SOL PANEL */}
          <Reveal>
            <div
              className="relative w-full max-w-[430px] lg:w-[430px] rounded-[30px] px-6 py-6 md:px-8 md:py-7 overflow-hidden"
              style={{
                background:
                  'linear-gradient(180deg, rgba(8,12,24,.96), rgba(6,10,20,.88))',
                border: '1px solid rgba(30,140,255,.28)',
                boxShadow:
                  '0 0 35px rgba(20,120,255,.12), inset 0 0 25px rgba(20,120,255,.04)',
              }}
            >
              {/* Corner Accents */}
              <div className="absolute left-0 top-0 w-12 h-12 border-l-2 border-t-2 border-cyan-400/70 rounded-tl-3xl" />
              <div className="absolute right-0 bottom-0 w-12 h-12 border-r-2 border-b-2 border-cyan-400/70 rounded-br-3xl" />

              {/* Header */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-cyan-400/50" />

                <span className="uppercase tracking-[5px] text-[11px] text-cyan-400 font-semibold">
                  MY APPROACH
                </span>

                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-cyan-400/50" />
              </div>

              {/* Items */}
              <div className="flex flex-col gap-4 mt-8">
                {[
                  {
                    icon: 'fa-solid fa-bullseye',
                    title: 'Solve Real Problems',
                    desc: 'Creating products that solve meaningful challenges.',
                  },
                  {
                    icon: 'fa-solid fa-rocket',
                    title: 'Build & Improve',
                    desc: 'Constantly refining every interaction and experience.',
                  },
                  {
                    icon: 'fa-solid fa-users',
                    title: 'User First',
                    desc: 'Designing interfaces people genuinely enjoy using.',
                  },
                  {
                    icon: 'fa-solid fa-chart-line',
                    title: 'Keep Learning',
                    desc: 'Growing through curiosity and continuous practice.',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="
            group
            flex
            items-center
            gap-5
            rounded-2xl
            px-5
            py-4
            border
            transition-all
            duration-300
          "
                    style={{
                      background: 'rgba(255,255,255,.02)',
                      borderColor: 'rgba(30,140,255,.12)',
                    }}
                  >
                    {/* Icon */}

                    <div
                      className="
              w-12 h-12 md:w-14 md:h-14 text-xl md:text-2xl
              rounded-2xl
              flex
              items-center
              justify-center
              text-white
              hover:text-blue-600
              text-2xl
              shrink-0
              transition-all
              duration-300
              group-hover:scale-120
            "
                      style={{
                        background: 'rgba(20,120,255,.08)',
                        border: '1px solid rgba(30,140,255,.28)',
                        boxShadow: '0 0 20px rgba(20,120,255,.08)',
                      }}
                    >
                      <i className={item.icon} />
                    </div>

                    {/* Text */}

                    <div>
                      <h4 className="text-white text-lg font-bold">
                        {item.title}
                      </h4>

                      <p className="text-zinc-400 text-sm leading-6 mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Divider */}
              <div className="mt-7 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
            </div>
          </Reveal>

          {/* ORTA: FOTOĞRAF */}
          <div className="relative w-full max-w-[860px] aspect-[860/640] shrink-0 scale-100 lg:scale-[1.05]">
            {/* Alt Glow — mobilde küçültüldü */}
            <div className="absolute left-1/2 bottom-3 -translate-x-1/2 w-[280px] sm:w-[420px] md:w-[700px] h-[100px] sm:h-[150px] md:h-[220px] rounded-full bg-blue-500/40 blur-[60px] md:blur-[100px]" />

            {/* Dış Glow */}
            <div className="absolute inset-0 scale-100 blur-[60px] md:blur-[110px] bg-blue-600/25" />

            {/* Sol yan mavilik — mobilde gizli, taşma riski */}
            <div className="hidden md:block absolute -left-24 top-1/4 w-[280px] h-[380px] rounded-full bg-blue-500/25 blur-[90px]" />

            {/* Sağ yan mavilik — mobilde gizli */}
            <div className="hidden md:block absolute -right-24 top-1/3 w-[280px] h-[380px] rounded-full bg-blue-600/25 blur-[90px]" />

            {/* Üst mavilik — mobilde küçültüldü */}
            <div className="absolute left-1/2 -top-10 md:-top-20 -translate-x-1/2 w-[260px] sm:w-[380px] md:w-[500px] h-[110px] sm:h-[160px] md:h-[220px] rounded-full bg-blue-500/20 blur-[50px] md:blur-[100px]" />

            {/* FRAME */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath:
                  'polygon(8% 18%,82% 6%,100% 14%,96% 72%,72% 100%,10% 100%,0 72%,2% 32%)',
                background:
                  'linear-gradient(180deg,rgba(10,20,40,.15),rgba(10,20,40,.05))',
                border: '1.5px solid rgba(30,140,255,0.8)',
                backdropFilter: 'blur(20px) saturate(180%)',
                boxShadow: `
        inset 0 1px rgba(120,200,255,.15),
        inset 0 -1px rgba(0,0,0,.2),
        0 30px 70px rgba(0,0,0,.55),
        0 0 40px rgba(20,120,255,.65),
        0 0 90px rgba(10,100,255,.5),
        0 0 160px rgba(5,80,220,.35),
        0 0 240px rgba(0,60,200,.2)
      `,
              }}
            >
              {/* sadece arka plan kesiliyor */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  clipPath:
                    'polygon(8% 18%,82% 6%,100% 14%,96% 72%,72% 100%,10% 100%,0 72%,2% 32%)',
                }}
              >
                <Image
                  src="/images/computer_coding.png"
                  alt="Coding"
                  width={1920}
                  height={1080}
                  priority
                  className="
    absolute
    inset-0
    w-full
    h-full
    object-cover
    scale-100
    md:scale-[1.15]
    brightness-[.75]
    md:brightness-[.62]
    contrast-110
    saturate-115
  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-[#020817]/25 to-transparent" />

                {/* merkez neon glow */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 35%,rgba(20,120,255,.14),transparent 70%)',
                  }}
                />

                {/* kenar vignette — fotoğrafı arka plana eritir */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 55%, #020817 100%)',
                    opacity: 0.8,
                  }}
                />

                {/* kenarlarda neon renk sızması */}
                <div
                  className="absolute inset-0 mix-blend-screen"
                  style={{
                    background: `
              linear-gradient(90deg, rgba(20,120,255,.32) 0%, transparent 18%, transparent 82%, rgba(20,120,255,.32) 100%),
              linear-gradient(180deg, rgba(20,120,255,.28) 0%, transparent 18%, transparent 82%, rgba(20,120,255,.28) 100%)
            `,
                  }}
                />
              </div>

              {/* üst highlight */}
              <div
                className="absolute inset-x-4 md:inset-x-8 top-[1px] h-px"
                style={{
                  background:
                    'linear-gradient(90deg,transparent,rgba(150,210,255,.7),transparent)',
                  boxShadow: '0 0 10px rgba(30,140,255,0.6)',
                }}
              />

              {/* sağ neon */}
              <div
                className="absolute right-6 md:right-10 top-0 h-full w-px bg-blue-400/40 blur-sm"
                style={{ boxShadow: '0 0 12px rgba(20,120,255,0.5)' }}
              />

              {/* alt cyan */}
              <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24 bg-gradient-to-t from-blue-500/20 to-transparent" />

              {/* iç glass border */}
              <div
                className="absolute inset-[2px] pointer-events-none"
                style={{
                  clipPath:
                    'polygon(8% 18%,82% 6%,100% 14%,96% 72%,72% 100%,10% 100%,0 72%,2% 32%)',
                  border: '1px solid rgba(30,140,255,0.45)',
                  boxShadow: `
      inset 0 1px rgba(150,210,255,.2),
      inset 0 -1px rgba(0,0,0,.15),
      inset 0 -45px 90px rgba(20,120,255,.25),
      inset 0 0 60px rgba(20,120,255,.12),
      0 0 30px rgba(20,120,255,.2)
    `,
                }}
              />

              {/* HUD — mobilde küçültüldü */}
              <div
                className="absolute left-4 md:left-8 top-4 md:top-8 w-12 md:w-20 h-px bg-blue-400/70"
                style={{ boxShadow: '0 0 10px rgba(30,140,255,0.9)' }}
              />
              <div
                className="absolute left-4 md:left-8 top-4 md:top-8 h-12 md:h-20 w-px bg-blue-400/70"
                style={{ boxShadow: '0 0 10px rgba(30,140,255,0.9)' }}
              />

              <div
                className="absolute right-4 md:right-8 bottom-4 md:bottom-8 w-12 md:w-20 h-px bg-blue-400/70"
                style={{ boxShadow: '0 0 10px rgba(30,140,255,0.9)' }}
              />
              <div
                className="absolute right-4 md:right-8 bottom-4 md:bottom-8 h-12 md:h-20 w-px bg-blue-400/70"
                style={{ boxShadow: '0 0 10px rgba(30,140,255,0.9)' }}
              />
            </div>

            {/* Character Halo — mobilde küçültüldü */}
            <div
              className="absolute left-1/2 bottom-4 md:bottom-8 -translate-x-1/2 w-[260px] sm:w-[360px] md:w-[480px] h-[300px] sm:h-[450px] md:h-[620px] rounded-full pointer-events-none blur-[60px] md:blur-[100px]"
              style={{
                background:
                  'radial-gradient(circle, rgba(15,90,255,.22) 0%, rgba(10,60,180,.14) 45%, transparent 80%)',
              }}
            />

            {/* Blue Ambient — mobilde küçültüldü */}
            <div
              className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[280px] sm:w-[380px] md:w-[520px] h-[340px] sm:h-[500px] md:h-[720px] pointer-events-none blur-[45px] md:blur-[70px]"
              style={{
                background:
                  'radial-gradient(circle at 50% 45%, rgba(20,120,255,.12), transparent 72%)',
                mixBlendMode: 'screen',
              }}
            />

            {/* PNG (frame dışında, kesilmiyor) */}
            <Image
              src="/images/NobackGroundddd.png"
              alt="Developer"
              width={900}
              height={1100}
              priority
              className="
absolute
left-1/2
bottom-0
z-30
w-[74%]
sm:w-[73%]
md:w-[73%]
lg:w-auto
lg:h-[720px]
object-contain
"
              style={{
                transform: 'translateX(calc(-50% + 10px))',
                filter: `
      brightness(.90)
      contrast(1.08)
      saturate(.92)
      drop-shadow(0 30px 45px rgba(0,0,0,.65))
      drop-shadow(0 0 25px rgba(20,120,255,.25))
      drop-shadow(0 0 70px rgba(20,120,255,.18))
    `,
                opacity: 0.97,
                clipPath: 'polygon(0 0,100% 0,100% 83.5%,78% 100%,0 100%)',
              }}
            />
          </div>

          {/* SAĞ: BAĞLANTILI ÖZELLİK KARTLARI */}
          <Reveal>
            <div
              className="relative flex flex-col gap-44 shrink-0 pl-6"
              style={{ flex: '0 0 420px', width: '420px', maxWidth: '420px' }}
            >
              {/* Kavisli SVG bağlantı çizgisi */}
              <svg
                className="hidden lg:block absolute pointer-events-none"
                style={{ left: '-84px', top: 0, height: '100%' }}
                width="60"
                viewBox="0 0 60 970"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M 150 5
C 115 5, 85 15, 110 52
C 75 52, 35 78, 40 130
C 15 220, 15 320, 35 378
C 55 436, 55 520, 30 578
C 10 626, 10 710, 32 768
C 38 835, 70 900, 90 930
C 145 950, 170 962, 140 995
                     "
                  fill="none"
                  stroke="rgba(30,140,255,0.6)"
                  strokeWidth="1.5"
                  strokeDasharray="6 7"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  style={{
                    filter: 'drop-shadow(0 0 4px rgba(20,120,255,0.6))',
                  }}
                />
                <circle
                  cx="58"
                  cy="71"
                  r="4.5"
                  fill="#3b9dff"
                  style={{
                    filter: 'drop-shadow(0 0 6px rgba(30,140,255,0.9))',
                  }}
                />

                <circle
                  cx="50"
                  cy="480"
                  r="4.5"
                  fill="#3b9dff"
                  style={{
                    filter: 'drop-shadow(0 0 6px rgba(30,140,255,0.9))',
                  }}
                />
                <circle
                  cx="57.5"
                  cy="870"
                  r="4.5"
                  fill="#3b9dff"
                  style={{
                    filter: 'drop-shadow(0 0 6px rgba(30,140,255,0.9))',
                  }}
                />
              </svg>

              {[
                {
                  icon: 'fa-code',
                  title: 'Developer Mindset',
                  desc: 'Focused on clean code, scalable solutions and continuous improvement.',
                },
                {
                  icon: 'fa-bolt',
                  title: 'Performance Driven',
                  desc: 'I build with speed, efficiency and best practices to ensure high performance.',
                },
                {
                  icon: 'fa-user',
                  title: 'User Focused',
                  desc: 'Crafting intuitive experiences that people love and make a difference.',
                },
              ].map((f, i) => (
                <div key={i} className="relative flex items-start gap-5">
                  <div
                    className="relative w-16 h-16 rounded-full bg-zinc-950/70 backdrop-blur-sm flex items-center justify-center text-blue-400 text-lg shrink-0"
                    style={{
                      border: '1px solid rgba(30,140,255,0.4)',
                      boxShadow: '0 0 18px rgba(20,120,255,0.3)',
                    }}
                  >
                    <i className={`fa-solid ${f.icon}`} />
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-white mb-1.5">
                      {f.title}
                    </h5>
                    <p className="text-zinc-400 text-lg leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ================= 2. KISIM: ABOUT ME BİLGİLERİ ================= */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto border-t border-zinc-700/60 pt-24 w-full">
          <Reveal>
            <p className="text-white-500/90 uppercase tracking-[0.4em] text-lg font-mono mb-1">
              ABOUT ME
            </p>
          </Reveal>

          <Reveal>
            <h3
              className="font-black text-white mb-2 tracking-normal"
              style={{
                fontSize: 'clamp(2.5rem, 6vw + 1rem, 6rem)',
                fontFamily: 'BespokeSerif_number',
              }}
            >
              Nurettin <span className="text-cyan-400">Dincer</span>
            </h3>
          </Reveal>

          <div
            className="space-y-4 text-zinc-200 font-light leading-[1.65] max-w-3xl mx-auto"
            style={{ fontSize: 'clamp(1.125rem, 1.2vw + 0.85rem, 1.5rem)' }}
          >
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
            <div
              className="flex flex-wrap justify-center gap-x-12  gap-y-6 pt-16 mt-4 text-base md:text-lg tracking-widest text-cyan-400/90 max-w-6xl mx-auto w-full"
              style={{ fontFamily: 'Manrope-Semibold' }}
            >
              <span className="flex items-center gap-3 whitespace-nowrap">
                <i className="fa-solid fa-cube text-[20px] text-cyan-400"></i>{' '}
                MODERN ARCHITECTURE
              </span>
              <span className="flex items-center gap-3 whitespace-nowrap">
                <i className="fa-solid fa-bolt text-[20px] text-cyan-400"></i>{' '}
                HIGH PERFORMANCE
              </span>
              <span className="flex items-center gap-3 whitespace-nowrap">
                <i className="fa-solid fa-wand-magic-sparkles text-[20px] text-cyan-400"></i>{' '}
                USER-CENTRIC DESIGN
              </span>
              <span className="flex items-center gap-3 whitespace-nowrap">
                <i className="fa-solid fa-leaf text-[20px] text-cyan-400"></i>{' '}
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
                <p className="text-zinc-100 uppercase tracking-[0.3em] text-[1rem] font-mono">
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

            <div
              ref={academicListRef}
              className="relative ml-2 pl-6 md:pl-10 space-y-10"
            >
              <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-800" />

              <motion.div
                className="absolute left-0 top-0 w-px transition-[background,box-shadow,filter] duration-500"
                style={{
                  height: gatedAcademicHeight,
                  background:
                    academicBarOpacity === 1
                      ? '#22d3ee'
                      : 'linear-gradient(to bottom, transparent 0%, rgba(94,234,212,0.9) 42%, rgba(45,212,191,0.3) 65%, rgba(63,63,70,0.5) 100%)',
                  filter: academicBarOpacity === 1 ? 'none' : 'blur(1.5px)',
                  boxShadow:
                    academicBarOpacity === 1
                      ? '0 0 8px 2px rgba(34,211,238,0.8), 0 0 20px 6px rgba(34,211,238,0.35)'
                      : '0 0 16px 4px rgba(45,212,191,0.35)',
                }}
              />

              <motion.div
                className="absolute left-[-3.5px] w-[8px] h-[8px] rounded-full bg-cyan-400 transition-opacity duration-300"
                style={{
                  top: gatedAcademicHeight,
                  opacity: academicBarOpacity,
                  boxShadow: '0 0 12px 4px rgba(34,211,238,0.9)',
                }}
              />

              {academicData.map((item, index) => {
                const { isActive, color } = getPointState(
                  index,
                  academicActiveIndex,
                );
                const isExpanded = expandedAcademic === index;
                const measuredHeight = academicClosedHeights[index];
                return (
                  <div
                    key={index}
                    ref={(el) => {
                      academicCardRefs.current[index] = el;
                    }}
                    className="relative group"
                    style={{
                      height: measuredHeight
                        ? `${measuredHeight}px`
                        : undefined,
                      minHeight: measuredHeight
                        ? undefined
                        : FALLBACK_MIN_HEIGHT,
                    }}
                  >
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
                      <motion.div
                        layout
                        transition={CARD_LAYOUT_TRANSITION}
                        ref={(el) => {
                          academicCardInnerRefs.current[index] = el;
                        }}
                        className="absolute left-0 right-0 top-0 bg-zinc-900/20 backdrop-blur-sm border rounded-2xl p-8 md:p-10 flex flex-col transition-colors duration-300"
                        style={{
                          borderColor: isActive
                            ? `${color.hex}55`
                            : 'rgba(63,63,70,0.4)',
                          zIndex: isExpanded ? 30 : 10,
                          boxShadow: isExpanded
                            ? '0 25px 60px -15px rgba(0,0,0,0.65), 0 0 0 1px rgba(34,211,238,0.15)'
                            : 'none',
                        }}
                      >
                        <div className="flex items-center justify-between mb-4 mt-0 -translate-y-2">
                          <div
                            className="font-sans text-base font-bold tracking-wider transition-colors duration-300"
                            style={{ color: isActive ? color.hex : '#22d3ee' }}
                          >
                            {item.year}
                          </div>
                          <span className="text-xs font-mono font-bold tracking-widest px-3 py-1 rounded-full uppercase bg-violet-500/10 text-violet-400 border border-violet-500/20">
                            {item.type}
                          </span>
                        </div>

                        <div className="flex flex-col items-baseline gap-2 mb-3">
                          <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors duration-300">
                            {item.title}
                          </h4>
                          {item.subtitle && (
                            <span className="mt-1 text-sky-400 font-medium tracking-wide">
                              @ {item.subtitle}
                            </span>
                          )}
                        </div>

                        <p
                          className={`text-zinc-300 text-lg leading-relaxed ${
                            isExpanded ? '' : 'line-clamp-4'
                          }`}
                        >
                          {item.description}
                        </p>
                        {item.description.length > 185 && (
                          <button
                            className="mt-3 text-cyan-400 hover:text-cyan-300 text-sm self-start"
                            onClick={() =>
                              setExpandedAcademic(isExpanded ? null : index)
                            }
                          >
                            {isExpanded ? 'Show less' : 'Read more'}
                          </button>
                        )}
                      </motion.div>
                    </Reveal>
                  </div>
                );
              })}
            </div>

            <div className="flex-1" />
          </div>

          {/* SAĞ SÜTUN - MY JOURNEY TIMELINE */}
          <div className="space-y-12 h-full flex flex-col">
            <Reveal>
              <div className="space-y-2">
                <p className="text-zinc-100 uppercase tracking-[0.3em] text-[1rem] font-mono">
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

            <div
              ref={journeyListRef}
              className="relative ml-2 pl-6 md:pl-10 space-y-10"
            >
              <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-800" />

              <motion.div
                className="absolute left-0 top-0 w-px transition-[background,box-shadow,filter] duration-500"
                style={{
                  height: gatedJourneyHeight,
                  background:
                    journeyBarOpacity === 1
                      ? '#22d3ee'
                      : 'linear-gradient(to bottom, transparent 0%, rgba(94,234,212,0.9) 42%, rgba(45,212,191,0.3) 65%, rgba(63,63,70,0.5) 100%)',
                  filter: journeyBarOpacity === 1 ? 'none' : 'blur(1.5px)',
                  boxShadow:
                    journeyBarOpacity === 1
                      ? '0 0 8px 2px rgba(34,211,238,0.8), 0 0 20px 6px rgba(34,211,238,0.35)'
                      : '0 0 16px 4px rgba(45,212,191,0.35)',
                }}
              />

              <motion.div
                className="absolute left-[-3.5px] w-[8px] h-[8px] rounded-full bg-cyan-400 transition-opacity duration-300"
                style={{
                  top: gatedJourneyHeight,
                  opacity: journeyBarOpacity,
                  boxShadow: '0 0 12px 4px rgba(34,211,238,0.9)',
                }}
              />

              {journeyData.map((item, index) => {
                const { isActive, color } = getPointState(
                  index,
                  journeyActiveIndex,
                );
                const isExpanded = expandedJourney === index;
                const measuredHeight = journeyClosedHeights[index];
                return (
                  <div
                    key={index}
                    ref={(el) => {
                      journeyCardRefs.current[index] = el;
                    }}
                    className="relative group"
                    style={{
                      height: measuredHeight
                        ? `${measuredHeight}px`
                        : undefined,
                      minHeight: measuredHeight
                        ? undefined
                        : FALLBACK_MIN_HEIGHT,
                    }}
                  >
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
                      <motion.div
                        layout
                        transition={CARD_LAYOUT_TRANSITION}
                        ref={(el) => {
                          journeyCardInnerRefs.current[index] = el;
                        }}
                        className="absolute left-0 right-0 top-0 bg-zinc-900/20 backdrop-blur-sm border rounded-2xl p-8 md:p-10 flex flex-col transition-colors duration-300"
                        style={{
                          borderColor: isActive
                            ? `${color.hex}55`
                            : 'rgba(63,63,70,0.4)',
                          zIndex: isExpanded ? 30 : 10,
                          boxShadow: isExpanded
                            ? '0 25px 60px -15px rgba(0,0,0,0.65), 0 0 0 1px rgba(34,211,238,0.15)'
                            : 'none',
                        }}
                      >
                        <div className="flex items-center justify-between mb-2 mt-0 -translate-y-2">
                          <div
                            className="font-sans text-sm font-bold tracking-wider transition-colors duration-300"
                            style={{ color: isActive ? color.hex : '#22d3ee' }}
                          >
                            {item.year}
                          </div>

                          <span
                            className={`text-xs font-mono font-bold tracking-widest px-3 py-1 rounded-full uppercase ${
                              item.type === 'experience'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-violet-500/10 text-violet-400 border border-violet-500/20'
                            }`}
                          >
                            {item.type}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-baseline gap-2 mb-3 pr-24">
                          <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors duration-300">
                            {item.title}
                          </h4>
                          {item.subtitle && (
                            <span className="mt-1 text-sky-400 font-medium tracking-wide">
                              @ {item.subtitle}
                            </span>
                          )}
                        </div>

                        <p
                          className={`text-zinc-300 text-lg leading-relaxed ${
                            isExpanded ? '' : 'line-clamp-4'
                          }`}
                        >
                          {item.description}
                        </p>
                        {item.description.length > 185 && (
                          <button
                            className="mt-3 text-cyan-400 hover:text-cyan-300 text-sm self-start"
                            onClick={() =>
                              setExpandedJourney(isExpanded ? null : index)
                            }
                          >
                            {isExpanded ? 'Show less' : 'Read more'}
                          </button>
                        )}
                      </motion.div>
                    </Reveal>
                  </div>
                );
              })}
            </div>

            <div className="flex-1" />
          </div>
        </div>
      </div>
    </section>
  );
}
