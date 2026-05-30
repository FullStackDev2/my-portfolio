import type { Metadata } from 'next';
import './globals.css';
import SmoothScroll from '@/components/ui/SmoothScroll';
import MouseGlow from '@/components/ui/MouseGlow';

export const metadata: Metadata = {
  title: 'Nurettin Portfolio',
  description: 'Cinematic Developer Portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        <MouseGlow />
        {children}
      </body>
    </html>
  );
}
