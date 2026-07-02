// components/SectionGlow.tsx
'use client';

type GlowColor = 'blue' | 'teal' | 'purple' | 'pink';

interface GlowSpot {
  color: GlowColor;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  size?: number; // px, default 380
  opacity?: number; // default 0.2
  blur?: number; // px, default 70
  animate?: 'drift1' | 'drift2' | 'none';
  translateX?: boolean; // -translate-x-1/2 için, ortalamak gerektiğinde
}

interface SectionGlowProps {
  spots: GlowSpot[];
}

const colorMap: Record<GlowColor, string> = {
  blue: '#4facfe',
  teal: '#2dd4bf',
  purple: '#8b5cf6',
  pink: '#ec4899',
};

export default function SectionGlow({ spots }: SectionGlowProps) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      {spots.map((spot, i) => {
        const {
          color,
          top,
          bottom,
          left,
          right,
          size = 380,
          opacity = 0.2,
          blur = 70,
          animate = 'none',
          translateX = false,
        } = spot;

        return (
          <div
            key={i}
            className={`absolute rounded-full ${
              animate !== 'none' ? `animate-${animate}` : ''
            } ${translateX ? '-translate-x-1/2' : ''}`}
            style={{
              top,
              bottom,
              left,
              right,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: colorMap[color],
              filter: `blur(${blur}px)`,
              opacity,
            }}
          />
        );
      })}
    </div>
  );
}
