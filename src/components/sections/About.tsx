'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import SectionGlow from '../ui/SectionGlow';
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
        'Kurumsal düzeyde dashboard ve premium SaaS arayüz mimarilerinin geliştirilmesi. Piksel kusursuz teslimat, performance optimizasyonu ve modern bileşen sistemlerinin kurgulanması.Focused on Software Engineering and Distributed Systems. Developed a deep understanding of data structures and algorithm optimization.Focused on Software Engineering and Distributed Systems. Developed a deep understanding of data structures and algorithm optimization.Focused on Software Engineering and Distributed Systems. Developed a deep understanding of data structures and algorithm optimization.Focused on Software Engineering and Distributed Systems. Developed a deep understanding of data structures and algorithm optimization.Focused on Software Engineering and Distributed Systems. Developed a deep understanding of data structures and algorithm optimization.Focused on Software Engineering and Distributed Systems. Developed a deep understanding of data structures and algorithm optimization.',
      type: 'experience',
    },
    {
      year: '2024 — 2026',
      title: 'Frontend Engineer',
      subtitle: 'SaaS Tech Studio',
      description:
        "Kompleks veri görselleştirme araçları ve interaktif analitik panellerinin React/Next.js ile inşası. Sayfa yüklenme hızlarında %40'a varan optimizasyon başarılarsssssssssssssssssssssssss sssssssssssssssssssssssssssssssssssssf.",
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

  // --- MOUSE POZİSYONUNA GÖRE AKTİF SÜTUN ---
  // Artık container'ın üzerine gelmeyi beklemiyoruz — mouse ekranın HERHANGİ
  // bir yerinde olsa bile (köşeler dahil) window genişliğinin ortasına göre
  // hangi yarıda olduğu hesaplanıyor. Bu, "aktif" tarafı belirler.
  // Bu bilgi SADECE barlar ekranda göründüğünde (barsVisible) devreye girer.
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);
  const hoveredSideRef = useRef<'left' | 'right' | null>(null);

  const [barsVisible, setBarsVisible] = useState(false);
  const barsVisibleRef = useRef(false);

  // Global mouse takibi — sectiona/karta girmeye gerek yok, tüm ekranı dinler
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

  // Barlar (timeline grid'i) ekranda görünür mü? — mouse gating SADECE bu
  // true olduğunda uygulanır. Görünmüyorken her iki bar da normal davranır.
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

  // Bir tarafın "açık" (scroll'a göre ilerlemeye devam edebilir) olup
  // olmadığını hesaplayan yardımcı — hem gated motion value'larda hem de
  // opaklıkta kullanılıyor, ikisi de aynı mantıkla tutarlı olsun diye.
  const isSideOpen = (side: 'left' | 'right') =>
    !barsVisibleRef.current ||
    hoveredSideRef.current === null ||
    hoveredSideRef.current === side;

  // Bar/nokta opaklık çarpanları — barlar görünmüyorsa veya mouse henüz
  // hareket etmediyse ikisi de tam parlak. Barlar görününce mouse hangi
  // taraftaysa o taraf parlak kalır, diğeri hem soluklaşır hem de DONAR
  // (aşağıda gated motion value'lar ile).
  const academicBarOpacity =
    !barsVisible || hoveredSide === null || hoveredSide === 'left' ? 1 : 0.3;
  const journeyBarOpacity =
    !barsVisible || hoveredSide === null || hoveredSide === 'right' ? 1 : 0.3;

  // İki sütun için ayrı ayrı "hangi kart açık" state'i (birbirinden bağımsız)
  const [expandedAcademic, setExpandedAcademic] = useState<number | null>(null);
  const [expandedJourney, setExpandedJourney] = useState<number | null>(null);

  // --- PİKSEL BAZLI ORTAK YÜKSEKLİK ---
  const academicListRef = useRef<HTMLDivElement>(null);
  const journeyListRef = useRef<HTMLDivElement>(null);
  const [academicHeight, setAcademicHeight] = useState(0);
  const [journeyHeight, setJourneyHeight] = useState(0);

  // Slot (yer tutucu) referansları — timeline breakpoint'leri (offsetTop) için
  const academicCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const journeyCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [academicBreakpoints, setAcademicBreakpoints] = useState<number[]>([]);
  const [journeyBreakpoints, setJourneyBreakpoints] = useState<number[]>([]);

  // ASIL KART (motion.div) referansları — gerçek KAPALI yüksekliği ölçmek için
  const academicCardInnerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const journeyCardInnerRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Her kartın "kapalı" haldeki gerçek piksel yüksekliği (border-box, padding
  // DAHİL). Slot'un height'ı BUNA göre ayarlanıyor — sabit 260px değil.
  // Kart açıkken bu değer GÜNCELLENMİYOR (donduruluyor), böylece slot
  // büyümüyor ve açılan kart alttaki kartların üzerine biniyor, onları itmiyor.
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
        if (expandedAcademic === index) return; // açıkken slot'u büyütme
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

  // GATED (kapılı) motion value'lar — bar'ların GERÇEKTEN render'da kullandığı
  // değerler bunlar. Ham academicLineHeight/journeyLineHeight scroll'a göre
  // sürekli hesaplanmaya devam eder, ama ilgili taraf "kapalıysa" (mouse
  // diğer taraftaysa ve barlar görünürdeyse) bu gated değere YAZILMAZ —
  // yani çizgi ve nokta o anki konumunda donar, kıpırdamaz bile.
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

  // Nokta renklerinin de (yan taraftaki küçük daireler) donmuş bar ile
  // TUTARLI kalması için index hesaplamasını GATED değerden yapıyoruz —
  // gated değer donduğunda bu index de otomatik olarak donar.
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
            top: '50%',
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
                // Slot'un height'ı: ölçülmüş kapalı yükseklik varsa ONU
                // kullan; henüz ölçülmediyse (ilk frame) sadece geçici bir
                // minimum yükseklik göster.
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
