'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconBrandWhatsapp, IconX, IconSend } from '@tabler/icons-react';

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const message = `Hello NPH Studio!%0A%0A${query}`;
    window.open(`https://wa.me/918787205784?text=${message}`, '_blank');
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[320px] sm:w-[360px] bg-surface border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="bg-green-500 p-6 text-white flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg leading-tight mb-1">Chat with NPH Studio</h3>
                <p className="text-sm opacity-90">We typically reply in a few minutes.</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="opacity-70 hover:opacity-100 transition-opacity">
                <IconX size={20} />
              </button>
            </div>
            
            <form onSubmit={handleWhatsAppSubmit} className="p-6 bg-background flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted">Your Query</label>
                <textarea
                  required
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Hi, I'm looking to build a..."
                  rows={3}
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-green-500 transition-colors resize-none"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-3 rounded-full bg-green-500 text-white text-sm font-bold uppercase tracking-wider hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                Send Message
                <IconSend size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-green-600 transition-all"
      >
        {isOpen ? <IconX size={32} /> : <IconBrandWhatsapp size={36} />}
      </button>

    </div>
  );
}
