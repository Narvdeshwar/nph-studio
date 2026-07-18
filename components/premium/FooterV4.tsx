'use client';
import { Magnetic } from '@/components/premium/Magnetic';
import { TextMask } from '@/components/premium/TextMask';

export function FooterV4() {
  return (
    <footer className="w-full bg-foreground text-background py-32 relative z-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 sm:px-20 relative z-10">
        
        <div className="mb-20">
          <h2 className="text-[8vw] sm:text-[6vw] font-bold leading-none tracking-tighter uppercase">
            <TextMask>Have an Idea?</TextMask><br/>
            <TextMask delay={0.1}>Let's build it.</TextMask>
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-12 border-t border-zinc-800 pt-12">
          
          <Magnetic>
            <button className="bg-primary text-white rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider hover:scale-105 active:scale-95 transition-transform">
              Book a Call
            </button>
          </Magnetic>

          <div className="flex flex-col sm:flex-row gap-12 text-sm uppercase tracking-widest font-medium text-zinc-400">
            <div className="flex flex-col gap-4">
              <span className="text-white mb-2">Socials</span>
              <a href="#" className="hover:text-primary transition-colors">Twitter</a>
              <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-white mb-2">Agency</span>
              <a href="/work" className="hover:text-primary transition-colors">Work</a>
              <a href="/services" className="hover:text-primary transition-colors">Services</a>
            </div>
          </div>
        </div>

      </div>
      
      {/* Decorative gigantic text behind footer */}
      <div className="absolute bottom-[-10%] left-0 w-full text-[35vw] font-black text-zinc-900 leading-none select-none pointer-events-none text-center">
        NPH
      </div>
    </footer>
  );
}
