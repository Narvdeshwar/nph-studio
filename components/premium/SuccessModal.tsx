import React from 'react';
import { IconCheck, IconX } from '@tabler/icons-react';
import { Magnetic } from '@/components/premium/Magnetic';

type SuccessModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
};

export function SuccessModal({ isOpen, title, message, onClose }: SuccessModalProps) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div className="bg-surface border border-border rounded-3xl w-full max-w-sm p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-300 flex flex-col items-center text-center">
        
        <button onClick={onClose} className="absolute top-6 right-6 text-muted hover:text-foreground transition-colors cursor-pointer">
          <IconX size={20} />
        </button>
        
        <div className="p-4 bg-green-500/10 text-green-500 rounded-full mb-6">
          <IconCheck size={40} stroke={2} />
        </div>
        
        <h2 className="text-2xl font-black uppercase tracking-widest text-foreground mb-3">{title}</h2>
        <p className="text-muted leading-relaxed mb-8">{message}</p>
        
        <Magnetic>
          <button 
            type="button" 
            onClick={onClose}
            className="w-full py-3 px-8 rounded-full bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-primary/20"
          >
            Done
          </button>
        </Magnetic>
      </div>
    </div>
  );
}
