'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import ProjectModal from '@/components/ui/ProjectModal';
import { projects } from '@/data/projects';

// Webflow tarzı akıcı, üst düzey yay ve geçiş varyasyonları
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // YENİ: Kartlar arasındaki bekleme süresi artırıldı (Tam bir domino etkisi)
      staggerChildren: 0.35,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    scale: 0.5, // Bir tık daha küçükten başlayarak patlama derinliğini artırır
    opacity: 0,
    y: 50, // Aşağıdan yukarıya süzülme mesafesi biraz daha uzatıldı
  },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 95, // YENİ: Daha ağır, premium ve tok bir fırlama ivmesi
      damping: 21, // Yumuşak ve klas bir yaylanma bitişi
    },
  },
  exit: {
    scale: 0.85,
    opacity: 0,
    y: 20,
    transition: { duration: 0.2 },
  },
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  const [showAll, setShowAll] = useState(false);

  // İlk 6 projeyi veya tamamını filtrele
  const visibleProjects = showAll ? projects : projects.slice(0, 6);

  return (
    <section
      id="projects"
      className="min-h-screen px-6 py-32 flex flex-col justify-center select-none bg-zinc-950 text-white"
      style={{
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
      }}
    >
      <div className="max-w-6xl mx-auto w-full space-y-12">
        <div>
          <p className="text-blue-400 tracking-[0.3em] uppercase mb-4 text-xs md:text-sm font-semibold font-mono">
            {'// LATEST WORK // PROJECTS'}
          </p>

          <h2 className="text-5xl md:text-7xl font-black tracking-tight bg-clip-text bg-gradient-to-b from-white to-white/60">
            Things I’ve Built
          </h2>
        </div>

        {/* Webflow Tarzı: layout ve container takibi ile sıvı gibi genişleyen grid */}
        <motion.div
          layout="position" // Kartlar genişlerken layout kaymalarını pürüzsüzleştirir
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, i) => (
              <motion.div
                key={project.slug}
                layoutId={project.slug}
                // CRITICAL: Bu satır yukarıdaki dinamik gecikmeyi (i * 0.12) besler
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }} // Sayfa biraz daha inince tetiklensin
                exit="exit"
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: 'easeOut' },
                }}
                onClick={() => setSelectedProject(project)}
                className="relative cursor-pointer rounded-2xl border border-white/10 bg-white/5 overflow-hidden group will-change-transform backdrop-blur-sm shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-blue-500/5 hover:border-white/20 flex flex-col h-full justify-between"
              >
                {/* İÇERİK YAPISI (Image, Body, Badges vs. tamamen aynı kalacak) */}
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-zinc-900">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-w-768px) 100vw, 33vw"
                      priority={i < 2}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 tracking-tight text-white group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-white/60 mb-6 text-sm line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] uppercase font-semibold tracking-wider px-3 py-1 rounded-full border border-white/5 text-white/50 bg-white/5 font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <div className="flex items-center gap-2 text-xs font-medium text-white/40 group-hover:text-white/80 transition-colors">
                    Details View <span>→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More / Less Butonu */}
        {projects.length > 6 && (
          <motion.div layout className="flex justify-center pt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 rounded-full border border-white/10 bg-white/5 font-semibold text-sm tracking-wide text-white hover:bg-white hover:text-black hover:border-white active:scale-95 transition-all duration-300 shadow-lg shadow-black/50"
            >
              {showAll ? 'View Less' : 'View More'}
            </button>
          </motion.div>
        )}
      </div>

      {/* Modal Kontrolü */}
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
