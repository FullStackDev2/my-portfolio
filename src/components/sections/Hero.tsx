'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden px-6"
    >
      {/* Glow Effects */}
      <div className="absolute top-[-150px] left-[-150px] w-[600px] h-[600px] bg-white/10 rounded-full blur-[180px]" />

      <div className="absolute bottom-[-200px] right-[-200px] w-[700px] h-[700px] bg-blue-500/10 rounded-full blur-[220px]" />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center max-w-5xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-sm text-white/60">
            Available for freelance work
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-none tracking-tight">
          NURETTIN
        </h1>

        <p className="mt-8 text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
          I build modern SaaS platforms, dashboards and web applications focused
          on performance, scalability and user experience.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="#projects"
            className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition"
          >
            View Projects
          </a>

          <a
            href="#contact"
            className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition"
          >
            Contact Me
          </a>
        </div>

        <div className="mt-20 flex flex-wrap justify-center gap-12 text-center">
          <div>
            <h3 className="text-3xl font-bold">3+</h3>
            <p className="text-white/50">Projects</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">React</h3>
            <p className="text-white/50">Frontend</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">Node.js</h3>
            <p className="text-white/50">Backend</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
