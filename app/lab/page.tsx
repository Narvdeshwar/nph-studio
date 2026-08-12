import Link from 'next/link';
import { Footer } from '@/components/premium/Footer';
import { IconFlask, IconArrowUpRight } from '@tabler/icons-react';

const experiments = [
  {
    id: 'holographic',
    name: 'Holographic UI',
    desc: 'Spatial Web Interface',
    color: '#3B82F6',
    status: 'Active'
  },
  // {
  //   id: 'cell',
  //   name: 'Biological Cell',
  //   desc: 'Interactive Organelles',
  //   color: '#8B5CF6',
  //   status: 'Active'
  // },
  {
    id: 'torus',
    name: 'Magnetic Torus',
    desc: 'Physics & Particles',
    color: '#F97316',
    status: 'Active'
  }
];

export default function LabIndexPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30">

      <div className="flex-1 pt-32 pb-24 px-6 sm:px-12 md:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <IconFlask className="text-primary" size={32} />
              <span className="text-primary font-bold tracking-widest uppercase text-sm">The Lab</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-[0.9] max-w-3xl mb-8">
              Experimental <br />
              <span className="text-muted">3D Interfaces</span>
            </h1>
            <p className="text-xl text-muted max-w-2xl leading-relaxed">
              A collection of exploratory 3D web experiences, spatial interfaces, and interactive physics simulations built with React Three Fiber.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiments.map((exp) => (
              <Link href={`/lab/${exp.id}`} key={exp.id}>
                <div className="group relative bg-surface border border-border rounded-3xl p-8 h-[300px] flex flex-col justify-between overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:border-white/20 hover:shadow-2xl hover:shadow-primary/5 cursor-pointer">
                  {/* Glow */}
                  <div
                    className="absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-700 pointer-events-none"
                    style={{ backgroundColor: exp.color }}
                  />

                  <div className="flex justify-between items-start relative z-10">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted border border-border px-3 py-1 rounded-full">
                      {exp.status}
                    </span>
                    <span className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300">
                      <IconArrowUpRight size={20} />
                    </span>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 group-hover:text-primary transition-colors">{exp.name}</h3>
                    <p className="text-muted text-sm">{exp.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
