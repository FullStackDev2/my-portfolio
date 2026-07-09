import type { Metadata } from 'next';
import './globals.css';
import PageTransition from '@/components/layout/PageTransition';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {
  generalSansBold,
  generalSansMedium,
  bespokeSerifMedium,
  bespokeSerifNumber,
  manropeRegular,
  manropeSemibold,
  clashDisplay,
} from './fonts';

export const metadata: Metadata = {
  title: 'Nurettin | Full Stack Developer',
  description: 'Full Stack Developer specializing in Javascript, React, Next.js, Node.js and MongoDB.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="tr"
      className={`h-full ${generalSansBold.variable} ${generalSansMedium.variable} ${bespokeSerifMedium.variable} ${bespokeSerifNumber.variable} ${manropeRegular.variable} ${manropeSemibold.variable} ${clashDisplay.variable}`}
    >
      <body className="antialiased bg-[#0a0e1a] text-white">
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
