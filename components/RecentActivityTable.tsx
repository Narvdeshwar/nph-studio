import { Lead } from '@/types/lead';
import { IconBrandWhatsapp, IconTrash, IconBrandLinkedin, IconBrandX, IconWorld, IconLink } from '@tabler/icons-react';

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
  return (
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
            {leads.length === 0 ? (
              <tr><td colSpan={role === 'superadmin' ? 6 : 5} className="p-8 text-center text-slate-500">No leads found.</td></tr>
            ) : (
              leads.slice(0, 10).map(lead => (
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
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => onDeleteLead(lead.id)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
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
  );
}
