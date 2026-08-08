import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Lead } from '@/types/lead';
import { useToast } from '@/components/ToastProvider';

export function useDashboardStats() {
  const [role, setRole] = useState<string | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState({
    totalLeads: 0,
    contactedLeads: 0,
    successRate: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const recomputeStats = (leadsData: Lead[]) => {
    const total = leadsData.length;
    const contacted = leadsData.filter(l => ['Contacted', 'In Progress', 'Closed - Won', 'Closed - Lost'].includes(l.status)).length;
    const won = leadsData.filter(l => l.status === 'Closed - Won').length;
    const closed = leadsData.filter(l => l.status === 'Closed - Won' || l.status === 'Closed - Lost').length;
    const rate = closed > 0 ? Math.round((won / closed) * 100) : 0;
    setStats({ totalLeads: total, contactedLeads: contacted, successRate: rate });
  };

  useEffect(() => {
    // Defer state update to avoid synchronous cascading renders
    setTimeout(() => {
      setRole(localStorage.getItem('nph_admin_role'));
    }, 0);
    
    async function fetchStats() {
      setIsLoading(true);
      const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching leads:', error);
      } else if (data) {
        setLeads(data);
        recomputeStats(data);
      }
      setIsLoading(false);
    }
    fetchStats();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from('leads').update({ status: newStatus }).eq('id', id);
    if (error) {
      alert('Error updating status');
    } else {
      const updatedLeads = leads.map(l => l.id === id ? { ...l, status: newStatus } : l);
      setLeads(updatedLeads);
      recomputeStats(updatedLeads);
    }
  };

  const [leadToDelete, setLeadToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (id: string) => {
    setLeadToDelete(id);
  };

  const confirmDeleteLead = async () => {
    if (!leadToDelete) return;
    setIsDeleting(true);
    
    const { error } = await supabase.from('leads').delete().eq('id', leadToDelete);
    if (error) {
      toast('Failed to delete lead', 'error');
      console.error(error);
    } else {
      const updatedLeads = leads.filter(l => l.id !== leadToDelete);
      setLeads(updatedLeads);
      recomputeStats(updatedLeads);
      setLeadToDelete(null);
      toast('Lead deleted successfully', 'success');
    }
    setIsDeleting(false);
  };

  const cancelDeleteLead = () => {
    setLeadToDelete(null);
  };

  return { 
    role, 
    leads, 
    stats, 
    isLoading, 
    handleUpdateStatus, 
    handleDeleteClick,
    confirmDeleteLead,
    cancelDeleteLead,
    leadToDelete,
    isDeleting
  };
}
