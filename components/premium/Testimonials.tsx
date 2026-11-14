'use client';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "NPH Studio took our product from concept wireframes to a live, revenue-generating MVP in 4 weeks. Their technical rigor with Next.js and Supabase allowed us to onboard our first 500 paid users without a single infrastructure hiccup.",
    name: "Sachin Sharma",
    role: "Founder & Lead Educator",
    company: "SSS Online Academy"
  },
  {
    quote: "We needed our emergency patient services and hospital department directory digitized fast. NPH Studio delivered an ultra-responsive, accessible platform with sub-second page loads that streamlined our patient communication.",
    name: "Dr. R. K. Singh",
    role: "Director of Operations",
    company: "Care Well Hospital"
  },
  {
    quote: "Their RAG and automated AI pipeline processing saved our editorial desk over 20 hours a week. NPH Studio operates as a true technical partner, not just a dev shop.",
    name: "Devendra Verma",
    role: "Head of Product",
    company: "AIBulletin Media"
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
                  <h3 className="font-bold text-foreground">{testimonial.name}</h3>
                  <p className="text-xs text-primary font-medium tracking-wide">{testimonial.company}</p>
                  <p className="text-xs text-muted">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
