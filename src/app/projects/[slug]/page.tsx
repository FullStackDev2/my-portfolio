import Image from 'next/image';
import { projects } from '@/data/projects';
import { notFound } from 'next/navigation';
import Reveal from '@/components/ui/Reveal';

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) return notFound();

  return (
    <main className="min-h-screen text-white">
      <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16">
        {/* LEFT - STICKY IMAGE */}
        <div className="md:sticky md:top-24 h-fit">
          <div className="relative w-full h-[500px] rounded-2xl overflow-hidden border border-white/10">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* RIGHT - CONTENT */}
        <div className="space-y-16">
          {/* HERO */}
          <Reveal>
            <div>
              <p className="text-white/40 uppercase tracking-[0.3em] mb-4">
                Case Study
              </p>

              <h1 className="text-5xl font-black mb-6">{project.title}</h1>

              <p className="text-white/60">{project.description}</p>
            </div>
          </Reveal>

          {/* OVERVIEW */}
          <Reveal>
            <section>
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-white/60 leading-relaxed">
                This project was designed as a modern SaaS interface with focus
                on scalability, performance and clean UX.
              </p>
            </section>
          </Reveal>

          {/* FEATURES */}
          <Reveal>
            <section>
              <h2 className="text-2xl font-bold mb-4">Features</h2>

              <ul className="space-y-3 text-white/60">
                <li>• Authentication system</li>
                <li>• Admin dashboard</li>
                <li>• Real-time updates</li>
                <li>• Responsive UI</li>
              </ul>
            </section>
          </Reveal>

          {/* TECH */}
          <Reveal>
            <section>
              <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-sm rounded-full border border-white/10 text-white/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </section>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
