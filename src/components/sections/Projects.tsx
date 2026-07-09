'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import ProjectModal from '@/components/ui/ProjectModal';
import { projects as importedProjects } from '@/data/projects';

// Proje tiplerine göre ikon eslestirmesi
const getProjectIcon = (slug: string) => {
  switch (slug) {
    case 'saas-dashboard':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 3v16.5M21 19.5H3.75M6.75 12v4.5m4.5-6v6m4.5-9v9M21 7.5V12"
          />
        </svg>
      );
    case 'e-commerce-admin':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
      );
    case 'ai-platform':
    case 'nexus-analytics':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.828a2.25 2.25 0 1 0 3.935-2.186 2.25 2.25 0 0 0-3.935 2.186Z"
          />
        </svg>
      );
    case 'aether-saas':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a9.004 9.004 0 0 1 8.716 6.747M12 3a9.004 9.004 0 0 0-8.716 6.747"
          />
        </svg>
      );
    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
          />
        </svg>
      );
  }
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
    y: 80,
    filter: 'blur(8px)',
  },

  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 180,
      damping: 18,
      mass: 0.7,
      delay: 0.08,
    },
  },

  exit: {
    opacity: 0,
    scale: 0.9,
    y: 30,
    transition: {
      duration: 0.2,
    },
  },
};

const PAGE_SIZE = 6;

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<(typeof importedProjects)[0] | null>(null);
  const [page, setPage] = useState(0);

  // STATS DIZISI - Inline SVG entegrasyonu tamamlandı
  const stats = [
    {
      iconPath: '/icons/rocket.svg',
      value: '5+',
      label: 'Projects Completed',
    },
    {
      iconPath: '/icons/trophy.svg',
      value: '1+',
      label: 'Years Experience',
    },
    {
      iconPath: '/icons/code_blanket.svg',
      value: '10+',
      label: 'Technologies',
    },
    {
      iconPath: '/icons/responsive.svg',
      value: '100%',
      label: 'Responsive Design',
    },
  ];

  const preloadImage = (src: string) => {
    const img = new window.Image();
    img.src = src;
  };

  const visibleProjects = useMemo(() => importedProjects.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE), [page]);

  const totalPages = Math.ceil(importedProjects.length / PAGE_SIZE);

  // Sayfa değiştirme (baştan/sondan sarmalı - wrap around)
  const goToPage = useCallback(
    (index: number) => {
      setPage(() => {
        if (index < 0) return totalPages - 1;
        if (index >= totalPages) return 0;
        return index;
      });
    },
    [totalPages]
  );

  // Klavye ok tuşları ile sayfa geçişi
  useEffect(() => {
    if (totalPages <= 1) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToPage(page + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPage(page - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [page, totalPages, goToPage]);

  return (
    <section
      id="projects"
      className="min-h-screen px-6 py-20 flex flex-col select-none text-white relative overflow-hidden border-t border-zinc-800/50 bg-[#020617] scroll-mt-20"
      style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
    >
      {/* SINEMATIK ARKA PLAN ISIKLARI */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(34,211,238,0.04),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(139,92,246,0.03),transparent_45%)]" />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-60 top-20 w-[700px] h-[700px] rounded-full bg-cyan-500/10 blur-[180px] [transform:translateZ(0)] will-change-transform" />
        <div className="absolute -right-60 bottom-0 w-[800px] h-[800px] rounded-full bg-purple-500/10 blur-[220px] [transform:translateZ(0)] will-change-transform" />
        <div className="absolute left-1/2 top-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[160px] -translate-x-1/2 -translate-y-1/2 [transform:translateZ(0)] will-change-transform" />
      </div>

      <div className="max-w-6xl mx-auto w-full space-y-16 relative z-10">
        {/* BASLIK ALANI */}
        <div className="relative px-8 py-16 md:py-12">
          {/* Sol üst - dizin yolu */}
          <span className="absolute top-0 -translate-x-16 text-emerald-400 font-bold text-lg md:text-xl">
            ~/portfolio
          </span>

          {/* Sağ üst - yorum satırı */}
          <span className="absolute top-0 right-8 text-cyan-700 font-bold text-base md:text-lg">
            {'// portfolio.projects'}
          </span>

          <p className="text-emerald-400 font-bold text-lg md:text-xl -translate-x-15 mb-6 text-left">
            $ const projects = [
          </p>

          <div className="text-center">
            <h2
              className="text-[3.5rem] md:text-[5.8rem] font-black tracking-tight text-transparent bg-clip-text leading-normal"
              style={{
                backgroundImage:
                  'linear-gradient(88deg,  #71B2FF 2%, #22C55E 36%, #7E8FFF 35.5%, #B46BFF 41%, #F46D9C 65%, #FF9562 69%, #FFD66B 81%)',
              }}
            >
              Projects I&#39;ve Built
            </h2>

            <p className="text-zinc-300 text-lg md:text-xl mt-4">
              Full-stack projects, AI tools and
              <br />
              modern web experiences.
            </p>
          </div>

          <p className="text-emerald-400 font-bold text-[22px] md:text-[22px] mt-10 -mb-20 text-right pr-8 translate-x-7">
            ]
          </p>
        </div>

        <div className="relative">
          {/* SOL ISTATISTIK PANELİ DÖNGÜSÜ - artık kartların ortasına göre ortalanıyor */}
          <div className="hidden xl:flex flex-col gap-4 absolute -left-80 top-1/2 -translate-y-1/2">
            {stats.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="w-64 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-xl p-4 flex items-center gap-4 group hover:border-blue-500/30 transition-colors duration-300"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-colors duration-300 shadow-[0_0_20px_rgba(59,130,246,0.18)] shrink-0">
                  <Image
                    src={item.iconPath}
                    alt={item.label}
                    width={40}
                    height={40}
                    className="w-12 h-12 object-contain"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <div className="text-white text-2xl font-bold tracking-tight leading-none">{item.value}</div>
                  <div className="text-zinc-400 text-xs mt-1.5 font-medium leading-tight group-hover:text-zinc-300 transition-colors duration-300">
                    {item.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* PROJE KARTLARININ BULUNDUGU GRID - sayfa değişince yeniden animasyonlanır */}
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              exit="hidden"
              className="grid lg:grid-cols-3 md:grid-cols-2 gap-10 min-h-[800px] items-start"
            >
              {visibleProjects.map((project, i) => {
                const getTheme = (index: number) => {
                  switch (index % 3) {
                    case 0:
                      return {
                        bg: 'bg-zinc-900/40',
                        border: 'border-zinc-400/70',
                        glow: 'from-cyan-500/10',
                        icon: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
                        tag: 'bg-cyan-500/5 border-cyan-500/10 text-cyan-400',
                        cardBorder: 'border-cyan-500/30 hover:border-cyan-400/60',
                        neonShadow:
                          'shadow-[0_0_30px_-8px_rgba(34,211,238,.32)] hover:shadow-[0_0_60px_-4px_rgba(34,211,238,.52)]',
                      };
                    case 1:
                      return {
                        bg: 'bg-purple-950/40',
                        border: 'border-white/25',
                        glow: 'from-purple-500/15',
                        icon: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
                        tag: 'bg-purple-500/5 border-purple-500/10 text-purple-400',
                        cardBorder: 'border-purple-500/30 hover:border-purple-400/60',
                        neonShadow:
                          'shadow-[0_0_30px_-8px_rgba(168,85,247,.32)] hover:shadow-[0_0_60px_-4px_rgba(168,85,247,.52)]',
                      };
                    case 2:
                      return {
                        bg: 'bg-amber-950/30',
                        border: 'border-amber-500/25',
                        glow: 'from-amber-500/15',
                        icon: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
                        tag: 'bg-amber-500/9 border-amber-500/10 text-amber-400',
                        cardBorder: 'border-amber-500/30 hover:border-amber-400/60',
                        neonShadow:
                          'shadow-[0_0_30px_-8px_rgba(245,158,11,.32)] hover:shadow-[0_0_60px_-4px_rgba(245,158,11,.52)]',
                      };
                  }
                };
                const theme = getTheme(i)!;

                return (
                  <motion.div
                    key={project.slug}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                      once: true,
                      amount: 0.25,
                    }}
                    whileHover={{
                      y: -10,
                      scale: 1.02,
                      transition: { type: 'spring', stiffness: 300, damping: 20 },
                    }}
                    onMouseEnter={() => {
                      preloadImage(project.image);

                      project.images?.forEach((img) => {
                        preloadImage(img);
                      });
                    }}
                    onClick={() => setSelectedProject(project)}
                    className={`
relative h-[420px]
overflow-hidden
rounded-2xl
border-2
group
cursor-pointer
transition-shadow
duration-500
${theme.bg}
${theme.cardBorder}
${theme.neonShadow}
`}
                  >
                    <div className="absolute inset-0">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          priority={i < 3}
                          sizes="(max-width:768px) 100vw, 33vw"
                          placeholder="blur"
                          blurDataURL="data:image/png;base64,iVBORw0KGgo..." // küçük bir blur base64
                          className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-zinc-900" />
                      )}

                      {/* hafif üst karartma */}
                      <div className="absolute inset-0 bg-black/20" />

                      {/* içerik okunması için */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/45 to-transparent" />

                      {/* glow */}
                      <div className={`absolute inset-0 bg-gradient-to-tr ${theme.glow} opacity-60`} />
                    </div>

                    {/* IN DEVELOPMENT BADGE */}
                    {!project.projectUrl && (
                      <div className="absolute top-4 right-4 z-40">
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/80 text-emerald-500 text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur-md">
                          Work In Progress
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`w-10 h-10 flex items-center justify-center shrink-0 rounded-xl border shadow-[0_0_15px_rgba(0,0,0,0.1)] ${theme.icon}`}
                        >
                          {getProjectIcon(project.slug)}
                        </div>
                        <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-white/90 transition-colors duration-300">
                          {project.title}
                        </h3>
                      </div>

                      <p className="text-white/75 text-sm leading-relaxed line-clamp-2 mb-5 group-hover:text-zinc-200 opacity-90 transition-colors duration-100">
                        {project.shortDescription}
                      </p>

                      <div className={`flex justify-between items-center pt-4 border-t ${theme.border} w-full`}>
                        <div className="flex flex-wrap gap-2">
                          {project.tech?.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className={`px-2.5 py-1 rounded-md border text-[10px] font-medium tracking-wide ${theme.tag}`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="text-zinc-500 group-hover:text-white transition-colors duration-300 shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Sayfalama Noktaları (Pagination Dots) */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-5 pt-2">
            <button
              onClick={() => goToPage(page - 1)}
              aria-label="previous page"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5 transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>

            <div className="flex items-center gap-3">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  aria-label={`${index + 1}. sayfaya git`}
                  aria-current={page === index}
                  className={`rounded-full transition-[width,background-color] duration-300 ${
                    page === index ? 'w-8 h-2.5 bg-white' : 'w-2.5 h-2.5 bg-white/25 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => goToPage(page + 1)}
              aria-label="next page"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5 transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {selectedProject && (
          <ProjectModal
            key={selectedProject.title || 'active-project-modal'}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent blur-sm" />
    </section>
  );
}
