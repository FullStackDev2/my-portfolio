'use client';

import Reveal from '../ui/Reveal';
import { motion, type Variants } from 'framer-motion';
import { useEffect, useRef } from 'react';

// ================= TYPESCRIPT TIP TANIMLAMALARI =================
interface Skill {
  name: string;
  icon: string;
}

interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
  glowClass: string;
  arrowColor: string;
}

function MatrixRain({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const fontSize = 14;
    const characters = '01';
    const charArray = characters.split('');

    let width = 0;
    let height = 0;
    let drops: number[] = [];
    let animationId = 0;
    let lastFrameTime = Date.now();
    const frameRate = 20;

    const resize = () => {
      width = canvas.width = parent.clientWidth;
      height = canvas.height = parent.clientHeight;
      const columns = Math.floor(width / (fontSize * 0.6));
      drops = Array.from(
        { length: columns },
        () => Math.random() * (height / fontSize),
      );
    };

    const draw = () => {
      ctx.fillStyle = 'rgba(4, 8, 23, 0.15)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px monospace`;
      ctx.fillStyle = 'rgba(0,255,120,0.75)';

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.93) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const animate = () => {
      const now = Date.now();
      if (now - lastFrameTime > 1000 / frameRate) {
        draw();
        lastFrameTime = now;
      }
      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(parent);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}

const skillCategories: SkillCategory[] = [
  {
    id: 'frontend-architecture',
    title: 'Frontend Architecture',
    description:
      'Building pixel-perfect, hyper-performing user interfaces with modern reactive paradigms.',
    skills: [
      {
        name: 'React',
        icon: 'fa-brands fa-react text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]',
      },
      {
        name: 'Next.js',
        icon: 'fa-solid fa-cube text-zinc-300 drop-shadow-[0_0_8px_rgba(212,212,216,0.6)]',
      },
      {
        name: 'TypeScript',
        icon: 'fa-solid fa-code text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]',
      },
      {
        name: 'Tailwind CSS',
        icon: 'fa-solid fa-wind text-teal-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.8)]',
      },
      {
        name: 'Framer Motion',
        icon: 'fa-solid fa-wand-magic-sparkles text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]',
      },
    ],
    glowClass:
      'hover:bg-gradient-to-b hover:from-cyan-500/[0.02] hover:to-transparent',
    arrowColor: 'group-hover:text-cyan-400',
  },
  {
    id: 'Backend & Database',
    title: 'Backend & Database',
    description:
      'Designing scalable, secure and robust system logic alongside optimized data structures.',
    skills: [
      { name: 'Node.js', icon: 'fa-brands fa-node-js text-emerald-400' },
      { name: 'Express', icon: 'fa-solid fa-server text-zinc-400' },
      { name: 'MongoDB', icon: 'fa-solid fa-database text-green-500' },
      { name: 'REST API', icon: 'fa-solid fa-cloud text-sky-400' },
      { name: 'JWT', icon: 'fa-solid fa-key text-amber-400' },
    ],
    glowClass:
      'hover:bg-gradient-to-b hover:from-purple-500/[0.02] hover:to-transparent',
    arrowColor: 'group-hover:text-purple-400',
  },
  {
    id: 'DevOps & Workflow',
    title: 'DevOps & Workflow',
    description:
      'Version control, automated cloud infrastructure and fluid deployment pipelines.',
    skills: [
      { name: 'Git', icon: 'fa-brands fa-git-alt text-orange-500' },
      { name: 'GitHub', icon: 'fa-brands fa-github text-white' },
      { name: 'CI/CD', icon: 'fa-solid fa-gears text-indigo-400' },
      { name: 'Vercel', icon: 'fa-solid fa-caret-up text-white shadow-lg' },
      { name: 'Linux', icon: 'fa-brands fa-linux text-yellow-500' },
    ],
    glowClass:
      'hover:bg-gradient-to-b hover:from-emerald-500/[0.02] hover:to-transparent',
    arrowColor: 'group-hover:text-emerald-400',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 130, damping: 17 },
  },
};

export default function Skills() {
  const skills = [
    ['React', 85],
    ['Next.js', 75],
    ['TypeScript', 70],
    ['Tailwind CSS', 88],
    ['Node.js', 80],
    ['Express', 82],
    ['MongoDB', 80],
    ['Git & GitHub', 98],
    ['Docker', 65],
    ['Vercel', 92],
    ['Linux', 45],
  ];

  return (
    <section
      id="skills"
      className="min-h-screen px-6 pt-12 pb-32 flex flex-col justify-center relative overflow-hidden scroll-mt-20"
      style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
    >
      {/* SINEMATIK ARKA PLAN ISIKLARI */}
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

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-60 top-20 w-[700px] h-[700px] rounded-full bg-cyan-500/10 blur-[180px]" />
        <div className="absolute -right-60 bottom-0 w-[800px] h-[800px] rounded-full bg-purple-500/10 blur-[220px]" />
        <div className="absolute left-1/2 top-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[160px] -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Arka Plan Matris Izgarası */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* ÜST BAŞLIK ALANI */}
        <div className="mb-12 border-b border-zinc-900 pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <Reveal>
              <p className="text-zinc-200 uppercase tracking-[0.4em] mb-2 text-sm font-mono">
                TECHNICAL STACK
              </p>
            </Reveal>
            <Reveal>
              <h2 className="text-5xl md:text-6xl font-black tracking-tight uppercase">
                <span className="text-cyan-400">DEVELOPMENT</span>{' '}
                <span className="text-white">STACK</span>
              </h2>
            </Reveal>
          </div>
          <Reveal>
            <p className="text-zinc-500 font-mono text-sm max-w-sm md:text-right">
              Premium tools and modular frameworks built for absolute scale.
            </p>
          </Reveal>
        </div>

        {/* ================= 1. ÜST BAĞLANTI (CORE - ÇİZGİNİN EN UCU / BAŞLANGICI) ================= */}
        <div className="hidden md:flex flex-col items-center w-full">
          <div className="px-8 py-3 rounded-xl border border-cyan-500/30 bg-[#040817] shadow-[0_0_20px_rgba(34,211,238,0.15)] text-white font-mono tracking-wider z-20">
            ARCHITECTURE
          </div>

          {/* Butondan çıkıp aşağıdaki köprüye kadar uzanan tek ve kesintisiz dikey hat */}
          <div className="w-[6px] h-16 bg-gradient-to-r from-slate-400/50 via-slate-300/65 to-slate-400/50" />
        </div>

        {/* ================= 2. BİRLEŞİK RESPONSIVE KÖPRÜ SİSTEMİ (ÜSTÜN DAĞILIMI) ================= */}
        <div className="hidden md:grid grid-cols-3 gap-0 w-full h-12 relative -mb-px">
          {/* Sol Kol Hattı */}
          <div className="relative w-full h-full">
            <div className="absolute right-0 top-0 w-1/2 h-[6px] bg-gradient-to-b from-slate-400/50 via-slate-300/65 to-slate-400/50" />
            <div className="absolute left-1/2 top-0 bottom-0 w-[6px] -translate-x-1/2 bg-gradient-to-r from-slate-400/50 via-slate-300/65 to-slate-400/50" />
          </div>

          {/* Orta Kol Hattı */}
          <div className="relative w-full h-full">
            <div className="absolute left-0 right-0 top-0 h-[6px] bg-gradient-to-b from-slate-400/50 via-slate-300/65 to-slate-400/50" />
            <div className="absolute left-1/2 top-0 bottom-0 w-[6px] -translate-x-1/2 bg-gradient-to-r from-slate-400/50 via-slate-300/65 to-slate-400/50" />
          </div>

          {/* Sağ Kol Hattı */}
          <div className="relative w-full h-full">
            <div className="absolute left-0 top-0 w-1/2 h-[6px] bg-gradient-to-b from-slate-400/50 via-slate-300/65 to-slate-400/50" />
            <div className="absolute left-1/2 top-0 bottom-0 w-[6px] -translate-x-1/2 bg-gradient-to-r from-slate-400/50 via-slate-300/65 to-slate-400/50" />
          </div>
        </div>

        {/* 3 SÜTUNLU KART DÜZENİ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start relative mt-0">
          {skillCategories.map((category: SkillCategory, idx: number) => (
            <div
              key={category.id}
              className="flex flex-col items-center group w-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="w-full relative"
              >
                {/* Kart içeriği */}
                <div className="relative z-10 w-full h-full rounded-[23px] bg-[#020617] p-6 md:p-6 flex flex-col justify-between min-h-[430px]">
                  <div className="flex flex-col items-center text-center">
                    {/* Büyütülmüş ve Parlayan İkon Bölümü */}
                    <div className="mb-6 p-5 rounded-3xl bg-white/[0.03] border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.05)] text-cyan-400">
                      {category.id === 'frontend-architecture' && (
                        <i className="fa-solid fa-code text-4xl" />
                      )}
                      {category.id === 'Backend & Database' && (
                        <i className="fa-solid fa-database text-4xl" />
                      )}
                      {category.id === 'DevOps & Workflow' && (
                        <i className="fa-solid fa-infinity text-4xl" />
                      )}
                    </div>
                  </div>

                  {/* Başlık Bölümü (Ortalanmış ve Çizgili) */}
                  <div className="flex flex-col items-center text-center">
                    <h3 className="text-xl md:text-2xl font-black tracking-tight text-white mb-3">
                      {category.title}
                    </h3>
                    <div className="w-66 h-[3px] bg-gradient-to-r from-transparent via-zinc-400 to-transparent mb-6" />

                    <p className="text-sm font-medium text-zinc-300 leading-relaxed mb-6 bg-gradient-to-r from-zinc-300 via-white to-zinc-400 bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(255,255,255,0.2)]">
                      {category.description}
                    </p>
                  </div>

                  {/* Beceri Grid'i */}
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-900"
                  >
                    {category.skills.map((skill: Skill) => (
                      <motion.div
                        key={skill.name}
                        variants={itemVariants}
                        whileHover={{ scale: 1.03, y: -1 }}
                        className="relative w-full p-[1px] rounded-xl transition-all duration-500 cursor-default group/skill shadow-[0_0_8px_rgba(34,211,238,0.04)] hover:shadow-[0_0_12px_rgba(34,211,238,0.08)]"
                      >
                        <div className="w-full h-full py-2.5 px-3 rounded-[11px] bg-zinc-900/20 backdrop-blur-sm border border-zinc-800/70 flex items-center text-sm font-mono text-zinc-400 transition-all duration-300 group-hover/skill:bg-white/[0.03] group-hover/skill:border-blue-500/50 group-hover/skill:backdrop-blur-xl group-hover/skill:shadow-[0_0_25px_rgba(59,130,246,0.18)] group-hover/skill:text-white">
                          <i
                            className={`${skill.icon} text-base mr-2.5 w-5 text-center flex-shrink-0`}
                          />
                          <span className="truncate">{skill.name}</span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* ALT NEON BORDER */}
                <div
                  className={`
absolute
left-1/2
-bottom-[2px]
-translate-x-1/2
w-[94%]
h-[6px]
rounded-full
${
  category.id === 'frontend-architecture'
    ? 'bg-cyan-400'
    : category.id === 'Backend & Database'
      ? 'bg-blue-500'
      : 'bg-fuchsia-500'
}
`}
                />

                {/* Glow 1 */}
                <div
                  className={`
absolute
left-1/2
-bottom-[4px]
-translate-x-1/2
w-[90%]
h-8
blur-2xl
rounded-full
${
  category.id === 'frontend-architecture'
    ? 'bg-cyan-400/40'
    : category.id === 'Backend & Database'
      ? 'bg-blue-500/40'
      : 'bg-fuchsia-500/40'
}
`}
                />

                {/* Glow 2 */}
                <div
                  className={`
absolute
left-1/2
-bottom-[-16px]
-translate-x-1/2
w-[70%]
h-12
blur-[50px]
rounded-full
opacity-90
${
  category.id === 'frontend-architecture'
    ? 'bg-cyan-500/30'
    : category.id === 'Backend & Database'
      ? 'bg-blue-500/30'
      : 'bg-fuchsia-500/30'
}
`}
                />
              </motion.div>
            </div>
          ))}
        </div>

        {/* ================= 3. ORTA DÜĞÜM ÇİZGİSİ (KARTLARDAN SKILLS & TOOLS'A) ================= */}
        <div className="hidden md:flex justify-center w-full mt-0">
          <div className="w-[6px] h-12 bg-gradient-to-b from-slate-400/50 via-slate-300/65 to-slate-400/50" />
        </div>

        {/* ================= 4. AI & TOOLS DÜĞÜMÜ (TERMINAL'E BAĞLANAN ARA DURAK) ================= */}
        <div className="hidden md:flex flex-col items-center w-full">
          <div className="px-8 py-3 rounded-xl border border-purple-500/30 bg-[#040817] shadow-[0_0_20px_rgba(139,92,246,0.15)] text-white font-mono tracking-wider z-20">
            SYSTEM CORE
          </div>

          {/* Düğümden terminale kadar uzanan dikey hat */}
          <div className="w-[6px] h-16 bg-gradient-to-r from-slate-400/50 via-slate-300/65 to-slate-400/50" />
        </div>
      </div>

      {/* TERMINAL */}
      <div className="w-full flex justify-center mt-0">
        <div
          className="
      w-full
      max-w-[86rem]
      rounded-3xl
      overflow-hidden
      bg-[#040817]/70
      backdrop-blur-xl
      border border-cyan-500/20
      shadow-[0_0_80px_rgba(34,211,238,.08)]
    "
        >
          {/* HEADER */}
          <div className="h-10 px-5 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />

              <span className="ml-4 font-mono text-xs text-emerald-400">
                developer@nd:~/portfolio/skills $
              </span>
            </div>

            <span className="font-mono text-[12px]  tracking-[0.35em] text-purple-400">
              TERMINAL
            </span>
          </div>

          <div className="grid grid-cols-[1.5fr_1px_1fr] min-h-[220px]">
            {/* ===================== SOL ===================== */}

            <div
              className="
          relative
          p-5
          font-mono
          bg-[linear-gradient(transparent_95%,rgba(255,255,255,.02)_100%)]
          bg-[length:100%_24px]
        "
            >
              <p className="text-cyan-400 text-sm">$ npm run skills</p>

              <p className="text-zinc-500 text-xs mt-1">
                Starting developer environment...
              </p>

              <div className="mt-4 space-y-1.5">
                {skills.map(([name, percent]) => (
                  <div key={String(name)} className="flex items-center text-sm">
                    <span className="mr-3 text-green-400">✔</span>

                    <span className="w-[110px] text-zinc-100">{name}</span>

                    <div className="flex-1 border-b border-dotted border-cyan-500/20 mx-3" />

                    <span className="ml-auto text-cyan-300 font-semibold tabular-nums">
                      {percent}%
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-3 space-y-1">
                <p className="text-green-400 text-xs">
                  ✔ Build completed successfully.
                </p>

                <p className="text-cyan-400 text-xs">
                  Ready for deployment
                  <span className="animate-pulse text-white"> █</span>
                </p>
              </div>
            </div>

            {/* ===================== ORTA ===================== */}

            <div className="relative w-px bg-white/5">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent" />

              <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-cyan-400/20" />

              <div
                className="
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            w-8
            h-24
            rounded-full
            bg-cyan-400/25
            blur-2xl
          "
              />
            </div>

            {/* ===================== SAĞ ===================== */}

            <div className="relative overflow-hidden">
              {/* Glow */}
              <div
                className="
            absolute
            right-10
            top-1/2
            -translate-y-1/2
            w-40
            h-40
            rounded-full
            bg-cyan-500/10
            blur-[100px]
          "
              />

              {/* Matrix */}
              <div
                className="absolute inset-0"
                style={{
                  maskImage:
                    'radial-gradient(ellipse 90% 70% at center, black 35%, transparent 85%)',
                  WebkitMaskImage:
                    'radial-gradient(ellipse 90% 70% at center, black 35%, transparent 85%)',
                }}
              >
                <MatrixRain className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* TERMINAL SONU */}
    </section>
  );
}
