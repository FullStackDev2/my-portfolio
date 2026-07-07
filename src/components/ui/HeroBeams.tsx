export default function HeroBeams() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      viewBox="0 0 1600 900"
      preserveAspectRatio="none"
      style={{
        WebkitMaskImage:
          'linear-gradient(to right, black 0%, black 55%, transparent 85%)',
        maskImage:
          'linear-gradient(to right, black 0%, black 55%, transparent 85%)',
      }}
    >
      <defs>
        <filter id="beamBlur">
          <feGaussianBlur stdDeviation="22" />
        </filter>
        <linearGradient id="cyanBeam" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="35%" stopColor="#06b6d4" stopOpacity="0.45" />
          <stop offset="50%" stopColor="#67e8f9" stopOpacity="0.55" />
          <stop offset="65%" stopColor="#06b6d4" stopOpacity="0.45" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <linearGradient id="purpleBeam" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="35%" stopColor="#7c3aed" stopOpacity="0.32" />
          <stop offset="50%" stopColor="#c084fc" stopOpacity="0.5" />
          <stop offset="65%" stopColor="#7c3aed" stopOpacity="0.32" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <linearGradient id="blueBeam" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="35%" stopColor="#2563eb" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.6" />
          <stop offset="65%" stopColor="#2563eb" stopOpacity="0.4" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <g filter="url(#beamBlur)" opacity="0.45">
        <g transform="translate(-260,-140) rotate(-62)">
          <rect width="200" height="1500" rx="90" fill="url(#cyanBeam)" />
        </g>
        <g transform="translate(-460,-260) rotate(-46)">
          <rect width="220" height="1800" rx="130" fill="url(#blueBeam)" />
        </g>
        <g transform="translate(-40,-160) rotate(-48)">
          <rect width="180" height="1400" rx="55" fill="url(#purpleBeam)" />
        </g>
      </g>
    </svg>
  );
}
