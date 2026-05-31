'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = 'yourmail@gmail.com'; // 👈 Kendi mail adresini buraya yaz

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      className="min-h-screen px-6 py-32 flex flex-col justify-center relative overflow-hidden"
      style={{
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
      }}
    >
      <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-blue-400 font-semibold uppercase tracking-[0.25em] text-xs md:text-sm mb-4"
        >
          Get In Touch
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-black tracking-tight bg-clip-text bg-gradient-to-b from-white to-white/70"
        >
          Let’s work together
        </motion.h2>

        <p className="text-white/50 mt-6 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
          Have an exciting project or concept in mind? I’m currently available
          for freelance systems and contract work.
        </p>

        {/* Premium Interactive Action Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 p-8 max-w-xl mx-auto rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl flex flex-col items-center gap-6"
        >
          <div className="text-center">
            <p className="text-xs text-white/40 uppercase tracking-widest mb-1">
              Direct Email
            </p>
            <span className="text-lg md:text-xl font-mono text-white/90 selection:bg-blue-500">
              {email}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button
              onClick={handleCopy}
              className={`px-8 py-4 rounded-full font-semibold text-sm transition-all duration-300 w-full sm:w-auto ${
                copied
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                  : 'bg-white text-black hover:bg-zinc-200 active:scale-95'
              }`}
            >
              {copied ? '✓ Email Copied!' : 'Copy Address'}
            </button>

            <a
              href={`mailto:${email}`}
              className="px-8 py-4 border border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-full font-semibold text-sm transition-all active:scale-95 text-center w-full sm:w-auto"
            >
              Open Mail App
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
