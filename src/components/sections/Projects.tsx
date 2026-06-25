'use client';

import { useState } from 'react';
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants: Variants = {
  hidden: { scale: 0.5, opacity: 0, y: 40 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 140, damping: 18 },
  },
  exit: { scale: 0.85, opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const additionalProjects = [
  {
    slug: 'nexus-analytics',
    title: 'Nexus AI Analytics',
    description:
      'Real-time predictive data pipelines and autonomous financial trend analysis dashboards wrapped in a professional UI.',
    image: '',
    tech: ['Python', 'FastAPI', 'PostgreSQL'],
  },
  {
    slug: 'aether-saas',
    title: 'Aether Cloud Engine',
    description:
      'Next-generation decentralized serverless orchestration platform with sub-millisecond edge deployments.',
    image: '',
    tech: ['TypeScript', 'Docker', 'Kubernetes'],
  },
  {
    slug: 'vortex-crypto',
    title: 'Vortex Protocol',
    description:
      'High-frequency institutional crypto liquidity aggregator and smart-contract yield optimization engine.',
    image: '',
    tech: ['Solidity', 'Web3.js', 'GraphQL'],
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof importedProjects)[0] | null
  >(null);
  const [showAll, setShowAll] = useState(false);

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

  const combinedProjects = [...importedProjects, ...additionalProjects];
  const visibleProjects = showAll
    ? combinedProjects
    : combinedProjects.slice(0, 6);

  return (
    <section
      id="projects"
      className="min-h-screen px-6 py-32 flex flex-col select-none text-white relative overflow-hidden border-t border-zinc-800/50 bg-[#020617] scroll-mt-20"
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

      <div className="max-w-6xl mx-auto w-full space-y-16 relative z-10">
        {/* BASLIK ALANI */}
        <div>
          <p className="text-cyan-500 tracking-[0.3em] uppercase mb-4 text-xs font-semibold font-mono">
            {'// LATEST WORK // PROJECTS'}
          </p>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight bg-clip-text bg-gradient-to-b from-white to-white/50">
            Projects I’ve Built
          </h2>
        </div>

        {/* SOL ISTATISTIK PANELİ DÖNGÜSÜ */}
        {/* Kartlar genişlediği için ana taşıyıcıyı -left-72 yaptık */}
        <div className="hidden xl:flex flex-col gap-4 absolute -left-72 top-92">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="w-64 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-xl p-4 flex items-center gap-4 group hover:border-blue-500/30 transition-colors duration-300"
            >
              {/* İkon Kutusu (shrink-0 ile yazı uzun olsa bile ikonun büzülmesini engelledik) */}
              <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.18)] shrink-0">
                <Image
                  src={item.iconPath}
                  alt={item.label}
                  width={40}
                  height={40}
                  className="w-12 h-12 object-contain"
                />
              </div>

              {/* Yazı Kutusu (Kendi içinde alt alta durmaları için flex-col yaptık) */}
              <div className="flex flex-col justify-center">
                <div className="text-white text-2xl font-bold tracking-tight leading-none">
                  {item.value}
                </div>
                <div className="text-zinc-400 text-xs mt-1.5 font-medium leading-tight group-hover:text-zinc-300 transition-colors duration-300">
                  {item.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* PROJE KARTLARININ BULUNDUGU GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
          className="grid lg:grid-cols-3 md:grid-cols-2 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.18 },
                }}
                onClick={() => setSelectedProject(project)}
                className="relative cursor-pointer rounded-2xl bg-zinc-900/10 border border-zinc-800/20 overflow-hidden group will-change-transform shadow-2xl shadow-black/80 flex flex-col h-[420px] justify-end backdrop-blur-sm transition-all duration-500 hover:bg-zinc-900/30"
              >
                {/* Resim Katmani & Fallback */}
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-zinc-950 to-zinc-900">
                  {project.image ? (
                    <>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-w-768px) 100vw, 33vw"
                        priority={i < 3}
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent opacity-90 group-hover:opacity-85 transition-opacity duration-500" />
                    </>
                  ) : (
                    <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
                      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/[0.03] via-transparent to-purple-500/[0.03]" />
                    </div>
                  )}
                </div>

                {/* Premium Capraz Cam Pariltisi */}
                <div className="absolute inset-0 w-[200%] h-full z-20 pointer-events-none bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -skew-x-12 -translate-x-[150%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />

                {/* Icerik Bloku */}
                <div className="relative z-10 p-6 flex flex-col justify-end h-full w-full bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 flex items-center justify-center shrink-0 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                      {getProjectIcon(project.slug)}
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-zinc-400 group-hover:text-zinc-300 text-xs line-clamp-2 leading-relaxed mb-5 opacity-90 transition-all duration-500">
                    {project.description}
                  </p>

                  <div className="flex justify-between items-center pt-4 border-t border-zinc-800/60 w-full">
                    <div className="flex flex-wrap gap-2">
                      {project.tech?.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-cyan-500/5 border border-cyan-500/10 text-cyan-400 text-[10px] font-medium tracking-wide"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="text-zinc-400 group-hover:text-cyan-400 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ease-out shrink-0">
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

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
                <div className="absolute inset-0 shadow-[0_0_120px_rgba(34,211,238,.08)] opacity-0 group-hover:opacity-100 transition duration-700" />
                <div className="absolute inset-0 rounded-2xl pointer-events-none z-30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] transition-all duration-500 group-hover:shadow-[0_0_40px_-15px_rgba(34,211,238,0.2)]" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More / Less Butonu */}
        {combinedProjects.length > 6 && (
          <motion.div layout className="flex justify-center pt-2">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 rounded-full border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800/60 backdrop-blur-md font-medium text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-all duration-300 shadow-xl font-mono"
            >
              {showAll ? '// View Less' : '// View More'}
            </button>
          </motion.div>
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
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent blur-sm" />
      </AnimatePresence>
    </section>
  );
}
