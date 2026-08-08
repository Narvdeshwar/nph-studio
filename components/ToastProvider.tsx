'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { IconCheck, IconX, IconInfoCircle } from '@tabler/icons-react';

type ToastType = 'success' | 'error' | 'info';

type Toast = {
  id: string;
  message: string;
  type: ToastType;
};

type ToastContextType = {
  toast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000); // Dissmiss after 4 seconds
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div 
            key={t.id} 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl animate-in slide-in-from-bottom-5 fade-in duration-300 pointer-events-auto ${
              t.type === 'success' ? 'bg-emerald-950/90 border border-emerald-900/50 text-emerald-400' :
              t.type === 'error' ? 'bg-red-950/90 border border-red-900/50 text-red-400' :
              'bg-slate-900/90 border border-slate-800 text-slate-300'
            } backdrop-blur-md min-w-[280px] max-w-sm`}
          >
            {t.type === 'success' && <div className="bg-emerald-500/10 p-1.5 rounded-full"><IconCheck size={18} stroke={2.5} /></div>}
            {t.type === 'error' && <div className="bg-red-500/10 p-1.5 rounded-full"><IconX size={18} stroke={2.5} /></div>}
            {t.type === 'info' && <div className="bg-blue-500/10 p-1.5 rounded-full"><IconInfoCircle size={18} stroke={2.5} className="text-blue-400" /></div>}
            <p className="text-sm font-medium">{t.message}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
