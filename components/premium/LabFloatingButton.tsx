'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { IconArrowLeft, IconFlask } from '@tabler/icons-react';
import { Magnetic } from '@/components/premium/Magnetic';

export function LabFloatingButton() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 left-6 z-50 pointer-events-auto"
    >
      <Magnetic>
        <Link
          href="/lab"
          aria-label="Return to NPH Studio Lab Vault"
          className="group relative flex items-center gap-3 px-4 sm:px-5 py-3 rounded-full bg-black/80 hover:bg-white text-white hover:text-black border border-white/20 hover:border-white backdrop-blur-2xl transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.6)] cursor-pointer"
        >
          {/* Subtle Ambient Pulse */}
          <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300 -z-10" />

          <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-black/10 flex items-center justify-center transition-colors">
            <IconArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
          </div>

          <div className="flex items-center gap-2 pr-1">
            <IconFlask size={16} className="text-primary group-hover:text-black transition-colors" />
            <div className="flex flex-col text-left">
              <span className="text-xs font-black uppercase tracking-wider leading-none">
                Lab Vault
              </span>
              <span className="text-[9px] font-mono opacity-60 uppercase tracking-widest leading-tight mt-0.5">
                NPH Studio
              </span>
            </div>
          </div>
        </Link>
      </Magnetic>
    </motion.div>
  );
}
