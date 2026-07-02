'use client';

import { useEffect, useState } from 'react';

const words = [
  'LEGENDARY',
  'REMARKABLE',
  'EXCEPTIONAL',
  'IMPACTFUL',
  'INNOVATIVE',
  'UNFORGETTABLE',
];

export default function RotatingWord() {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentWord = words[wordIndex];

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      // Yazıyor
      if (charIndex < currentWord.length) {
        timeout = setTimeout(() => {
          setCharIndex((c) => c + 1);
        }, 70);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    } else {
      // Siliyor
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setCharIndex((c) => c - 1);
        }, 70);
      } else {
        setIsDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentWord]);

  const text = currentWord.slice(0, charIndex);

  return (
    <span className="inline-flex w-[14ch] items-center text-left">
      <span
        className={
          isDeleting
            ? 'bg-gradient-to-r from-emerald-400 via-teal-300 to-violet-500 bg-clip-text text-transparent'
            : 'text-cyan-400'
        }
      >
        {text}
      </span>

      <span
        className={`ml-0.5 h-[1em] w-[2px] animate-pulse ${
          isDeleting ? 'bg-emerald-400' : 'bg-cyan-400'
        }`}
      />
    </span>
  );
}
