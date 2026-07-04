import type { Metadata } from 'next';
import './globals.css';
import PageTransition from '@/components/layout/PageTransition';
import SmoothScroll from '@/components/ui/SmoothScroll';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const metadata: Metadata = {
  title: 'Nurettin | Full Stack Developer',
  description:
    'Full Stack Developer specializing in Javascript, React, Next.js, Node.js and MongoDB.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="h-full">
      <body className="antialiased bg-[#0a0e1a] text-white">
        {/* SmoothScroll'u PageTransition'ın da dışına, en üste koyuyoruz */}
        <SmoothScroll />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
