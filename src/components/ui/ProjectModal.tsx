'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

type Project = {
  title: string;
  description: string;
  tech: string[];
  image?: string;
  images?: string[];
  client?: string;
  category?: string;
  date?: string;
};

type Props = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [prevProjectTitle, setPrevProjectTitle] = useState<string | null>(null);

  if (project && project.title !== prevProjectTitle) {
    setPrevProjectTitle(project.title);
    setActiveImgIndex(0);
    setRating(0);
  }

  useEffect(() => {
    document.body.style.overflow = project ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [project]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!project) return null;

  const galleryImages =
    project.images && project.images.length > 0
      ? project.images
      : ([project.image].filter(Boolean) as string[]);

  const hasImages = galleryImages.length > 0;

  const handleNextImage = () => {
    setActiveImgIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrevImage = () => {
    setActiveImgIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length,
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 md:p-8 select-none"
      onClick={onClose}
    >
      {/* Modal Açılış */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 40 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="w-full max-w-5xl h-[85vh] md:h-[80vh] max-h-[780px] bg-[#070a13]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden flex flex-col md:flex-row relative shadow-[0_0_60px_rgba(0,0,0,0.7)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dekoratif Arka Plan Işıkları (Premium Glow Effect) */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Kapatma Butonu */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-40 p-2.5 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-200 backdrop-blur-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* SOL TARAF: PREMIUM GALERİ */}
        <div className="w-full md:w-1/2 h-[45%] md:h-full bg-black/20 p-4 md:p-6 flex flex-col gap-4 justify-between border-b md:border-b-0 md:border-r border-white/5 relative z-10">
          <div className="w-full h-full relative rounded-2xl overflow-hidden border border-white/5 bg-zinc-950/40 flex-1 group">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImgIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                {hasImages ? (
                  <Image
                    src={galleryImages[activeImgIndex]}
                    alt={`${project.title} screenshot ${activeImgIndex + 1}`}
                    fill
                    priority
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-zinc-950/50 to-zinc-900/50 text-white/20">
                    <span className="text-xs font-mono uppercase tracking-widest opacity-40">
                      No Preview Available
                    </span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Görsel Üstü Sağ/Sol Navigasyon Okları */}
            {galleryImages.length > 1 && (
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <button
                  onClick={handlePrevImage}
                  className="p-2 rounded-xl bg-black/60 border border-white/10 text-white hover:bg-black/80 pointer-events-auto transition-all active:scale-90"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleNextImage}
                  className="p-2 rounded-xl bg-black/60 border border-white/10 text-white hover:bg-black/80 pointer-events-auto transition-all active:scale-90"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Küçük Thumbnails Listesi */}
          {galleryImages.length > 1 && (
            <div className="grid grid-cols-4 gap-2.5 h-14 md:h-16 shrink-0">
              {galleryImages.slice(0, 4).map((img, idx) => (
                <button
                  key={`thumb-${idx}`}
                  onClick={() => setActiveImgIndex(idx)}
                  className={`relative rounded-xl overflow-hidden border transition-all duration-300 ${
                    idx === activeImgIndex
                      ? 'border-cyan-400 scale-[0.96] ring-4 ring-cyan-500/10 opacity-100'
                      : 'border-white/5 opacity-40 hover:opacity-90'
                  }`}
                >
                  <Image
                    src={img}
                    alt="thumbnail"
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* SAĞ TARAF: DETAYLAR PANELİ */}
        <div className="w-full md:w-1/2 h-[55%] md:h-full p-6 md:p-10 flex flex-col justify-between overflow-y-auto text-white relative z-10 custom-scrollbar">
          <div className="space-y-6">
            {/* Üst Bilgi ve Başlık */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Project Case Study
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 leading-tight pt-1">
                {project.title}
              </h2>
            </div>

            {/* Proje Açıklaması */}
            <p className="text-slate-400 text-[14px] leading-relaxed font-normal">
              {project.description}
            </p>

            {/* Modern Künyeler Paneli (Grid) */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
              <div className="space-y-0.5">
                <span className="block font-mono text-white/30 text-[10px] uppercase tracking-wider">
                  Client
                </span>
                <span className="text-slate-200 text-xs font-medium">
                  {project.client || 'Nurettin D. Labs'}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="block font-mono text-white/30 text-[10px] uppercase tracking-wider">
                  Category
                </span>
                <span className="text-slate-200 text-xs font-medium">
                  {project.category || 'Full-Stack Dev'}
                </span>
              </div>
              <div className="space-y-0.5 col-span-2 pt-2 border-t border-white/5">
                <span className="block font-mono text-white/30 text-[10px] uppercase tracking-wider">
                  Date
                </span>
                <span className="text-slate-200 text-xs font-medium">
                  {project.date || '2026.06.23'}
                </span>
              </div>
            </div>

            {/* Teknolojiler (Tags) */}
            <div className="space-y-2">
              <span className="block font-mono text-white/30 text-[10px] uppercase tracking-wider">
                Technologies Used
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t, idx) => (
                  <span
                    key={`${t}-${idx}`}
                    className="px-3 py-1 text-[11px] font-mono rounded-lg bg-cyan-500/5 border border-cyan-500/10 text-cyan-400/90 shadow-[0_2px_10px_rgba(6,182,212,0.02)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* OYLAMA ALANI */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/[0.01] -mx-4 px-4 py-3 rounded-xl border border-white/[0.02]">
            <div className="space-y-0.5">
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Rate this project
              </h4>
              <p className="text-[11px] text-zinc-500">
                Your feedback helps shape our craftsmanship.
              </p>
            </div>

            <div className="flex items-center gap-1 bg-zinc-950/40 p-1.5 rounded-xl border border-white/5 w-fit shadow-inner">
              {[1, 2, 3, 4, 5].map((star) => {
                const isSelected = star <= (hoverRating || rating);
                return (
                  <button
                    key={`star-${star}`}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform duration-100 hover:scale-120 active:scale-90 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={`w-5 h-5 transition-all duration-200 ${
                        isSelected
                          ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)] scale-105'
                          : 'text-white/10 hover:text-white/30'
                      }`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                );
              })}
              {rating > 0 && (
                <span className="text-xs font-mono font-bold text-amber-400 ml-2 pr-1 animate-pulse">
                  {rating}/5
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
