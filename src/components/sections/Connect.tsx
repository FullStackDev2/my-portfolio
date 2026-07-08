import Image from 'next/image';
import RotatingWord from '../layout/RotatingWord';

export default function Connect() {
  return (
    <section
      id="connect"
      className="relative min-h-[105vh] w-full flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cyber_security.jpg"
          alt="Security Background"
          fill
          priority
          className="object-cover translate-x-35 opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/40 via-[#020617]/20 to-[#020617]/50" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center px-5">
        <h2 className="flex flex-col items-center font-semibold text-white tracking-tighter leading-[0.9]">
          <span className="text-5xl sm:text-6xl md:text-[3.8rem] lg:text-[6rem]">
            LET&#39;S BUILD
          </span>

          <span className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4 md:translate-x-10 lg:translate-x-24">
            <span className="text-5xl sm:text-6xl md:text-[3.8rem] lg:text-[6rem]">
              SOMETHING&nbsp;
            </span>

            <span className="inline-flex justify-center sm:justify-start min-w-[8ch] sm:min-w-[10ch] md:min-w-[11ch] lg:min-w-[14ch] text-5xl sm:text-6xl md:text-[3.8rem] lg:text-[6rem]">
              <RotatingWord />
            </span>
          </span>
        </h2>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/85 font-medium max-w-3xl mx-auto leading-relaxed mt-8 sm:mt-12 lg:mt-16 px-2">
          I am currently available for high-impact partnerships and ambitious
          software projects.
        </p>
      </div>
    </section>
  );
}
