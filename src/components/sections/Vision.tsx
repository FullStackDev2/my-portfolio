export default function Vision() {
  return (
    <section
      id="vision"
      className="relative min-h-[105vh] overflow-hidden bg-[#020617] flex items-center justify-center px-10 py-20"
    >
      {/* Sağ üst ışık */}
      <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[200px]" />

      {/* Sol alt ışık */}
      <div className="absolute left-0 bottom-0 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[200px]" />

      <div className="relative w-full max-w-[1400px]">
        {/* Sol tırnak - Daha Büyük */}
        <span className="absolute -left-14 -top-10 text-[120px] md:text-[150px] leading-none font-serif text-sky-900/60 select-none hidden md:block">
          &ldquo;
        </span>

        {/* Sağ alt tırnak - Daha Büyük */}
        <span className="absolute -right-14 bottom-0 text-[120px] md:text-[150px] leading-none font-serif text-sky-900/60 select-none hidden md:block">
          &rdquo;
        </span>

        {/* Yazı */}
        <div className="text-center">
          <h2
            className="
              w-full
              text-white
              font-semibold
              tracking-[-0.04em]
              leading-[1.3]
              text-4xl
              md:text-6xl
              lg:text-[72px]
              xl:text-[67px]
            "
          >
            Engineering is not just about solving problems;
            <br />
            it&apos;s about defining the future through elegant
            <br />
            architecture.
          </h2>

          {/* Alt yazı */}
          <div className="mt-20 flex items-center justify-center gap-4">
            <div className="h-px w-11 bg-sky-400" />
            <span className="uppercase text-sky-400 tracking-[0.15em] text-lg md:text-xl lg:text-3xl font-medium">
              NURETTIN DINCER
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
