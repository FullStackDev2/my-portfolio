import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';
import Skills from '@/components/sections/Skills';
import ScrollProgress from '@/components/ui/ScrollProgress';

export default function Home() {
  return (
    <main className="bg-black text-white overflow-hidden">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
