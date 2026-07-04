'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const PHRASES = ['CONTACT ME NOW', 'SAY HELLO!'];
const INTERVAL_MS = 4800;

export default function RotatingHeading() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % PHRASES.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="relative inline-grid place-items-center">
      {/* Görünmez, en uzun ifadeyle aynı genişlikte bir kopya — böylece
          geçiş sırasında konteyner genişliği zıplamaz, satır ortalanmış
          kalır. */}
      <span className="invisible col-start-1 row-start-1 whitespace-nowrap px-1">
        SAY HELLO!
      </span>

      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className=" text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white"
        >
          {PHRASES[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
