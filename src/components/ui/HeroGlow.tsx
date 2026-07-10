'use client';

export default function HeroGlow() {
  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Kavis */}
      <div className="hidden lg:block absolute inset-x-0 top-[80px]">
        <svg className="w-full h-[320px]" viewBox="0 0 1920 320" preserveAspectRatio="none" fill="none">
          <defs>
            <linearGradient id="heroArcFade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="10%" stopColor="#3b82f6" stopOpacity=".12" />
              <stop offset="28%" stopColor="#60a5fa" stopOpacity=".9" />
              <stop offset="50%" stopColor="#93c5fd" stopOpacity=".95" />
              <stop offset="72%" stopColor="#60a5fa" stopOpacity=".65" />
              <stop offset="90%" stopColor="#3b82f6" stopOpacity=".12" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Dış glow */}
          <path
            d="M -100 200 Q 960 -105 2020 200"
            stroke="url(#heroArcFade)"
            strokeWidth="8"
            opacity="0.10"
            fill="none"
          />

          {/* Glow */}
          <path
            d="M -100 200 Q 960 -105 2020 200"
            stroke="url(#heroArcFade)"
            strokeWidth="3.5"
            opacity="0.18"
            fill="none"
          />

          {/* Ana çizgi */}
          <path d="M -100 200 Q 960 -105 2020 200" stroke="url(#heroArcFade)" strokeWidth="2.2" fill="none" />
        </svg>
      </div>

      {/* Ortadaki ışık — geniş glow katmanları çizginin ÜSTÜNE taşmasın diye kırpılıyor */}
      <div
        className="
    hidden lg:block
    absolute
    left-1/2
    top-[128px]
    -translate-x-1/2
    w-[1200px]
    h-[400px]
    overflow-hidden
    min-[1280px]:max-[1810px]:[border-top-left-radius:100%_100%]
    min-[1280px]:max-[1810px]:[border-top-right-radius:100%_100%]
    max-xl:[border-top-left-radius:100%_100%]
    max-xl:[border-top-right-radius:100%_100%]
  "
      >
        <div
          className="
            absolute
            left-1/2
            top-0
            -translate-x-1/2
            -translate-y-1/2
            w-[1000px]
            h-[600px]
            rounded-full
            bg-[radial-gradient(ellipse_at_top,rgba(125,211,252,.18)_0%,rgba(56,189,248,.08)_30%,rgba(30,64,175,.03)_55%,transparent_75%)]
            blur-[35px]
          "
        />

        {/* Dış halo — geniş, çok yumuşak */}
        <div
          className="
            absolute
            left-1/2
            top-0
            -translate-x-1/2
            -translate-y-1/2

            w-40
            h-40
            rounded-full

            bg-sky-300/15

            blur-[28px]
          "
        />

        {/* Ana glow — çizgi yönünde uzun, yumuşak geçişli kapsül */}
        <div
          className="
            absolute
            left-1/2
            top-0
            -translate-x-1/2
            -translate-y-1/2
            w-56
            h-8
            rounded-full
            bg-sky-200/25
            blur-xl
          "
        />

        {/* İç glow — çizgiye daha yakın, daha dar kapsül */}
        <div
          className="
            absolute
            left-1/2
            top-0
            -translate-x-1/2
            -translate-y-1/2

            w-28
            h-4
            rounded-full

            bg-cyan-200/35

            blur-md
          "
        />

        {/* Sol tarafa doğru uzayan parlaklık */}
        <div
          className="
    absolute
    left-[51%]
    top-0
    -translate-x-1/2
    -translate-y-1/3
    w-[600px]
    h-[360px]
    rounded-full
    bg-[radial-gradient(ellipse_at_center,rgba(125,211,252,.14)_0%,rgba(56,189,248,.06)_40%,transparent_75%)]
    blur-[28px]
  "
        />
      </div>

      {/* Çekirdek + flare'ler — çizginin tam üstünde, kırpılmadan */}
      <div
        className="
          hidden lg:block
          absolute
          left-1/2
          top-[128px]
          -translate-x-1/2
          -translate-y-1/2
        "
      >
        {/* Lens flare */}
        <div
          className="
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            w-[260px]
            h-px
            bg-gradient-to-r
            from-transparent
            via-sky-300
            to-transparent
            opacity-70
          "
        />

        {/* Dikey flare */}
        <div
          className="
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2

            h-10
            w-px

            bg-gradient-to-b
            from-transparent
            via-sky-300
            to-transparent

            opacity-40
          "
        />

        {/* Çok yakın parlama — çekirdeğin hemen etrafı, çizgi yönünde uzun */}
        <div
          className="
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2

            w-14
            h-2.5
            rounded-full

            bg-sky-200/70

            blur-sm
          "
        />

        {/* Çekirdek */}
        <div
          className="
            relative
            w-5
            h-3
            rounded-full
            bg-sky-50
            shadow-[0_0_15px_4px_rgba(186,230,253,.95),0_0_35px_12px_rgba(125,211,252,.65),0_0_75px_28px_rgba(56,189,248,.35),0_0_140px_55px_rgba(37,99,235,.15)]
          "
        />
      </div>

      <div
        className="
          absolute
          top-[58%]
          left-[5%]
          w-[260px]
          h-[260px]
          rounded-full
          bg-emerald-400/12
          blur-2xl
        "
      />

      {/* Sağ ambient */}
      <div
        className="
          absolute
          top-[28%]
          right-[2%]
          w-[260px]
          h-[260px]
          rounded-full
          bg-emerald-400/12
          blur-2xl
        "
      />
    </div>
  );
}
