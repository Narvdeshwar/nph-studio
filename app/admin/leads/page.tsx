'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { IconDownload, IconPlus, IconRefresh, IconLogout } from '@tabler/icons-react';
import * as XLSX from 'xlsx';

type Lead = {
  id: string;
  created_at: string;
  name: string;
  contact_info: string;
  source: string;
  status: string;
  notes: string;
};

export default function LeadsDashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New Lead Form State
  const [newLead, setNewLead] = useState({
    name: '',
    contact_info: '',
    source: 'LinkedIn',
    status: 'New',
    notes: ''
  });

  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching leads:', error);
      // For demo purposes if table doesn't exist yet, we don't crash
    } else if (data) {
      setLeads(data);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Auth Check
    if (localStorage.getItem('nph_admin_auth') !== 'true') {
      router.push('/admin');
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchLeads();
  }, [router, fetchLeads]);

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { data, error } = await supabase
      .from('leads')
      .insert([newLead])
      .select();

    if (error) {
      alert('Error creating lead. Check console.');
      console.error(error);
    } else {
      setNewLead({ name: '', contact_info: '', source: 'LinkedIn', status: 'New', notes: '' });
      setIsFormOpen(false);
      if (data) setLeads([data[0], ...leads]);
    }
    setIsSubmitting(false);
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('leads')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      alert('Error updating status');
    } else {
      setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
    }
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(leads.map(l => ({
      ID: l.id,
      Date: new Date(l.created_at).toLocaleString(),
      Name: l.name,
      Contact: l.contact_info,
      Source: l.source,
      Status: l.status,
      Notes: l.notes
    })));
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");
    XLSX.writeFile(workbook, "NPH_Studio_Leads.xlsx");
  };

  const handleLogout = () => {
    localStorage.removeItem('nph_admin_auth');
    router.push('/admin');
  };

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Leads Management</h1>
          <p className="text-zinc-400">Track and manage inbound inquiries</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={fetchLeads}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
          >
            <IconRefresh size={18} /> Refresh
          </button>
          <button 
            onClick={handleExportExcel}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <IconDownload size={18} /> Export Excel
          </button>
          <button 
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-[#E04D2D] text-white rounded-lg transition-colors"
          >
            <IconPlus size={18} /> Add Lead
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border border-zinc-800 hover:bg-zinc-800 rounded-lg transition-colors text-red-400"
          >
            <IconLogout size={18} />
          </button>
        </div>
      </div>

      {isFormOpen && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8 shadow-xl">
          <h2 className="text-xl font-bold mb-4">Create New Lead</h2>
          <form onSubmit={handleCreateLead} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Name / Company</label>
              <input required type="text" value={newLead.name} onChange={e => setNewLead({...newLead, name: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Contact Info (Email/Phone/URL)</label>
              <input required type="text" value={newLead.contact_info} onChange={e => setNewLead({...newLead, contact_info: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Source</label>
              <select value={newLead.source} onChange={e => setNewLead({...newLead, source: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2">
                <option>LinkedIn</option>
                <option>Website</option>
                <option>Referral</option>
                <option>X / Twitter</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Initial Status</label>
              <select value={newLead.status} onChange={e => setNewLead({...newLead, status: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2">
                <option>New</option>
                <option>Contacted</option>
                <option>In Progress</option>
                <option>Closed - Won</option>
                <option>Closed - Lost</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-zinc-400 mb-1">Notes</label>
              <textarea value={newLead.notes} onChange={e => setNewLead({...newLead, notes: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 h-24" />
            </div>
            <div className="md:col-span-2 flex justify-end gap-3 mt-2">
              <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 text-zinc-400 hover:text-white">Cancel</button>
              <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-primary text-white rounded-lg font-medium">{isSubmitting ? 'Saving...' : 'Save Lead'}</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-950 border-b border-zinc-800">
                <th className="p-4 font-semibold text-sm text-zinc-400">Date</th>
                <th className="p-4 font-semibold text-sm text-zinc-400">Name / Company</th>
                <th className="p-4 font-semibold text-sm text-zinc-400">Contact</th>
                <th className="p-4 font-semibold text-sm text-zinc-400">Source</th>
                <th className="p-4 font-semibold text-sm text-zinc-400">Status</th>
                <th className="p-4 font-semibold text-sm text-zinc-400">Notes</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={6} className="p-8 text-center text-zinc-500">Loading leads...</td></tr>
              ) : leads.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-zinc-500">No leads found. Create one above!</td></tr>
              ) : (
                leads.map(lead => (
                  <tr key={lead.id} className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors">
                    <td className="p-4 text-sm text-zinc-400 whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-medium">{lead.name}</td>
                    <td className="p-4 text-sm text-zinc-300">{lead.contact_info}</td>
                    <td className="p-4 text-sm">
                      <span className="px-2 py-1 bg-zinc-800 rounded-md text-xs">{lead.source}</span>
                    </td>
                    <td className="p-4">
                      <select 
                        value={lead.status}
                        onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                        className={`text-xs font-bold px-2 py-1 rounded-md bg-zinc-950 border outline-none cursor-pointer ${
                          lead.status === 'New' ? 'text-blue-400 border-blue-900' :
                          lead.status === 'Contacted' ? 'text-yellow-400 border-yellow-900' :
                          lead.status === 'In Progress' ? 'text-purple-400 border-purple-900' :
                          lead.status === 'Closed - Won' ? 'text-green-400 border-green-900' :
                          'text-red-400 border-red-900'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed - Won">Closed - Won</option>
                        <option value="Closed - Lost">Closed - Lost</option>
                      </select>
                    </td>
                    <td className="p-4 text-sm text-zinc-400 max-w-[200px] truncate" title={lead.notes}>
                      {lead.notes || '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
