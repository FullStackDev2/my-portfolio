'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';

type Project = {
  title: string;
  description: string;
  tech: string[];
};

type Props = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = project ? 'hidden' : 'auto';
  }, [project]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="
          w-full
          max-w-3xl
          bg-white/5
          border
          border-white/10
          rounded-3xl
          p-10
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/50 hover:text-white transition"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-4xl font-black mb-4">{project.title}</h2>

        {/* Description */}
        <p className="text-white/60 mb-8 leading-relaxed">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="
                px-3
                py-1
                text-xs
                rounded-full
                border
                border-white/10
                text-white/50
              "
            >
              {t}
            </span>
          ))}
        </div>

        {/* Footer hint */}
        <p className="mt-10 text-white/30 text-sm">
          Click outside or press ESC to close
        </p>
      </motion.div>
    </div>
  );
}
