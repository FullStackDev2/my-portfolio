'use client';

import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="min-h-screen px-6 py-32">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black"
        >
          Let’s work together
        </motion.h2>

        <p className="text-white/60 mt-6">
          Have a project or idea? I’m available for freelance work.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-10 flex flex-col md:flex-row gap-4 justify-center"
        >
          <a
            href="mailto:yourmail@gmail.com"
            className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:scale-105 transition"
          >
            Email Me
          </a>

          <a
            href="https://github.com"
            className="px-8 py-4 border border-white/20 rounded-full hover:bg-white/10 transition"
          >
            GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
