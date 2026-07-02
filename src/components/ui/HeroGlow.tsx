'use client';

export default function HeroGlow() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      <div className="absolute top-[5%] left-[7%] w-[380px] h-[380px] rounded-full bg-[#4facfe] blur-[70px] opacity-[0.21] animate-drift1" />
      <div className="absolute top-[22%] right-[8%] w-[300px] h-[300px] rounded-full bg-[#2dd4bf] blur-[70px] opacity-[0.25] animate-drift2" />
    </div>
  );
}
