'use client';
import { motion } from 'framer-motion';
import { IconPhoneCall, IconFileText, IconHammer, IconRocket } from '@tabler/icons-react';

const steps = [
  {
    num: "01",
    title: "Discovery Call",
    desc: "We discuss your idea, target audience, and business goals to scope the exact requirements.",
    icon: <IconPhoneCall size={20} />
  },
  {
    num: "02",
    title: "Proposal & Timeline",
    desc: "You get a clear, upfront cost and week-by-week delivery schedule. No hidden fees.",
    icon: <IconFileText size={20} />
  },
  {
    num: "03",
    title: "Build & Weekly Updates",
    desc: "We build fast. You get staging links and progress reports every week so you're never in the dark.",
    icon: <IconHammer size={20} />
  },
  {
    num: "04",
    title: "Launch & Handover",
    desc: "We deploy to production, hand over the codebase, and ensure everything runs perfectly.",
    icon: <IconRocket size={20} />
  }
];

export function ProcessTimeline() {
  return (
    <section className="w-full py-24 bg-white relative">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-[32px] sm:text-[40px] font-medium text-foreground mb-4">How we work</h2>
          <p className="text-[16px] text-muted max-w-[400px] mx-auto">
            A transparent, predictable process so you never have to wonder "what is the team doing?"
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connecting Line for desktop */}
          <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-border z-0">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-14 h-14 rounded-full bg-white border-2 border-primary text-primary flex items-center justify-center mb-6 shadow-sm transition-colors group-hover:bg-primary group-hover:text-white"
              >
                {step.icon}
              </motion.div>
              <div className="text-[12px] font-bold text-primary mb-2">{step.num}</div>
              <h3 className="text-[18px] font-medium text-foreground mb-3">{step.title}</h3>
              <p className="text-[14px] text-muted leading-relaxed max-w-[220px]">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
