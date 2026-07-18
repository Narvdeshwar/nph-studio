'use client';
import { motion } from 'framer-motion';


const team = [
  {
    name: 'Founder & Lead Engineer',
    role: 'Full-Stack / AI Specialist',
    description: 'Expert in architecting highly scalable Go backends, Next.js applications, and custom RAG/AI pipelines. Leads all technical strategy and core product development.',
    initials: 'F',
    color: '#FF5A36'
  },
  {
    name: 'Backend Developer',
    role: 'Infrastructure & APIs',
    description: 'Specializes in robust database design, microservices, and third-party integrations. Ensures every product is built on a rock-solid, secure foundation.',
    initials: 'BD',
    color: '#7C3AED'
  },
  {
    name: 'Sales Executive',
    role: 'Client Success & Strategy',
    description: 'Your direct point of contact. Translates your business goals into actionable engineering timelines and ensures seamless communication from kickoff to launch.',
    initials: 'SE',
    color: '#161616'
  }
];

interface TeamMember {
  name: string;
  role: string;
  description: string;
  initials: string;
  color: string;
}

function TeamCard({ member, index }: { member: TeamMember, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative rounded-[32px] p-8 sm:p-12 border border-border bg-surface flex flex-col sm:flex-row gap-8 items-center sm:items-start group overflow-hidden"
    >
      {/* Optimized Hover Glow */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${member.color}, transparent 70%)` }}
      />

      {/* Avatar Placeholder */}
      <div className="w-32 h-32 flex-shrink-0 rounded-full bg-zinc-100 flex items-center justify-center text-3xl font-black text-foreground shadow-inner relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
        <div className="absolute inset-0 opacity-10" style={{ backgroundColor: member.color }} />
        {member.initials}
      </div>

      <div className="flex-1 text-center sm:text-left z-10">
        <span className="text-muted text-sm font-bold uppercase tracking-widest mb-2 block">{member.role}</span>
        <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter mb-4 text-foreground">{member.name}</h3>
        <p className="text-muted leading-relaxed text-lg max-w-2xl">{member.description}</p>
      </div>
      
    </motion.div>
  );
}

export function TeamList() {
  return (
    <section className="w-full bg-background relative z-10 py-32">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col gap-8">
          {team.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
