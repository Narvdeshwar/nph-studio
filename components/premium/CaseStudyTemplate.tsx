"use client";
import { motion, useScroll, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import {
  IconArrowLeft,
  IconArrowUpRight,
  IconCheck,
  IconTarget,
  IconCode,
  IconExternalLink,
  IconDeviceDesktop,
  IconDeviceTablet,
  IconDeviceMobile,
  IconBrandNextjs,
  IconBrandTailwind,
  IconBrandSupabase,
  IconBrandFramer,
  IconBrandGolang,
  IconBrandReact,
  IconDatabase,
  IconBrandStripe,
  IconBrandAws,
} from "@tabler/icons-react";
import { Magnetic } from "@/components/premium/Magnetic";
import { Footer } from "@/components/premium/Footer";
import { GlareCard } from "@/components/premium/GlareCard";
import { CaseStudyData } from "@/data/case-studies";

// Tech Icon Helper
function TechIcon({ name }: { name: string }) {
  switch (name.toLowerCase()) {
    case "next.js":
      return <IconBrandNextjs size={16} />;
    case "tailwind css":
      return <IconBrandTailwind size={16} />;
    case "supabase":
      return <IconBrandSupabase size={16} />;
    case "framer motion":
      return <IconBrandFramer size={16} />;
    case "golang":
      return <IconBrandGolang size={16} />;
    case "react":
      return <IconBrandReact size={16} />;
    case "postgresql":
      return <IconDatabase size={16} />;
    case "stripe":
      return <IconBrandStripe size={16} />;
    case "aws s3":
      return <IconBrandAws size={16} />;
    default:
      return <IconCode size={16} />;
  }
}

// Counting Number Component
function Counter({ value, color }: { value: string; color: string }) {
  const nodeRef = useRef<HTMLParagraphElement>(null);
  const [inView, setInView] = useState(false);

  // Extract number and suffix (e.g. "64.5" and "K")
  const numMatch = value.match(/[\d.]+/);
  const textMatch = value.match(/[^\d.]+/);
  const numValue = numMatch ? parseFloat(numMatch[0]) : 0;
  const suffix = textMatch ? textMatch[0] : "";
  const isFloat = numValue % 1 !== 0;

  useEffect(() => {
    if (!inView) return;

    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(0, numValue, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        if (node) {
          node.textContent =
            (isFloat ? value.toFixed(1) : Math.floor(value)) + suffix;
        }
      },
    });
    return () => controls.stop();
  }, [inView, numValue, suffix, isFloat]);

  return (
    <motion.p
      ref={nodeRef}
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true, margin: "-100px" }}
      className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter mb-4 drop-shadow-2xl"
      style={{ color }}
    >
      0{suffix}
    </motion.p>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

export function CaseStudyTemplate({ study }: { study: CaseStudyData }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Device View State for Iframe
  const [deviceView, setDeviceView] = useState<"desktop" | "tablet" | "mobile">(
    "desktop",
  );

  return (
    <div
      ref={containerRef}
      className="bg-slate-50 text-slate-900 selection:bg-slate-200 selection:text-slate-900"
    >
      {/* Navigation */}
      <nav className="fixed top-24 sm:top-28 left-0 w-full p-6 sm:px-10 z-[100] pointer-events-none">
        <div className="pointer-events-auto flex justify-start">
          <Magnetic>
            <Link
              href="/work"
              className="inline-flex items-center gap-3 text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-600 hover:text-slate-900 transition-colors group backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 bg-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
            >
              <IconArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back
            </Link>
          </Magnetic>
        </div>
      </nav>

      {/* Hero Section - Sticky Editorial Style */}
      <section
        className="relative h-[100vh] w-full flex items-center justify-center overflow-hidden bg-slate-50"
      >
        {/* Glow */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] opacity-10 blur-[100px]"
            style={{
              background: `radial-gradient(circle, ${study.color}, transparent 70%)`,
            }}
          />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 z-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,black_1px,transparent_1px)] bg-[size:24px_24px]" />

        <motion.div
          style={{ y, opacity, scale }}
          className="relative z-10 w-full px-4 flex flex-col items-center text-center mt-20 will-change-transform"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-8 px-5 py-2.5 rounded-full bg-white/50 border border-slate-200 backdrop-blur-xl shadow-sm"
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: study.color }}
            />
            <span className="font-bold uppercase tracking-widest text-xs sm:text-sm text-slate-700">
              {study.category}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12vw] font-black uppercase tracking-tighter text-slate-900 leading-[0.8] mb-8"
          >
            {study.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg sm:text-2xl text-slate-600 max-w-3xl leading-relaxed font-medium"
          >
            {study.overview}
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Scroll to Explore
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-slate-300 to-transparent" />
        </motion.div>
      </section>

      {/* Content Sections */}
      <section className="relative z-20 bg-white rounded-t-[40px] border-t border-slate-200 shadow-[0_-40px_100px_rgba(0,0,0,0.05)] pb-40">
        {/* Interactive Iframe Viewer */}
        {study.link && (
          <div className="px-4 sm:px-10 -mt-[10vh] sm:-mt-[15vh] mb-32 relative z-30">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[1400px] mx-auto"
            >
              <div className="w-full rounded-[40px] border border-slate-200 bg-white p-4 sm:p-6 shadow-xl relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent rounded-[40px] pointer-events-none" />

                {/* Browser Bar */}
                <div className="flex items-center justify-between mb-4 px-4 relative z-10">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-100 border border-slate-200 px-4 py-1.5 rounded-full backdrop-blur-md">
                    <IconExternalLink size={12} className="text-slate-400" />
                    <span className="text-xs font-mono text-slate-500">
                      {study.link.replace(/^https?:\/\//, "")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 relative z-50 pointer-events-auto">
                    <button
                      type="button"
                      onClick={() => setDeviceView("desktop")}
                      className={`p-1.5 rounded-md transition-colors cursor-pointer ${deviceView === "desktop" ? "bg-slate-200 text-slate-900" : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"}`}
                    >
                      <IconDeviceDesktop size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeviceView("tablet")}
                      className={`p-1.5 rounded-md transition-colors cursor-pointer ${deviceView === "tablet" ? "bg-slate-200 text-slate-900" : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"}`}
                    >
                      <IconDeviceTablet size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeviceView("mobile")}
                      className={`p-1.5 rounded-md transition-colors cursor-pointer ${deviceView === "mobile" ? "bg-slate-200 text-slate-900" : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"}`}
                    >
                      <IconDeviceMobile size={16} />
                    </button>
                  </div>
                </div>

                {/* The Iframe */}
                <div className="w-full flex justify-center bg-slate-50 rounded-[24px] py-4">
                  <div
                    className="bg-white rounded-[24px] overflow-hidden border border-slate-200 relative z-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-sm"
                    style={{
                      width:
                        deviceView === "desktop"
                          ? "100%"
                          : deviceView === "tablet"
                            ? "768px"
                            : "375px",
                      aspectRatio:
                        deviceView === "desktop"
                          ? "16/10"
                          : deviceView === "tablet"
                            ? "3/4"
                            : "9/16",
                      maxWidth: "100%",
                    }}
                  >
                    <iframe
                      src={study.link}
                      className="w-full h-full object-cover"
                      title={`${study.title} Live Preview`}
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin allow-popups"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        <div className="max-w-[1400px] mx-auto px-4 sm:px-10 space-y-8 mt-32">
          {/* Bento Box: Challenge vs Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div {...fadeUp} className="h-full">
              <GlareCard className="h-full bg-slate-50 border border-slate-200 p-10 sm:p-16 rounded-[40px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-12">
                    <span className="w-16 h-16 rounded-3xl flex items-center justify-center bg-white text-slate-400 border border-slate-200 shadow-sm">
                      <IconTarget size={28} />
                    </span>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      The Challenge
                    </h2>
                  </div>
                  <p
                    className="text-2xl sm:text-4xl text-slate-900 leading-tight font-medium tracking-tight"
                    style={{ transform: "translateZ(50px)" }}
                  >
                    {study.problem}
                  </p>
                </div>
              </GlareCard>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="h-full group"
            >
              <GlareCard className="h-full bg-slate-50 border border-slate-200 p-10 sm:p-16 rounded-[40px] relative overflow-hidden">
                <div
                  className="absolute top-0 right-0 w-96 h-96 opacity-[0.05] pointer-events-none translate-x-1/3 -translate-y-1/3 group-hover:opacity-10 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(circle, ${study.color}, transparent 70%)`,
                  }}
                />
                <div>
                  <div className="flex items-center gap-4 mb-12">
                    <span
                      className="w-16 h-16 rounded-3xl flex items-center justify-center shadow-sm"
                      style={{
                        backgroundColor: `${study.color}15`,
                        color: study.color,
                        borderColor: `${study.color}30`,
                        borderWidth: 1,
                      }}
                    >
                      <IconCheck size={28} />
                    </span>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      The Solution
                    </h2>
                  </div>
                  <p
                    className="text-2xl sm:text-4xl text-slate-900 leading-tight font-medium tracking-tight"
                    style={{ transform: "translateZ(50px)" }}
                  >
                    {study.solution}
                  </p>
                </div>
              </GlareCard>
            </motion.div>
          </div>

          {/* Bento Box: Key Features & Tech Stack Marquee */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <motion.div {...fadeUp} className="lg:col-span-8 h-full">
              <GlareCard className="h-full bg-slate-50 border border-slate-200 p-10 sm:p-16 rounded-[40px]">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-12">
                  Key Capabilities
                </h2>
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10"
                  style={{ transform: "translateZ(30px)" }}
                >
                  {study.features?.map((feature, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex shrink-0 items-center justify-center shadow-sm"
                        style={{ color: study.color }}
                      >
                        <IconCheck size={18} />
                      </div>
                      <span className="text-lg font-medium text-slate-800 leading-snug mt-1.5">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </GlareCard>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="lg:col-span-4 h-full"
            >
              <GlareCard className="h-full bg-slate-50 border border-slate-200 p-10 sm:p-12 rounded-[40px] flex flex-col relative overflow-hidden group">
                <div
                  className="absolute inset-0 opacity-[0.03] blur-[80px] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none"
                  style={{ background: study.color }}
                />
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8 relative z-10">
                  Technology Stack
                </h2>

                <div
                  className="flex flex-wrap gap-3 mt-auto relative z-10"
                  style={{ transform: "translateZ(40px)" }}
                >
                  {study.techStack?.map((tech, i) => (
                    <div
                      key={i}
                      className="px-5 py-2.5 rounded-full bg-white border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-all cursor-default flex items-center gap-2 shadow-sm"
                    >
                      <TechIcon name={tech} />
                      {tech}
                    </div>
                  ))}
                </div>
              </GlareCard>
            </motion.div>
          </div>

          {/* Bento Box: High-Impact Metrics & Results */}
          {((study.metrics && study.metrics.length > 0) ||
            (study.results && study.results.length > 0)) && (
            <motion.div
              {...fadeUp}
              className="bg-slate-50 border border-slate-200 p-10 sm:p-16 md:p-24 rounded-[40px] relative overflow-hidden"
            >
              {/* Complex Mesh Gradient Background */}
              <div
                className="absolute top-0 right-0 w-full h-full opacity-[0.05] pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 80% 20%, ${study.color}, transparent 50%), radial-gradient(circle at 20% 80%, ${study.color}40, transparent 50%)`,
                }}
              />

              <div className="relative z-10">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-16">
                  Impact & Results
                </h2>

                {study.metrics && study.metrics.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
                    {study.metrics.map((metric, i) => (
                      <div key={i}>
                        <Counter value={metric.value} color={study.color} />
                        <p
                          className="text-sm font-bold text-slate-500 uppercase tracking-widest border-l-2 pl-4"
                          style={{ borderColor: study.color }}
                        >
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {study.results && study.results.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-16 border-t border-slate-200">
                    {study.results.map((res, i) => (
                      <div key={i} className="flex flex-col gap-6">
                        <span className="text-4xl font-black text-slate-200">
                          0{i + 1}
                        </span>
                        <span className="text-xl text-slate-800 leading-relaxed font-medium">
                          {res}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* CTA */}
          <motion.div
            {...fadeUp}
            className="flex flex-col items-center text-center py-32"
          >
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter text-slate-900 mb-10 leading-[0.9]">
              Ready to <br /> build this?
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {study.link && (
                <Magnetic>
                  <a
                    href={study.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-slate-900 text-white font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-xl shadow-slate-900/20"
                  >
                    Launch Project <IconArrowUpRight size={18} />
                  </a>
                </Magnetic>
              )}
              <Magnetic>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-10 py-5 rounded-full border border-slate-300 text-slate-900 font-bold uppercase tracking-widest text-sm hover:bg-slate-50 transition-colors"
                >
                  Start a Conversation
                </Link>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
