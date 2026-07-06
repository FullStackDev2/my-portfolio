import Image from 'next/image';

export default function Vision() {
  return (
    <section
      id="vision"
      className="relative min-h-[105vh] overflow-hidden flex items-center justify-center px-10 py-20"
      style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#060918]" />

      {/* Sağ üst glow */}
      <div className="absolute right-[-120px] top-[-120px] z-10 h-[650px] w-[650px] rounded-full bg-blue-600/35 blur-[220px]" />

      {/* Sol alt glow */}
      <div className="absolute left-[-120px] bottom-[-120px] z-10 h-[550px] w-[550px] rounded-full bg-violet-500/20 blur-[200px]" />

      {/* Noise */}
      <div
        className="absolute inset-0 z-20 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "url('/textures/noise_texture.png')",
          backgroundRepeat: 'repeat',
          backgroundSize: '280px',
          mixBlendMode: 'soft-light',
        }}
      />
      <Image
        src="/textures/Desen.png"
        alt=""
        fill
        priority
        className="pointer-events-none select-none object-center opacity-80 mix-blend-soft-light"
      />

      {/* İçerik */}
      <div className="relative z-30 w-full max-w-[1400px]">
        {/* Sol tırnak */}
        <span
          className="
    absolute -left-24 -top-10
    hidden md:block
    select-none
    font-serif
    text-[150px]
    leading-none
    text-sky-500/40
  "
          style={{
            textShadow: `
      0 0 12px rgba(56,189,248,.18),
      0 0 30px rgba(56,189,248,.12)
    `,
          }}
        >
          &ldquo;
        </span>

        {/* Sağ tırnak */}
        <span
          className="absolute -right-26 bottom-0 hidden md:block
    select-none
    font-serif
    text-[150px]
    leading-none
    text-sky-500/40"
          style={{
            textShadow: `
      0 0 12px rgba(56,189,248,.18),
      0 0 30px rgba(56,189,248,.12)
    `,
          }}
        >
          &rdquo;
        </span>

        {/* Yazının arkasındaki glow */}
        <div className="absolute left-1/2 top-1/2 -z-10 h-[520px] w-[920px] -translate-x-1/2 -translate-y-[70%] rounded-full bg-cyan-500/12 blur-[180px]" />

        <div className="absolute left-1/2 top-1/2 -z-10 h-[260px] w-[520px] -translate-x-1/2 -translate-y-[80%] rounded-full bg-sky-400/12 blur-[120px]" />

        <div className="text-center">
          <h2
            style={{
              fontFamily: 'ClashDisplay-Variable',
              fontVariationSettings: '"wght" 500',
              letterSpacing: '0.04em',
            }}
            className="
              text-white
              font-semibold
              leading-[1.35]
              text-4xl
              md:text-6xl
              lg:text-[72px]
            "
          >
            Full-stack development is not just about building software;
            <br />
            it&apos;s about crafting digital experiences
            <br />
            that are elegant, scalable, and built for the future.
          </h2>

          <div className="mt-30 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-cyan-400" />
            <span
              style={{
                fontFamily: 'GeneralSans_normal',
              }}
              className="uppercase tracking-[0.18em] text-cyan-400 text-xl lg:text-3xl -translate-x-2"
            >
              NURETTIN DINCER
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
