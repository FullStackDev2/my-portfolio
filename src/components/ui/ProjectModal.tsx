'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';

type Project = {
  slug?: string;
  title: string;
  shortDescription?: string;
  about?: string;
  image: string;
  images: string[];
  tech?: string[];
  client: string;
  category: string;
  date: string;
  projectUrl?: string;
  githubUrl?: string;
};

type Props = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [prevProjectTitle, setPrevProjectTitle] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const galleryImages = useMemo(() => {
    if (!project) return [];

    if (project.images && project.images.length > 0) {
      return project.images;
    }

    if (project.image) {
      return [project.image];
    }

    return [];
  }, [project]);

  const hasImages = galleryImages.length > 0;

  const THUMB_VISIBLE = 5;

  const visibleThumbnails = useMemo(() => {
    if (galleryImages.length <= THUMB_VISIBLE) return galleryImages;

    let start = activeImgIndex - Math.floor(THUMB_VISIBLE / 2);
    start = Math.max(0, start);
    start = Math.min(start, galleryImages.length - THUMB_VISIBLE);

    return galleryImages.slice(start, start + THUMB_VISIBLE);
  }, [galleryImages, activeImgIndex]);

  useEffect(() => {
    if (project && project.title !== prevProjectTitle) {
      setPrevProjectTitle(project.title);
      setActiveImgIndex(0);
    }
  }, [project, prevProjectTitle]);

  useEffect(() => {
    const lenis = (
      window as typeof window & {
        lenis?: { stop: () => void; start: () => void };
      }
    ).lenis;

    if (project) {
      document.body.style.overflow = 'hidden';

      lenis?.stop();
    } else {
      document.body.style.overflow = '';

      lenis?.start();
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';

      lenis?.start();
    };
  }, [project]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (!project || galleryImages.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveImgIndex((p) => (p + 1) % galleryImages.length);
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveImgIndex((p) => (p - 1 + galleryImages.length) % galleryImages.length);
      }
    };

    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [project, galleryImages]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 md:p-8 select-none"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 40 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="
w-full
max-w-6xl
h-[96dvh]
lg:h-[86vh]
max-h-[820px]
bg-[#0d1220]/95
backdrop-blur-2xl
border
border-white/10
rounded-[1.5rem]
overflow-hidden
relative
shadow-[0_0_60px_rgba(0,0,0,0.7)]
"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dekoratif Arka Plan Işıkları — sadece masaüstünde, mobil/tablette kaldırıldı */}
        <div className="hidden lg:block absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="hidden lg:block absolute -bottom-24 -right-24 w-72 h-72 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Kapatma Butonu — scroll'lanmayan katmanda, her zaman sabit */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-40 p-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-200 backdrop-blur-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* İç Scroll Wrapper — sadece içerik burada kayar, X butonu bunun dışında */}
        <div className="w-full h-full overflow-y-auto md:overflow-hidden overscroll-contain flex flex-col lg:flex-row">
          {/* SOL: Dikey Thumbnail Kartları */}
          {galleryImages.length > 1 && (
            <div className="hidden lg:flex w-[100px] md:w-[116px] h-full flex-col items-center gap-2 px-4 md:px-5 py-4 bg-black/30 z-10 order-1">
              {/* UP */}
              <button
                onClick={() => setActiveImgIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
                className="w-full flex items-center justify-center py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
              </button>

              {/* Thumbnail Listesi */}
              <div className="flex-1 w-full flex flex-col gap-1 overflow-hidden">
                <div className="h-full flex flex-col justify-evenly">
                  {visibleThumbnails.map((img, idx) => {
                    const realIndex = galleryImages.findIndex((x) => x === img);

                    return (
                      <button
                        key={`thumb-${realIndex}-${idx}`}
                        onClick={() => setActiveImgIndex(realIndex)}
                        className={`relative w-full aspect-square rounded-xl overflow-hidden border transition-all duration-300 ${
                          realIndex === activeImgIndex
                            ? 'border-cyan-400/70 opacity-100'
                            : 'border-white/5 opacity-50 hover:opacity-90'
                        }`}
                      >
                        <Image
                          src={img}
                          alt="thumbnail"
                          fill
                          sizes="(max-width:768px) 22vw, 120px"
                          className="object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Aşağı Ok */}
              <button
                onClick={() => setActiveImgIndex((prev) => (prev + 1) % galleryImages.length)}
                className="w-full flex items-center justify-center py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </div>
          )}
          <div className="hidden">
            {galleryImages.map((img) => (
              <Image key={img} src={galleryImages[0]} alt="" width={1} height={1} priority />
            ))}
          </div>
          {/* ORTA: Büyük Görsel */}
          <div
            className="w-full
    lg:w-[51%]
    h-[46vh]
    min-h-[320px]
    lg:h-full
    relative
    bg-black/20
    shrink-0
    border-b
    md:border-b-0
    md:border-r
    border-white/5
    z-10
    order-1
    md:order-2"
          >
            <AnimatePresence>
              <motion.div
                key={activeImgIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center overflow-hidden"
              >
                {hasImages ? (
                  <Image
                    src={galleryImages[activeImgIndex]}
                    alt={project.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 80vw"
                    onClick={() => setPreviewOpen(true)}
                    className="object-cover scale-[1.05] rounded-lg cursor-zoom-in transition-transform duration-300 hover:scale-[1.02]"
                  />
                ) : (
                  <div className="absolute flex items-center justify-center text-white/20">No Preview</div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Mobil/Tablet: Sol-Sağ Ok Butonları — görsele göre sabit, absolute */}
            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImgIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
                  }}
                  className="lg:hidden absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm text-white/70 hover:text-white active:scale-95 transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImgIndex((prev) => (prev + 1) % galleryImages.length);
                  }}
                  className="lg:hidden absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm text-white/70 hover:text-white active:scale-95 transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>

                {/* Mobil/Tablet: Nokta Göstergesi — görselin altına, absolute olarak sabit */}
                <div className="lg:hidden absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex justify-center items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm">
                  {galleryImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImgIndex(index);
                      }}
                      className={`rounded-full transition-all duration-300 ${
                        activeImgIndex === index ? 'w-6 h-2 bg-cyan-400' : 'w-2 h-2 bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* SAĞ: Detaylar Paneli */}
          <div
            className="
w-full
lg:flex-1
p-5
md:p-10
text-white
relative
z-10
overflow-y-auto
custom-scrollbar
order-2
md:order-3
"
          >
            <div className="space-y-6">
              {/* Üst Bilgi ve Başlık */}
              <div className="space-y-2.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Project Case Study
                </div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
                  {project.title}
                </h2>
                <p className="text-slate-300 text-[13px] leading-relaxed font-normal">{project.shortDescription}</p>
              </div>

              {/* Künyeler Paneli (İkonlu liste) */}
              <div className="space-y-3 p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="currentColor"
                      className="w-3.5 h-3.5 text-white/80"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between flex-1">
                    <span className="font-mono text-white/60 text-[10px] uppercase tracking-wider">Client</span>
                    <span className="text-slate-200 text-sm font-medium">{project.client || 'Nurettin D. Labs'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="currentColor"
                      className="w-3.5 h-3.5 text-white/80"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                      />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between flex-1">
                    <span className="font-mono text-white/60 text-[10px] uppercase tracking-wider">Category</span>
                    <span className="text-slate-200 text-xs font-medium">{project.category || 'Full-Stack Dev'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="currentColor"
                      className="w-3.5 h-3.5 text-white/80"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                      />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between flex-1">
                    <span className="font-mono text-white/60 text-[10px] uppercase tracking-wider">Date</span>
                    <span className="text-slate-200 text-xs font-medium">{project.date || '2026.06.23'}</span>
                  </div>
                </div>
              </div>

              {/* Teknolojiler (Tags) */}
              <div className="flex flex-wrap gap-2">
                {(project.tech ?? []).map((t, idx) => (
                  <span
                    key={`${t}-${idx}`}
                    className="px-3 py-1 text-[12px] font-mono rounded-lg bg-cyan-500/5 border border-cyan-500/50 text-cyan-400/90"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* About Project */}
              <div className="space-y-1.5 pt-5 border-t border-white/55">
                <span className="block font-mono text-slate/80 text-[13px] uppercase tracking-wider">
                  About Project
                </span>
                <div className="text-slate-200 text-[13px] leading-relaxed font-normal space-y-4">
                  {(project.about ?? '').split('\n').map((line, index) => (
                    <p key={index}>{line || '\u00A0'}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Aksiyon Butonları */}
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-4">
              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-cyan-400 text-[#070a13] text-xs font-semibold hover:bg-cyan-300 transition-colors duration-200"
                >
                  Visit Project
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-3.5 h-3.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-xs font-semibold hover:bg-white/10 transition-colors duration-200"
                >
                  View Code
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-3.5 h-3.5"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.303-5.467-1.333-5.467-5.93 0-1.31.467-2.38 1.235-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.48 5.92.43.372.823 1.103.823 2.222 0 1.606-.015 2.896-.015 3.29 0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {previewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setPreviewOpen(false)}
            className="fixed inset-0 z-[9999] bg-[#020617]/80 backdrop-blur-md flex items-center justify-center p-8"
          >
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              src={galleryImages[activeImgIndex]}
              alt={project.title}
              className="max-w-[92vw] max-h-[85vh] md:max-w-[85vw] md:max-h-[90vh] w-auto h-auto object-contain rounded-lg cursor-zoom-out shadow-[0_0_60px_rgba(0,0,0,0.7)]"
            />

            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/50 border border-white/20 text-white hover:bg-black/70 cursor-pointer"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
