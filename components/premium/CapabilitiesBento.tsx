'use client';
import { motion } from 'framer-motion';
import { IconCpu, IconShieldCheck, IconUsers, IconRocket } from '@tabler/icons-react';
import { GlareCard } from '@/components/premium/GlareCard';

export function CapabilitiesBento() {
  return (
    <section className="py-28 sm:py-32 relative z-10 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20">

        <div className="mb-16">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary mb-4">
            The Agency Advantage
          </h2>
          <p className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-foreground leading-[0.95]">
            Engineered For Speed, Scale <br className="hidden sm:inline" />
            <span className="text-primary">& Zero Technical Debt.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">

          {/* Bento Box 1: Senior & Founder-Led (Spans 2 cols) */}
          <GlareCard className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 bg-surface border border-border rounded-[32px] p-8 sm:p-10 relative overflow-hidden group hover:border-primary/50 transition-colors h-full flex flex-col justify-between"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div>
                <IconUsers className="text-primary mb-5" size={32} />
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter mb-3">
                  Senior & Founder-Led Execution
                </h3>
                <p className="text-muted text-base sm:text-lg max-w-xl leading-relaxed">
                  Direct collaboration with technical directors who architect and write your code. Zero junior handoffs, no account-manager telephone games, and direct access on a dedicated Slack or WhatsApp channel.
                </p>
              </div>

              {/* Decorative Pill Badges */}
              <div className="flex flex-wrap gap-2 pt-4">
                <span className="text-xs font-mono font-medium bg-background/80 border border-border px-3 py-1 rounded-full text-foreground/80">
                  Direct Architect Access
                </span>
                <span className="text-xs font-mono font-medium bg-background/80 border border-border px-3 py-1 rounded-full text-foreground/80">
                  Daily Async Updates
                </span>
                <span className="text-xs font-mono font-medium bg-primary/10 border border-primary/20 px-3 py-1 rounded-full text-primary font-semibold">
                  Zero Outsourcing
                </span>
              </div>
            </motion.div>
          </GlareCard>

          {/* Bento Box 2: Speed / Sprints */}
          <GlareCard>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-surface border border-border rounded-[32px] p-8 sm:p-10 relative overflow-hidden group hover:border-secondary/50 transition-colors flex flex-col justify-between h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div>
                <IconRocket className="text-secondary mb-5" size={32} />
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter mb-3">
                  Launch in 3–5 Weeks
                </h3>
                <p className="text-muted text-sm sm:text-base leading-relaxed">
                  Structured 2-week sprint cycles with live staging deployments every 7 days. You test running production software from week one.
                </p>
              </div>
              <div className="pt-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-3 py-1.5 rounded-full">
                  ⚡ Weekly Staging Demos
                </span>
              </div>
            </motion.div>
          </GlareCard>

          {/* Bento Box 3: 100% IP & Code Ownership */}
          <GlareCard>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-foreground text-background border border-foreground rounded-[32px] p-8 sm:p-10 relative overflow-hidden group flex flex-col justify-between h-full"
            >
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:20px_20px]" />
              <div>
                <IconShieldCheck className="text-background opacity-60 mb-5" size={32} />
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter mb-3 text-background">
                  100% IP & Code Ownership
                </h3>
                <p className="text-background/70 text-sm sm:text-base leading-relaxed">
                  You own every line of code, database schema, and asset from day one. Clean GitHub repositories, complete documentation, zero platform lock-in.
                </p>
              </div>
              <div className="pt-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-background/90 bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
                  🔒 Clean GitHub Transfer
                </span>
              </div>
            </motion.div>
          </GlareCard>

          {/* Bento Box 4: Applied AI & RAG (Spans 2 cols) */}
          <GlareCard className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2 bg-[#0A0A0A] border border-zinc-800 rounded-[32px] p-8 sm:p-10 relative overflow-hidden group h-full flex flex-col justify-between"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div>
                <IconCpu className="text-purple-400 mb-5" size={32} />
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-white mb-3">
                  Applied AI & Enterprise RAG Pipelines
                </h3>
                <p className="text-zinc-400 text-base sm:text-lg max-w-xl leading-relaxed">
                  We don&apos;t just wrap basic API prompts. We engineer custom vector retrieval pipelines (pgvector, Pinecone), semantic search, and autonomous agents grounded in your private enterprise data.
                </p>
              </div>

              {/* Decorative Code block */}
              <div className="hidden md:block absolute -bottom-12 -right-4 w-72 h-52 bg-black/90 border border-zinc-800 rounded-tl-2xl shadow-2xl p-5 font-mono text-xs text-green-400 opacity-60 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-500">
                <p className="text-zinc-500">{"// Production RAG Pipeline"}</p>
                <p className="mt-1">{`const vectorStore = new pgvector();`}</p>
                <p className="mt-1">{`const context = await retrieve(query);`}</p>
                <p className="mt-1 text-primary">{`const response = await stream({`}</p>
                <p className="ml-4">{`model: "claude-3-5-sonnet",`}</p>
                <p className="ml-4">{`groundingData: context`}</p>
                <p>{`});`}</p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 relative z-10">
                <span className="text-xs font-mono font-medium bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-zinc-300">
                  Vector Retrieval
                </span>
                <span className="text-xs font-mono font-medium bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-zinc-300">
                  Private Data Grounding
                </span>
                <span className="text-xs font-mono font-medium bg-purple-900/30 border border-purple-700/50 px-3 py-1 rounded-full text-purple-300">
                  Sub-Second Streaming
                </span>
              </div>
            </motion.div>
          </GlareCard>

        </div>

      </div>
    </section>
  );
}
