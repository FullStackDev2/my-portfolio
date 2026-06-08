import type { Metadata } from 'next';
import './globals.css';
import { Geist } from 'next/font/google';
import PageTransition from '@/components/layout/PageTransition';
import '@fortawesome/fontawesome-free/css/all.min.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

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
    <html lang="tr" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
