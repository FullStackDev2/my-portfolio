'use client';

import { motion } from 'framer-motion';

type Props = {
  activeRect: {
    left: number;
    width: number;
  };
};

export default function NavIndicator({ activeRect }: Props) {
  return (
    <motion.div
      className="absolute top-full mt-1 h-[3px] rounded-full bg-gradient-to-r from-[#ff3d6e] to-[#ff5b8a] "
      animate={{
        left: activeRect?.left || 0,
        width: activeRect?.width || 0,
      }}
      // Spring yerine tween kullanıyoruz
      transition={{
        duration: 0.25, // Animasyon süresi (saniye)
        ease: 'easeInOut', // Yumuşak başla, yumuşak bitir
      }}
    />
  );
}
