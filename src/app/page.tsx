import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';
import Skills from '@/components/sections/Skills';
import ScrollProgress from '@/components/ui/ScrollProgress';
import Vision from '@/components/sections/Connect';
import Connect from '@/components/sections/Vision';

export default function Home() {
  return (
    <main className="text-white min-h-screen relative w-full selection:bg-white selection:text-black bg-[#0a0e1a]">
      <ScrollProgress />
      <Navbar />

      {/* Section Akışı */}
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Vision />
      <Connect />
      <Contact />
      <Footer />
    </main>
  );
}
