'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ProjectModal from '@/components/ui/ProjectModal';
import { projects } from '@/data/projects';

export default function Projects() {
  // Aktif seçili projeyi state olarak tutuyoruz
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  return (
    <section
      id="projects"
      className="min-h-screen px-6 py-32 flex flex-col justify-center select-none"
      style={{
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
      }}
    >
      <div className="max-w-6xl mx-auto w-full">
        <p className="text-white/40 tracking-[0.3em] uppercase mb-6 text-xs md:text-sm font-semibold">
          Projects
        </p>

        <h2 className="text-5xl md:text-7xl font-black mb-16 tracking-tight bg-clip-text bg-gradient-to-b from-white to-white/60">
          Things I’ve Built
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedProject(project)}
              className="relative cursor-pointer rounded-2xl border border-white/10 bg-white/5 overflow-hidden group will-change-transform backdrop-blur-sm transition-shadow duration-300 hover:shadow-2xl hover:shadow-blue-500/5 hover:border-white/20"
            >
              {/* Image Container */}
              <div className="relative h-56 w-full overflow-hidden bg-zinc-900">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-w-768px) 100vw, 50vw"
                  priority={i < 2}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Card Body */}
              <div className="p-6 relative z-10">
                <h3 className="text-2xl font-bold mb-2 tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-white/60 mb-6 text-sm line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] uppercase font-semibold tracking-wider px-3 py-1 rounded-full border border-white/5 text-white/50 bg-white/5 backdrop-blur-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA Hint */}
                <div className="mt-6 flex items-center gap-2 text-xs font-medium text-white/40 group-hover:text-white/80 transition-colors">
                  Details View
                  <span className="transform transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Framer Motion AnimatePresence ile pürüzsüz modal kontrolü */}
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
