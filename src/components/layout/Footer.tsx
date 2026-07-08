'use client';

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiJavascript,
  SiFramer,
} from 'react-icons/si';
import { Heart } from 'lucide-react';

const techs = [
  { title: 'React', icon: <SiReact className="text-cyan-400 text-4xl" /> },
  { title: 'Next.js', icon: <SiNextdotjs className="text-white text-4xl" /> },
  {
    title: 'TypeScript',
    icon: <SiTypescript className="text-[#3178C6] text-4xl" />,
  },
  {
    title: 'Tailwind',
    icon: <SiTailwindcss className="text-[#38BDF8] text-4xl" />,
  },
  {
    title: 'Node.js',
    icon: <SiNodedotjs className="text-[#68A063] text-4xl" />,
  },
  {
    title: 'PostgreSQL',
    icon: <SiPostgresql className="text-[#4169E1] text-4xl" />,
  },
  {
    title: 'JavaScript',
    icon: <SiJavascript className="text-[#F7DF1E] text-4xl" />,
  },
  {
    title: 'Framer Motion',
    icon: <SiFramer className="text-[#A259FF] text-4xl" />,
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#020617]">
      {/* Glow */}
      <div className="absolute left-0 top-20 w-[500px] h-[500px] bg-cyan-500/10 blur-[180px]" />
      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-fuchsia-500/10 blur-[180px]" />

      <div className="relative max-w-[1700px] mx-auto px-8 xl:px-20 py-28">
        {/* TITLE */}
        <div className="relative z-0 text-center mb-52">
          <h2 className="text-[4rem] xl:text-[6.5rem] font-bold tracking-tight text-white">
            Thanks for visiting
          </h2>

          <div className="absolute inset-0 -z-10 pointer-events-none">
            {/* Sol mavi glow */}
            <div className="absolute left-1/2 -translate-x-[82%] top-[-10px] w-[460px] h-[170px] bg-cyan-400/55 blur-[100px] rounded-full" />

            {/* Sağ mor glow */}
            <div className="absolute left-1/2 -translate-x-[7%] top-[-10px] w-[470px] h-[170px] bg-fuchsia-500/42 blur-[110px] rounded-full" />
          </div>

          <p className="mt-0 text-3xl text-zinc-400">
            Performance Meets Design
          </p>

          <div className="mt-8 flex justify-center">
            <div className="w-32 h-[3px] rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500" />
          </div>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 items-center">
          {/* LEFT */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-end">
              <h1
                className="
text-8xl
xl:text-9xl
font-black
tracking-[-0.05em]
bg-gradient-to-r
from-cyan-400
via-blue-500
to-fuchsia-500
bg-clip-text
text-transparent
drop-shadow-[0_0_25px_rgba(59,130,246,.25)]
"
              >
                ND.
              </h1>
              <div className="w-3 h-3 rounded-full bg-white mb-5 ml-1" />
            </div>

            <p className="mt-3 uppercase tracking-[0.35em] text-base text-zinc-200">
              Building Digital Experiences.
            </p>

            <div className="mt-4 w-30 h-[3px] -translate-x-4 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500" />
          </div>

          {/* CENTER */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="space-y-5">
              <h3 className="text-3xl font-normal text-zinc-200">
                Always{' '}
                <span className="font-medium text-cyan-400">learning.</span>
              </h3>

              <h3 className="text-3xl font-normal text-zinc-200">
                Always{' '}
                <span className="font-medium text-blue-400">building.</span>
              </h3>

              <h3 className="text-3xl font-normal text-zinc-200">
                Always{' '}
                <span className="font-medium text-fuchsia-400">improving.</span>
              </h3>
            </div>

            <div className="relative mt-6 flex justify-center">
              {/* Glow */}
              <div className="absolute w-56 h-8 bg-cyan-400/20 blur-2xl rounded-full" />

              {/* Çizgi */}
              <div className="relative h-[2px] w-56 rounded-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
            </div>
          </div>

          {/* RIGHT - TECH STACK */}
          <div className="grid grid-cols-4 gap-x-0 gap-y-9">
            {techs.map((tech) => (
              <div
                key={tech.title}
                className="group flex flex-col items-center gap-2"
              >
                <div className="transition-transform duration-300 group-hover:scale-110">
                  {tech.icon}
                </div>

                <span className="text-xs text-zinc-500 whitespace-nowrap">
                  {tech.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-24 flex flex-wrap items-center justify-center gap-3 text-center">
          <p className="text-zinc-500 text-base tracking-wide">
            © {new Date().getFullYear()} Nurettin Dincer. All rights reserved.
          </p>

          <span className="text-zinc-600">•</span>

          <div className="flex items-center gap-2 text-zinc-500 text-base">
            <Heart className="w-5 h-5 text-fuchsia-400 fill-fuchsia-400" />
            <span>Crafted with passion in Türkiye</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
