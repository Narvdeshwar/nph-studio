'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AdminShell } from '@/components/AdminShell';

const COUNTRY_CODES = [
  { code: '+1', name: 'US / Canada' },
  { code: '+44', name: 'UK' },
  { code: '+91', name: 'India' },
  { code: '+61', name: 'Australia' },
  { code: '+49', name: 'Germany' },
  { code: '+33', name: 'France' },
  { code: '+971', name: 'UAE' },
];

export default function LeadsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // New Lead Form State
  const [newLead, setNewLead] = useState({
    name: '',
    contact_info: '',
    country_code: '',
    source: '',
    post_link: '',
    status: 'New',
    notes: ''
  });

  // WhatsApp auto-detection logic
  const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newState = { ...newLead, contact_info: value };
    
    // Auto-detect country code if it starts with '+'
    if (value.startsWith('+')) {
      const matchedCode = COUNTRY_CODES.find(c => value.startsWith(c.code));
      if (matchedCode) {
        newState.country_code = matchedCode.code;
      }
    }
    
    setNewLead(newState);
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');

    const { error } = await supabase
      .from('leads')
      .insert([{
        name: newLead.name,
        contact_info: newLead.contact_info,
        country_code: newLead.country_code || null,
        source: newLead.source,
        post_link: newLead.post_link || null,
        status: newLead.status,
        notes: newLead.notes
      }]);

    if (error) {
      alert('Error creating lead. Check console.');
      console.error(error);
    } else {
      setNewLead({ name: '', contact_info: '', country_code: '', source: '', post_link: '', status: 'New', notes: '' });
      setSuccessMessage('Lead successfully created! It will now appear on your Dashboard.');
      setTimeout(() => setSuccessMessage(''), 5000);
    }
    setIsSubmitting(false);
  };

  return (
    <AdminShell>
      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Add New Lead</h1>
          <p className="text-slate-400 mt-1">Manually enter a new inquiry into the system</p>
        </div>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-900/30 border border-green-800 text-green-400 rounded-lg flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {successMessage}
          </div>
        )}

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-xl">
          <form onSubmit={handleCreateLead} className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-4">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Name / Company</label>
              <input required type="text" value={newLead.name} onChange={e => setNewLead({...newLead, name: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition-colors" placeholder="John Doe" />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Code</label>
              <select value={newLead.country_code} onChange={e => setNewLead({...newLead, country_code: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-3 text-white focus:border-primary outline-none transition-colors">
                <option value="">None</option>
                {COUNTRY_CODES.map(c => (
                  <option key={c.code} value={c.code}>{c.code} ({c.name})</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-6">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Contact Info (Phone/Email)</label>
              <input type="text" value={newLead.contact_info} onChange={handleContactInfoChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition-colors" placeholder="+1234567890 or email@domain.com" />
            </div>

            <div className="md:col-span-4">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Source</label>
              <select value={newLead.source} onChange={e => setNewLead({...newLead, source: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition-colors">
                <option value="">NA</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="X / Twitter">X / Twitter</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="md:col-span-4">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Post / Source Link</label>
              <input type="url" value={newLead.post_link} onChange={e => setNewLead({...newLead, post_link: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition-colors" placeholder="https://linkedin.com/post/..." />
            </div>

            <div className="md:col-span-4">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Initial Status</label>
              <select value={newLead.status} onChange={e => setNewLead({...newLead, status: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition-colors">
                <option>New</option>
                <option>Contacted</option>
                <option>In Progress</option>
                <option>Closed - Won</option>
                <option>Closed - Lost</option>
              </select>
            </div>

            <div className="md:col-span-12">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Notes</label>
              <textarea value={newLead.notes} onChange={e => setNewLead({...newLead, notes: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition-colors h-32 resize-none" placeholder="Add any initial context or requirements here..." />
            </div>

            <div className="md:col-span-12 flex justify-end mt-4">
              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="px-8 py-3 font-medium bg-primary hover:bg-[#E04D2D] text-white rounded-lg transition-colors shadow-lg shadow-primary/20"
              >
                {isSubmitting ? 'Saving...' : 'Save Lead'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminShell>
  );
}
