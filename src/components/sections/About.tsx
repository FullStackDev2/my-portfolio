'use client';

import Reveal from '../ui/Reveal';

interface TimelineItem {
  year: string;
  title: string;
  subtitle?: string;
  description: string;
  type: 'experience' | 'education';
}

export default function About() {
  // SOL SÜTUN: ACADEMIC FOUNDATION VERİLERİ
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

  // SAĞ SÜTUN: MY JOURNEY VERİLERİ
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

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center px-6 py-32 relative overflow-hidden border-t border-zinc-800/50 bg-[#020617]"
      style={{
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
      }}
    >
      {/* SİNEMATİK ARKA PLAN IŞIKLARI */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(34,211,238,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(139,92,246,0.04),transparent_45%)]" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
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
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto border-t border-zinc-800/60 pt-24 w-full">
          <Reveal>
            <p className="text-zinc-500 uppercase tracking-[0.4em] text-sm font-mono mb-6">
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
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-start border-t border-zinc-800/60 pt-24">
          {/* SOL SÜTUN - ACADEMIC FOUNDATION TIMELINE */}
          <div className="space-y-12">
            <Reveal>
              <div className="space-y-2">
                <p className="text-zinc-500 uppercase tracking-[0.3em] text-sm font-mono">
                  EDUCATION
                </p>
                <h3 className="text-4xl md:text-5xl font-black tracking-tight text-white">
                  Academic <span className="text-cyan-400">Foundation</span>
                </h3>
              </div>
            </Reveal>

            {/* Sol Zaman Çizgisi */}
            <div className="relative border-l border-zinc-800 ml-2 pl-6 md:pl-10 space-y-10">
              {academicData.map((item, index) => (
                <div key={index} className="relative group">
                  {/* Parlayan Nokta (Yazı büyüdüğü için top-2.5 ile hizası dengelendi) */}
                  <div className="absolute -left-[31px] md:-left-[45px] top-2.5 w-2.5 h-2.5 rounded-full bg-zinc-950 border-2 border-zinc-700 group-hover:border-cyan-400 group-hover:bg-cyan-400 transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(34,211,238,0.8)] z-10" />

                  <Reveal>
                    {/* p-6'dan p-8 md:p-10'a yükseltildi */}
                    <div className="bg-zinc-900/20 backdrop-blur-sm border border-zinc-800/40 rounded-2xl p-8 md:p-10 hover:border-zinc-700/80 hover:bg-zinc-900/40 transition-all duration-300">
                      {/* text-[10px]'den text-xs'e yükseltildi */}
                      <div className="font-mono text-xs font-bold text-cyan-400 tracking-wider mb-2">
                        {item.year}
                      </div>

                      <div className="flex flex-wrap items-baseline gap-2 mb-3">
                        {/* text-lg'den text-xl md:text-2xl'ye yükseltildi */}
                        <h4 className="text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors duration-300">
                          {item.title}
                        </h4>
                        {item.subtitle && (
                          /* text-xs'den text-sm'e yükseltildi */
                          <span className="text-zinc-400 text-sm font-medium ml-1">
                            @ {item.subtitle}
                          </span>
                        )}

                        {/* Rozet etiketi text-[9px]'den text-xs'e yükseltildi */}
                        <span className="ml-auto text-xs font-mono font-bold tracking-widest px-3 py-1 rounded-full uppercase bg-violet-500/10 text-violet-400 border border-violet-500/20">
                          {item.type}
                        </span>
                      </div>

                      {/* Açıklama metni text-sm'den text-base'e yükseltildi */}
                      <p className="text-zinc-400 text-base leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>

          {/* SAĞ SÜTUN - MY JOURNEY TIMELINE */}
          <div className="space-y-12">
            <Reveal>
              <div className="space-y-2">
                <p className="text-zinc-500 uppercase tracking-[0.3em] text-sm font-mono">
                  MILESTONES
                </p>
                <h3 className="text-4xl md:text-5xl font-black tracking-tight text-white">
                  My Journey
                </h3>
              </div>
            </Reveal>

            {/* Sağ Zaman Çizgisi */}
            <div className="relative border-l border-zinc-800 ml-2 pl-6 md:pl-10 space-y-10">
              {journeyData.map((item, index) => (
                <div key={index} className="relative group">
                  {/* Parlayan Nokta */}
                  <div className="absolute -left-[31px] md:-left-[45px] top-2.5 w-2.5 h-2.5 rounded-full bg-zinc-950 border-2 border-zinc-700 group-hover:border-cyan-400 group-hover:bg-cyan-400 transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(34,211,238,0.8)] z-10" />

                  <Reveal>
                    {/* p-6'dan p-8 md:p-10'a yükseltildi */}
                    <div className="bg-zinc-900/20 backdrop-blur-sm border border-zinc-800/40 rounded-2xl p-8 md:p-10 hover:border-zinc-700/80 hover:bg-zinc-900/40 transition-all duration-300">
                      {/* text-xs yapıldı */}
                      <div className="font-mono text-xs font-bold text-cyan-400 tracking-wider mb-2">
                        {item.year}
                      </div>

                      <div className="flex flex-wrap items-baseline gap-2 mb-3">
                        {/* text-xl md:text-2xl yapıldı */}
                        <h4 className="text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors duration-300">
                          {item.title}
                        </h4>
                        {item.subtitle && (
                          /* text-sm yapıldı */
                          <span className="text-zinc-400 text-sm font-medium ml-1">
                            @ {item.subtitle}
                          </span>
                        )}

                        {/* text-xs yapıldı */}
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

                      {/* text-base yapıldı */}
                      <p className="text-zinc-400 text-base leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
