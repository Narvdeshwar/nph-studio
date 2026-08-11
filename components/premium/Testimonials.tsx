'use client';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "NPH Studio delivered our MVP in 3 weeks, something other agencies quoted 3 months for. Their technical depth and speed are unmatched.",
    name: "Alex Reed",
    role: "Founder, SaaS Startup",
    company: "Acme Corp"
  },
  {
    quote: "They integrated a custom RAG pipeline into our existing database seamlessly. It completely transformed how our users interact with our platform.",
    name: "Sarah Jenkins",
    role: "CTO, FinTech Scaleup",
    company: "Global Tech"
  },
  {
    quote: "The visual polish and engineering quality we received was world-class. It feels like an in-house elite team without the overhead.",
    name: "David Chen",
    role: "CEO, E-commerce Brand",
    company: "NextRetail"
  }
];

export function Testimonials() {
  return (
    <section className="py-32 relative z-10 bg-background border-t border-border">
      <div className="max-w-[1400px] mx-auto px-8 sm:px-20">
        <div className="mb-16">
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Client Feedback</h2>
          <p className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-foreground leading-[0.9]">
            Don&apos;t Just Take <br /> Our Word For It.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-surface border border-border flex flex-col justify-between group hover:border-primary/50 transition-colors"
            >
              <p className="text-lg text-foreground/80 font-medium leading-relaxed mb-12">
                &quot;{testimonial.quote}&quot;
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-lg text-white">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
