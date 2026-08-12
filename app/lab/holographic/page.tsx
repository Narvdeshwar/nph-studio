import Link from 'next/link';
import { IconArrowLeft } from '@tabler/icons-react';
import { ImmersiveLabScene } from '@/components/premium/3d/ImmersiveLabScene';

export default function HolographicPage() {
  return (
    <div className="fixed inset-0 bg-[#050505] text-white font-sans overflow-hidden select-none">
      
      {/* Top Nav Overlay */}
      <div className="absolute top-24 left-0 w-full z-50 pointer-events-none p-6 sm:p-8 flex justify-between items-start">
        <Link 
          href="/lab" 
          className="pointer-events-auto flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold bg-black/20 px-4 py-2 rounded-full backdrop-blur-md border border-white/10"
        >
          <IconArrowLeft size={16} />
          Back to Lab
        </Link>
        <div className="text-right bg-black/20 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/10">
          <h1 className="text-xl font-black uppercase tracking-tighter">Holographic UI</h1>
          <p className="text-xs text-white/50 uppercase tracking-widest mt-1">Experiment 01</p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-50 pointer-events-none p-6 sm:p-8 flex items-end">
        {/* Floating Instruction Badge */}
        <div className="hidden md:flex pointer-events-auto items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-2 backdrop-blur-md shadow-2xl">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">
            Click & Drag to Rotate Space. Scroll to Zoom.
          </p>
        </div>
      </div>

      {/* The Master 3D Scene (Full Screen) */}
      <div className="absolute inset-0 z-10 cursor-move">
        <ImmersiveLabScene activeExperiment="hologram" />
      </div>

    </div>
  );
}
