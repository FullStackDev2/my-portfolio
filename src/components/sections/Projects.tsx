'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import ProjectModal from '@/components/ui/ProjectModal';
import { projects as importedProjects } from '@/data/projects';

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

// DÜZELTME: Orijinal veri tipine uyması için tech array'leri eklendi
const additionalProjects = [
  {
    slug: 'nexus-analytics',
    title: 'Nexus AI Analytics',
    description:
      'Real-time predictive data pipelines and autonomous financial trend analysis dashboards wrapped in a brutalist interface.',
    image: '',
    tech: ['Next.js', 'TypeScript', 'TailwindCSS', 'Python'],
  },
  {
    slug: 'aether-saas',
    title: 'Aether Cloud Engine',
    description:
      'Next-generation decentralized serverless orchestration platform with sub-millisecond edge compute replication.',
    image: '',
    tech: ['React', 'Node.js', 'Docker', 'AWS'],
  },
  {
    slug: 'vortex-crypto',
    title: 'Vortex Protocol',
    description:
      'High-frequency institutional crypto liquidity aggregator and smart-contract yield optimization suite.',
    image: '',
    tech: ['Next.js', 'Solidity', 'Ethers.js', 'GraphQL'],
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof importedProjects)[0] | null
  >(null);
  const [showAll, setShowAll] = useState(false);

  const combinedProjects = [...importedProjects, ...additionalProjects];
  const visibleProjects = showAll
    ? combinedProjects
    : combinedProjects.slice(0, 6);

  return (
    <section
      id="projects"
      className="min-h-screen px-6 py-32 flex flex-col select-none text-white relative overflow-hidden border-t border-zinc-800/50 bg-[#020617]"
      style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
    >
      {/* SİNEMATİK ARKA PLAN IŞIKLARI */}
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

      <div className="max-w-6xl mx-auto w-full space-y-16 relative z-10">
        <div>
          <p className="text-cyan-500 tracking-[0.3em] uppercase mb-4 text-xs font-semibold font-mono">
            {'// LATEST WORK // PROJECTS'}
          </p>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight bg-clip-text bg-gradient-to-b from-white to-white/50">
            Projects I’ve Built
          </h2>
        </div>

        {/* Akışkan Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.12, ease: 'easeOut' },
                }}
                onClick={() => setSelectedProject(project)}
                className="relative cursor-pointer rounded-2xl bg-zinc-900/10 border border-zinc-800/20 overflow-hidden group will-change-transform shadow-2xl shadow-black/80 flex flex-col h-[420px] justify-end backdrop-blur-sm transition-all duration-500 hover:bg-zinc-900/30"
              >
                {/* Resim Katmanı & Fallback */}
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

                {/* Premium Çapraz Cam Parıltısı */}
                <div className="absolute inset-0 w-[200%] h-full z-20 pointer-events-none bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -skew-x-12 -translate-x-[150%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />

                {/* İçerik Bloku */}
                <div className="relative z-10 p-7 flex justify-between items-end w-full">
                  <div className="space-y-2 pr-2">
                    <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 group-hover:text-zinc-300 text-xs line-clamp-2 leading-relaxed opacity-90 transition-all duration-500">
                      {project.description}
                    </p>
                  </div>

                  {/* Sağ Alt Köşedeki Minimal Ok (↗) */}
                  <div className="text-zinc-400 group-hover:text-cyan-400 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ease-out shrink-0 mb-0.5">
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

                {/* Mikro Hover Parlaması */}
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
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
