'use client';

import Reveal from '../ui/Reveal';
import { motion, type Variants } from 'framer-motion';

// ================= TYPESCRIPT TIP TANIMLAMALARI =================
interface Skill {
  name: string;
  icon: string;
}

interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
  glowClass: string;
  arrowColor: string;
}

const skillCategories: SkillCategory[] = [
  {
    id: 'frontend-architecture',
    title: 'Frontend Architecture',
    description:
      'Building pixel-perfect, hyper-performing user interfaces with modern reactive paradigms.',
    skills: [
      { name: 'React', icon: 'fa-brands fa-react text-cyan-400' },
      { name: 'Next.js', icon: 'fa-solid fa-cube text-zinc-300' },
      { name: 'TypeScript', icon: 'fa-solid fa-code text-blue-400' },
      { name: 'Tailwind CSS', icon: 'fa-solid fa-wind text-teal-400' },
      {
        name: 'Framer Motion',
        icon: 'fa-solid fa-wand-magic-sparkles text-purple-400',
      },
    ],
    glowClass:
      'hover:bg-gradient-to-b hover:from-cyan-500/[0.02] hover:to-transparent',
    arrowColor: 'group-hover:text-cyan-400',
  },
  {
    id: 'Backend & Database',
    title: 'Backend & Database',
    description:
      'Designing scalable, secure and robust system logic alongside optimized data structures.',
    skills: [
      { name: 'Node.js', icon: 'fa-brands fa-node-js text-emerald-400' },
      { name: 'Express', icon: 'fa-solid fa-server text-zinc-400' },
      { name: 'MongoDB', icon: 'fa-solid fa-database text-green-500' },
      { name: 'REST API', icon: 'fa-solid fa-cloud text-sky-400' },
      { name: 'JWT', icon: 'fa-solid fa-key text-amber-400' },
    ],
    glowClass:
      'hover:bg-gradient-to-b hover:from-purple-500/[0.02] hover:to-transparent',
    arrowColor: 'group-hover:text-purple-400',
  },
  {
    id: 'DevOps & Workflow',
    title: 'DevOps & Workflow',
    description:
      'Version control, automated cloud infrastructure and fluid deployment pipelines.',
    skills: [
      { name: 'Git', icon: 'fa-brands fa-git-alt text-orange-500' },
      { name: 'GitHub', icon: 'fa-brands fa-github text-white' },
      { name: 'CI/CD', icon: 'fa-solid fa-gears text-indigo-400' },
      { name: 'Vercel', icon: 'fa-solid fa-triangle text-zinc-200 rotate-180' },
      { name: 'Linux', icon: 'fa-brands fa-linux text-yellow-500' },
    ],
    glowClass:
      'hover:bg-gradient-to-b hover:from-emerald-500/[0.02] hover:to-transparent',
    arrowColor: 'group-hover:text-emerald-400',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 130, damping: 17 },
  },
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="min-h-screen px-6 pt-12 pb-32 flex flex-col justify-center relative overflow-hidden bg-[#020617] scroll-mt-20"
      style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
    >
      {/* Arka Plan Matris Izgarası */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* ÜST BAŞLIK ALANI */}
        <div className="mb-12 border-b border-zinc-900 pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <Reveal>
              <p className="text-zinc-500 uppercase tracking-[0.4em] mb-2 text-sm font-mono">
                TECHNICAL STACK
              </p>
            </Reveal>
            <Reveal>
              <h2 className="text-5xl md:text-6xl font-black tracking-tight text-white uppercase">
                SYSTEM <span className="text-cyan-400">ENGINEERING</span>
              </h2>
            </Reveal>
          </div>
          <Reveal>
            <p className="text-zinc-500 font-mono text-sm max-w-sm md:text-right">
              Premium tools and modular frameworks built for absolute scale.
            </p>
          </Reveal>
        </div>

        {/* ================= 1. ÜST BAĞLANTI (CORE - ÇİZGİNİN EN UCU / BAŞLANGICI) ================= */}
        <div className="hidden md:flex flex-col items-center w-full">
          <div className="px-8 py-3 rounded-xl border border-cyan-500/30 bg-[#040817] shadow-[0_0_20px_rgba(34,211,238,0.15)] text-white font-mono tracking-wider z-20">
            ENGINEERING CORE
          </div>

          {/* Butondan çıkıp aşağıdaki köprüye kadar uzanan tek ve kesintisiz dikey hat */}
          <div className="w-[6px] h-16 bg-gradient-to-r from-slate-400/50 via-slate-300/65 to-slate-400/50" />
        </div>

        {/* ================= 2. BİRLEŞİK RESPONSIVE KÖPRÜ SİSTEMİ (ÜSTÜN DAĞILIMI) ================= */}
        <div className="hidden md:grid grid-cols-3 gap-0 w-full h-12 relative -mb-px">
          {/* Sol Kol Hattı */}
          <div className="relative w-full h-full">
            <div className="absolute right-0 top-0 w-1/2 h-[6px] bg-gradient-to-b from-slate-400/50 via-slate-300/65 to-slate-400/50" />
            <div className="absolute left-1/2 top-0 bottom-0 w-[6px] -translate-x-1/2 bg-gradient-to-r from-slate-400/50 via-slate-300/65 to-slate-400/50" />
          </div>

          {/* Orta Kol Hattı */}
          <div className="relative w-full h-full">
            <div className="absolute left-0 right-0 top-0 h-[6px] bg-gradient-to-b from-slate-400/50 via-slate-300/65 to-slate-400/50" />
            <div className="absolute left-1/2 top-0 bottom-0 w-[6px] -translate-x-1/2 bg-gradient-to-r from-slate-400/50 via-slate-300/65 to-slate-400/50" />
          </div>

          {/* Sağ Kol Hattı */}
          <div className="relative w-full h-full">
            <div className="absolute left-0 top-0 w-1/2 h-[6px] bg-gradient-to-b from-slate-400/50 via-slate-300/65 to-slate-400/50" />
            <div className="absolute left-1/2 top-0 bottom-0 w-[6px] -translate-x-1/2 bg-gradient-to-r from-slate-400/50 via-slate-300/65 to-slate-400/50" />
          </div>
        </div>

        {/* 3 SÜTUNLU KART DÜZENİ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start relative">
          {skillCategories.map((category: SkillCategory, idx: number) => (
            <div
              key={category.id}
              className="flex flex-col items-center group w-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="w-full"
              >
                <div className="w-full h-full rounded-[23px] bg-[#020617] p-6 md:p-8 flex flex-col justify-between min-h-[380px]">
                  <div>
                    {/* Başlık Satırı */}
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl md:text-2xl font-black tracking-tight text-white">
                        {category.title}
                      </h3>
                      <div className="flex items-center gap-1.5 font-mono text-zinc-600">
                        <i
                          className={`fa-solid fa-arrow-up-right text-[10px] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${category.arrowColor}`}
                        />
                      </div>
                    </div>

                    {/* Açıklama */}
                    <p className="text-sm text-zinc-400/90 leading-relaxed mb-4">
                      {category.description}
                    </p>
                  </div>

                  {/* SIKIŞTIRILMIŞ İKİLİ GRID */}
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-900"
                  >
                    {category.skills.map((skill: Skill) => (
                      <motion.div
                        key={skill.name}
                        variants={itemVariants}
                        whileHover={{ scale: 1.03, y: -1 }}
                        className="relative w-full p-[1px] rounded-xl transition-all duration-500 cursor-default group/skill shadow-[0_0_8px_rgba(34,211,238,0.04)] hover:shadow-[0_0_12px_rgba(34,211,238,0.08)]"
                      >
                        <div className="w-full h-full py-2.5 px-3 rounded-[11px] bg-zinc-900/20 backdrop-blur-sm border border-zinc-800/70 flex items-center text-sm font-mono text-zinc-400 transition-all duration-300 group-hover/skill:bg-white/[0.03] group-hover/skill:border-blue-500/50 group-hover/skill:backdrop-blur-xl group-hover/skill:shadow-[0_0_25px_rgba(59,130,246,0.18)] group-hover/skill:text-white">
                          <i
                            className={`${skill.icon} text-base mr-2.5 w-5 text-center flex-shrink-0`}
                          />
                          <span className="truncate">{skill.name}</span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* ================= SADECE DÜZ DİKEY ÇİZGİ (KARTLARDAN AI & TOOLS'A DÜZ İNİŞ) ================= */}
        <div className="hidden md:flex flex-col items-center w-full">
          <div className="w-[6px] h-20 bg-gradient-to-b from-slate-500/40 to-purple-500/60" />
        </div>

        {/* ================= 3. AI & TOOLS VE GENİŞLETİLMİŞ PROGRESS BARS ================= */}
        <div className="hidden md:flex flex-col items-center w-full mt-0">
          {/* AI & Tools Butonu */}
          <div className="px-10 py-3.5 rounded-xl border border-purple-500/30 bg-[#040817] shadow-[0_0_25px_rgba(168,85,247,0.2)] text-white font-mono tracking-wider text-base z-20">
            AI & TOOLS
          </div>

          {/* Butondan aşağıdaki yetenek çubuklarına inen mor dikey bağlantı çizgisi */}
          <div className="w-[6px] h-16 bg-gradient-to-b from-purple-500/60 to-slate-500/15" />

          {/* Progress Bars Konteyneri (Genişlik max-w-5xl) */}
          <div className="w-full max-w-6xl px-10 py-10 rounded-2xl bg-[#040817]/40 backdrop-blur-md shadow-2xl space-y-7">
            {/* Başlık Grubu */}
            <div className="text-left mb-8 font-mono">
              <span className="text-zinc-400 text-sm block tracking-widest uppercase mb-1">
                Technical Stack
              </span>
              <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
                Core Technologies
              </span>
            </div>

            {/* Çubuk 1: Next.js & React */}
            <div className="flex items-center space-x-6">
              <span className="w-44 text-base font-mono text-zinc-200 font-semibold text-left flex-shrink-0">
                Next.js & React
              </span>
              <div className="w-full h-12 bg-zinc-900/80 rounded-xl p-1.5 border border-zinc-800/40 relative overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '95%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 rounded-lg flex items-center justify-end pr-4 shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                >
                  <span className="text-sm font-mono font-black text-[#040817]">
                    95%
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Çubuk 2: TypeScript */}
            <div className="flex items-center space-x-6">
              <span className="w-44 text-base font-mono text-zinc-200 font-semibold text-left flex-shrink-0">
                TypeScript
              </span>
              <div className="w-full h-12 bg-zinc-900/80 rounded-xl p-1.5 border border-zinc-800/40 relative overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '90%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
                  className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 rounded-lg flex items-center justify-end pr-4 shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                >
                  <span className="text-sm font-mono font-black text-[#040817]">
                    90%
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Çubuk 3: Tailwind CSS */}
            <div className="flex items-center space-x-6">
              <span className="w-44 text-base font-mono text-zinc-200 font-semibold text-left flex-shrink-0">
                Tailwind CSS
              </span>
              <div className="w-full h-12 bg-zinc-900/80 rounded-xl p-1.5 border border-zinc-800/40 relative overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '98%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 rounded-lg flex items-center justify-end pr-4 shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                >
                  <span className="text-sm font-mono font-black text-[#040817]">
                    98%
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Çubuk 4: Node.js */}
            <div className="flex items-center space-x-6">
              <span className="w-44 text-base font-mono text-zinc-200 font-semibold text-left flex-shrink-0">
                Node.js
              </span>
              <div className="w-full h-12 bg-zinc-900/80 rounded-xl p-1.5 border border-zinc-800/40 relative overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '80%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                  className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 rounded-lg flex items-center justify-end pr-4 shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                >
                  <span className="text-sm font-mono font-black text-[#040817]">
                    80%
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
