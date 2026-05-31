'use client';

import { useScroll, useSpring, motion } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  // Yay (spring) efekti ile kaydırma çubuğunun takılmadan, akıcı akmasını sağlıyoruz
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[99999] origin-left premium-progress-glow"
      style={{
        scaleX,
        background:
          'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
        backgroundSize: '200% 100%',
      }}
    />
  );
}
