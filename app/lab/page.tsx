import { ImmersiveLabScene } from '@/components/premium/3d/ImmersiveLabScene';

export default function LabPage() {
  return (
    <div className="fixed inset-0 bg-[#050505] text-white font-sans overflow-hidden select-none">
      
      <div className="absolute bottom-0 left-0 z-50 pointer-events-none p-6 sm:p-8 flex items-end">
        {/* Floating Instruction Badge */}
        <div className="hidden md:flex pointer-events-auto items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-2 backdrop-blur-md shadow-2xl">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">
            Click & Drag to Rotate Space. Scroll to Zoom.
          </p>
        </div>
      </div>

      {/* The Master 3D Scene (Full Screen) */}
      <div className="absolute inset-0 z-10 cursor-move">
        <ImmersiveLabScene />
      </div>

    </div>
  );
}
