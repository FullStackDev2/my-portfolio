'use client';

import Reveal from '../ui/Reveal';

const skills = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Express',
  'MongoDB',
  'Tailwind CSS',
  'Framer Motion',
  'REST API',
  'JWT',
  'Git',
  'GitHub',
];

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-32">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-white/40 uppercase tracking-[0.3em] mb-6">
            Skills
          </p>

          <h2 className="text-5xl md:text-7xl font-black mb-16">
            Technologies I Use
          </h2>
        </Reveal>

        <div className="flex flex-wrap gap-4">
          {skills.map((skill) => (
            <div
              key={skill}
              className="
                px-6
                py-3
                rounded-full
                border
                border-white/10
                bg-white/5
                backdrop-blur-md
                hover:bg-white/10
                hover:scale-105
                transition
              "
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
