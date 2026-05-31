'use client';

import Reveal from '../ui/Reveal';

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center px-6 py-32"
      style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20">
        <Reveal>
          <div>
            <p className="text-white/40 uppercase tracking-[0.3em] mb-6">
              About
            </p>

            <h2 className="text-5xl md:text-7xl font-black leading-tight">
              Building digital experiences with modern technologies.
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="space-y-8 text-white/60 text-lg leading-relaxed">
            <p>
              I create premium SaaS interfaces, dashboards and cinematic web
              experiences.
            </p>

            <p>
              My focus is modern frontend systems using Next.js, React and
              Tailwind CSS.
            </p>

            <p>
              I enjoy creating smooth animations, scalable UI systems and
              interactive experiences.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
