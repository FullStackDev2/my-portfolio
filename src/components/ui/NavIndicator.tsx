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
      className="absolute bottom-0 h-[3px] rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-orange-400"
      animate={{
        x: activeRect?.left || 0,
        width: activeRect?.width || 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 35,
      }}
    />
  );
}
