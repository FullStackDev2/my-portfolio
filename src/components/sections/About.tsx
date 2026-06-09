'use client';

import Reveal from '../ui/Reveal';

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center px-6 py-32 relative overflow-hidden border-t border-zinc-200/30 bg-[#f5f7ff]"
      style={{
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
      }}
    >
      {/* SAME GRID OVERLAY */}
      <div
        className="absolute inset-0"
        style={{
          background: `
      radial-gradient(circle at 55% 30%, rgba(124,58,237,.06), transparent 60%),
      radial-gradient(circle at 85% 45%, rgba(56,189,248,.06), transparent 65%),
      radial-gradient(circle at 50% 85%, rgba(255,220,220,.08), transparent 90%)
    `,
        }}
      />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 relative z-10">
        {/* LEFT */}
        <Reveal>
          <div>
            <p className="text-zinc-500 uppercase tracking-[0.3em] mb-6 text-xs">
              About
            </p>

            <h2 className="text-4xl md:text-6xl font-black leading-tight text-zinc-900">
              Building digital experiences with modern technologies.
            </h2>
          </div>
        </Reveal>

        {/* RIGHT */}
        <Reveal>
          <div className="space-y-8 text-zinc-600 text-lg leading-relaxed">
            <p>
              I create premium SaaS interfaces, dashboards and cinematic web
              experiences with a focus on performance and interaction.
            </p>

            <p>
              My main stack is Next.js, React and Tailwind CSS, with strong
              attention to UI systems and scalability.
            </p>

            <p>
              I enjoy designing smooth animations, clean layouts and
              product-grade user experiences.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
