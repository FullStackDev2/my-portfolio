import localFont from 'next/font/local';

export const generalSansBold = localFont({
  src: '../../public/fonts/GeneralSans-Bold.woff2',
  display: 'swap',
  weight: '700',
  variable: '--font-general-bold',
});

export const generalSansMedium = localFont({
  src: '../../public/fonts/GeneralSans-Medium.woff2',
  display: 'swap',
  weight: '500',
  variable: '--font-general-medium',
});

export const bespokeSerifMedium = localFont({
  src: '../../public/fonts/BespokeSerif-Medium.woff2',
  display: 'swap',
  weight: '600',
  variable: '--font-bespoke-serif',
});

export const bespokeSerifNumber = localFont({
  src: '../../public/fonts/BespokeSerif-Variable.woff2',
  display: 'swap',
  weight: '400 700',
  variable: '--font-bespoke-number',
  preload: false, // ✅
});

export const manropeRegular = localFont({
  src: '../../public/fonts/Manrope-Regular.woff2',
  display: 'swap',
  weight: '400',
  variable: '--font-manrope-regular',
  preload: false, // ✅ eklendi
});

export const manropeSemibold = localFont({
  src: '../../public/fonts/Manrope-SemiBold.woff2',
  display: 'swap',
  weight: '600',
  variable: '--font-manrope-semibold',
  preload: false, // ✅
});

export const clashDisplay = localFont({
  src: '../../public/fonts/ClashDisplay-Medium.woff2',
  display: 'swap',
  weight: '500',
  variable: '--font-clash',
});
