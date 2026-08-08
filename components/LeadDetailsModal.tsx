import React from 'react';
import { IconX, IconCalendar, IconMail, IconPhone, IconBuildingStore, IconNotes } from '@tabler/icons-react';
import { Lead } from '@/types/lead';

type LeadDetailsModalProps = {
  isOpen: boolean;
  lead: Lead | null;
  onClose: () => void;
};

export function LeadDetailsModal({ isOpen, lead, onClose }: LeadDetailsModalProps) {
  if (!isOpen || !lead) return null;
  
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold text-white">{lead.name}</h2>
            <div className="text-sm text-slate-400 mt-1 flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                lead.status === 'New' ? 'bg-blue-500/10 text-blue-400' :
                lead.status === 'Contacted' ? 'bg-yellow-500/10 text-yellow-400' :
                lead.status === 'In Progress' ? 'bg-purple-500/10 text-purple-400' :
                lead.status === 'Closed - Won' ? 'bg-green-500/10 text-green-400' :
                'bg-red-500/10 text-red-400'
              }`}>
                {lead.status}
              </span>
              <span>•</span>
              <span className="text-slate-500">Source: {lead.source}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
            <IconX size={20} />
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-800 rounded-lg text-slate-400 mt-0.5">
                <IconMail size={16} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Email</p>
                <p className="text-sm text-slate-200 break-all">{lead.contact_info || 'N/A'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-800 rounded-lg text-slate-400 mt-0.5">
                <IconPhone size={16} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Phone</p>
                <p className="text-sm text-slate-200">{lead.country_code || 'N/A'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-800 rounded-lg text-slate-400 mt-0.5">
                <IconCalendar size={16} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Date Submitted</p>
                <p className="text-sm text-slate-200">
                  {new Date(lead.created_at).toLocaleString(undefined, { 
                    month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit'
                  })}
                </p>
              </div>
            </div>

            {lead.post_link && (
              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-800 rounded-lg text-slate-400 mt-0.5">
                  <IconBuildingStore size={16} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Reference Link</p>
                  <a href={lead.post_link} target="_blank" rel="noreferrer" className="text-sm text-blue-400 hover:underline break-all">
                    View Link
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-slate-800/50 pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-800 rounded-lg text-slate-400 mt-0.5">
                <IconNotes size={16} />
              </div>
              <div className="w-full">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Details & Notes</p>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {lead.notes || <span className="text-slate-600 italic">No additional details provided.</span>}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
