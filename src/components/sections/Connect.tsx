import Image from 'next/image';

export default function Connect() {
  return (
    <section
      id="connect"
      className="relative min-h-[105vh] w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-[#020617]"
    >
      {/* Arka Plan: Kilit Görseli - Opacity 30 yapılarak biraz daha belirginleşti */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cyber_security.jpg"
          alt="Security Background"
          fill
          priority
          className="object-cover opacity-20"
        />
        {/* Overlay - Alpha değerleri düşürülerek arka planın aydınlanması sağlandı */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/40 via-[#020617]/20 to-[#020617]/50" />
      </div>

      {/* İçerik */}
      <div className="relative z-10 w-full max-w-1xl text-center">
        <h2 className="flex flex-col items-center text-6xl md:text-8xl lg:text-[6rem] font-semibold text-white tracking-tighter leading-[0.9] mb-12 gap-4">
          <span>LET&#39;S BUILD</span>
          <span>
            SOMETHING <span className="text-cyan-400">LEGENDARY</span>
          </span>
        </h2>

        {/* Metin - text-white ve font-medium ile daha parlak ve canlı */}
        <p className="text-lg md:text-2xl lg:text-2xl text-white/85 font-medium max-w-3xl mx-auto leading-relaxed mt-16">
          I am currently available for high-impact partnerships and ambitious
          software projects.
        </p>
      </div>
    </section>
  );
}
