'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="
fixed top-0 left-0 right-0
h-[3px]
origin-left
z-[9999]
shadow-[0_0_20px_rgba(255,255,255,0.8)]
"
      style={{
        scaleX,
        background:
          'linear-gradient(to right, rgb(255,255,255), rgba(255,255,255,0.5))',
      }}
    />
  );
}
