import { useState } from 'react';
import { Lead } from '@/types/lead';
import { IconBrandWhatsapp, IconTrash, IconBrandLinkedin, IconBrandX, IconWorld, IconLink, IconFilter, IconEye } from '@tabler/icons-react';
import { LeadDetailsModal } from './LeadDetailsModal';

const getSourceIcon = (source: string) => {
  switch (source) {
    case 'LinkedIn': return <IconBrandLinkedin size={18} stroke={1.5} />;
    case 'X / Twitter': return <IconBrandX size={18} stroke={1.5} />;
    case 'Website': return <IconWorld size={18} stroke={1.5} />;
    default: return <IconLink size={18} stroke={1.5} />;
  }
};

type Props = {
  leads: Lead[];
  role: string | null;
  onUpdateStatus: (id: string, status: string) => void;
  onDeleteLead: (id: string) => void;
};

export function RecentActivityTable({ leads, role, onUpdateStatus, onDeleteLead }: Props) {
  const [dateFilter, setDateFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filteredLeads = leads.filter(lead => {
    // Status Filter
    if (statusFilter !== 'All' && lead.status !== statusFilter) return false;
    
    // Source Filter
    if (sourceFilter !== 'All' && lead.source !== sourceFilter) return false;

    // Date Filter
    if (dateFilter !== 'All') {
      const leadDate = new Date(lead.created_at);
      const today = new Date();
      
      if (dateFilter === 'Today') {
        if (leadDate.toDateString() !== today.toDateString()) return false;
      } else if (dateFilter === 'Yesterday') {
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        if (leadDate.toDateString() !== yesterday.toDateString()) return false;
      }
    }

    return true;
  });

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3 items-center bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2 text-slate-400 mr-2">
          <IconFilter size={18} />
          <span className="text-sm font-medium">Filters:</span>
        </div>
        
        <select 
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="bg-slate-950 border border-slate-800 text-slate-300 text-sm rounded-lg px-3 py-2 outline-none focus:border-primary transition-colors cursor-pointer"
        >
          <option value="All">Any Date</option>
          <option value="Today">Today</option>
          <option value="Yesterday">Yesterday</option>
        </select>

        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-950 border border-slate-800 text-slate-300 text-sm rounded-lg px-3 py-2 outline-none focus:border-primary transition-colors cursor-pointer"
        >
          <option value="All">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed - Won">Closed - Won</option>
          <option value="Closed - Lost">Closed - Lost</option>
        </select>

        <select 
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          className="bg-slate-950 border border-slate-800 text-slate-300 text-sm rounded-lg px-3 py-2 outline-none focus:border-primary transition-colors cursor-pointer"
        >
          <option value="All">All Sources</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="X / Twitter">X / Twitter</option>
          <option value="Website">Website</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/50 border-b border-slate-800">
                <th className="p-4 font-semibold text-xs uppercase tracking-wider text-slate-400">Date</th>
                <th className="p-4 font-semibold text-xs uppercase tracking-wider text-slate-400">Lead Info</th>
                <th className="p-4 font-semibold text-xs uppercase tracking-wider text-slate-400 text-center">WhatsApp</th>
                <th className="p-4 font-semibold text-xs uppercase tracking-wider text-slate-400">Source</th>
                <th className="p-4 font-semibold text-xs uppercase tracking-wider text-slate-400">Status</th>
                {role === 'superadmin' && <th className="p-4 font-semibold text-xs uppercase tracking-wider text-slate-400 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredLeads.length === 0 ? (
              <tr><td colSpan={role === 'superadmin' ? 6 : 5} className="p-8 text-center text-slate-500">No leads found.</td></tr>
            ) : (
              filteredLeads.slice(0, 10).map(lead => (
                <tr key={lead.id} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors group">
                  <td className="p-4 text-slate-500 whitespace-nowrap">
                    {new Date(lead.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-white mb-1">{lead.name}</div>
                    <div className="text-slate-400 text-xs font-mono">
                      {lead.country_code ? <span className="text-slate-500 mr-1">{lead.country_code}</span> : null}
                      {lead.contact_info}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    {lead.country_code || /^\+?\d/.test(lead.contact_info) ? (
                      <a 
                        href={`https://wa.me/${((lead.country_code || '') + lead.contact_info).replace(/\D/g, '')}`}
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center justify-center p-2 bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white rounded-lg transition-colors"
                        title="Message on WhatsApp"
                      >
                        <IconBrandWhatsapp size={18} stroke={1.5} />
                      </a>
                    ) : (
                      <span className="text-slate-500 text-xs">NA</span>
                    )}
                  </td>
                  <td className="p-4">
                    {lead.post_link ? (
                      <a 
                        href={lead.post_link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className={`inline-flex items-center justify-center p-2 rounded-lg transition-colors ${
                          lead.source === 'LinkedIn' ? 'bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white' :
                          lead.source === 'X / Twitter' ? 'bg-slate-500/20 text-slate-300 hover:bg-slate-700 hover:text-white' :
                          lead.source === 'Website' ? 'bg-purple-500/10 text-purple-500 hover:bg-purple-500 hover:text-white' :
                          'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                        }`}
                        title={`View ${lead.source} Post`}
                      >
                        {getSourceIcon(lead.source)}
                      </a>
                    ) : (
                      <span className="text-xs text-slate-500 font-medium">NA</span>
                    )}
                  </td>
                  <td className="p-4">
                    <select 
                      value={lead.status}
                      onChange={(e) => onUpdateStatus(lead.id, e.target.value)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-full bg-slate-950 border outline-none cursor-pointer appearance-none ${
                        lead.status === 'New' ? 'text-blue-400 border-blue-900/50' :
                        lead.status === 'Contacted' ? 'text-yellow-400 border-yellow-900/50' :
                        lead.status === 'In Progress' ? 'text-purple-400 border-purple-900/50' :
                        lead.status === 'Closed - Won' ? 'text-green-400 border-green-900/50' :
                        'text-red-400 border-red-900/50'
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Closed - Won">Closed - Won</option>
                      <option value="Closed - Lost">Closed - Lost</option>
                    </select>
                  </td>
                  {role === 'superadmin' && (
                    <td className="p-4 text-right whitespace-nowrap">
                      <button 
                        onClick={() => setSelectedLead(lead)}
                        className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors mr-1 cursor-pointer"
                        title="View Details"
                      >
                        <IconEye size={16} />
                      </button>
                      <button 
                        onClick={() => onDeleteLead(lead.id)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        title="Delete Lead"
                      >
                        <IconTrash size={16} />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
    
    <LeadDetailsModal 
      isOpen={!!selectedLead} 
      lead={selectedLead} 
      onClose={() => setSelectedLead(null)} 
    />
    </div>
  );
}
