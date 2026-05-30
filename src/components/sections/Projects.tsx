'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/data/projects';

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen px-6 py-32">
      <div className="max-w-6xl mx-auto">
        <p className="text-white/40 tracking-[0.3em] uppercase mb-6">
          Projects
        </p>

        <h2 className="text-5xl md:text-7xl font-black mb-16">
          Things I’ve Built
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <Link key={project.slug} href={`/projects/${project.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="
      relative
      cursor-pointer
      rounded-2xl
      border
      border-white/10
      bg-white/5
      overflow-hidden
      group
    "
              >
                {/* Glow border effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-white/10 via-transparent to-white/10" />

                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="
      object-cover
      transition-transform
      duration-500
      group-hover:scale-110
    "
                  />
                </div>

                <div className="p-6 relative z-10">
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>

                  <p className="text-white/60 mb-6">{project.description}</p>

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="
            text-xs
            px-3
            py-1
            rounded-full
            border
            border-white/10
            text-white/50
            bg-black/30
          "
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* CTA hint */}
                  <div className="mt-6 text-sm text-white/40 group-hover:text-white/70 transition">
                    Click to view details →
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
