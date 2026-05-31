'use client';

import Reveal from '../ui/Reveal';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Frontend Architecture',
    description: 'Building pixel-perfect, hyper-performing interfaces.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    color: 'from-blue-500/10 to-indigo-500/5',
    borderColor: 'hover:border-blue-500/30',
  },
  {
    title: 'Backend & Database',
    description: 'Designing scalable, secure and robust system logic.',
    skills: ['Node.js', 'Express', 'MongoDB', 'REST API', 'JWT'],
    color: 'from-purple-500/10 to-pink-500/5',
    borderColor: 'hover:border-purple-500/30',
  },
  {
    title: 'DevOps & Workflow',
    description: 'Version control, cloud infrastructure and automation.',
    skills: ['Git', 'GitHub', 'CI/CD', 'Vercel', 'Linux'],
    color: 'from-emerald-500/10 to-teal-500/5',
    borderColor: 'hover:border-emerald-500/30',
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="min-h-screen px-6 py-32 flex flex-col justify-center"
      style={{
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
      }}
    >
      <div className="max-w-6xl mx-auto w-full">
        <Reveal>
          <p className="text-white/40 uppercase tracking-[0.3em] mb-6 text-xs md:text-sm font-semibold">
            Skills
          </p>
          <h2 className="text-5xl md:text-7xl font-black mb-16 tracking-tight bg-clip-text bg-gradient-to-b from-white to-white/60">
            Technologies I Use
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b ${category.color} p-8 backdrop-blur-md transition-all duration-500 ${category.borderColor} group`}
            >
              <h3 className="text-xl font-bold tracking-tight mb-2 text-white group-hover:text-zinc-200">
                {category.title}
              </h3>
              <p className="text-xs text-white/40 mb-8 leading-relaxed">
                {category.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-4 py-2 text-xs font-medium rounded-xl border border-white/5 bg-black/20 text-white/70 backdrop-blur-sm transition-colors hover:border-white/20 hover:text-white"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
