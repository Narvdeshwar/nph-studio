import React from 'react';
import { IconAlertTriangle, IconX } from '@tabler/icons-react';

type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
};

export function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, isLoading }: ConfirmModalProps) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onCancel} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer">
          <IconX size={20} />
        </button>
        
        <div className="flex flex-col items-center text-center mt-2">
          <div className="p-4 bg-red-500/10 text-red-500 rounded-full mb-4">
            <IconAlertTriangle size={32} stroke={1.5} />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">{message}</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            type="button" 
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 py-2.5 px-4 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 transition-colors font-medium disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button 
            type="button" 
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 py-2.5 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-red-500/20"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
