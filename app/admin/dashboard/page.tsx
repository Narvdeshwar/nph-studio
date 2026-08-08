'use client';

import { AdminShell } from '@/components/AdminShell';
import { StatCard } from '@/components/StatCard';
import { RecentActivityTable } from '@/components/RecentActivityTable';
import { ConfirmModal } from '@/components/ConfirmModal';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { IconUsers, IconUserCheck, IconTrophy } from '@tabler/icons-react';

export default function Dashboard() {
  const { 
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
  } = useDashboardStats();

  return (
    <AdminShell>
      <div className="p-8 max-w-7xl mx-auto relative">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-slate-400 mt-1">Overview of your lead pipeline</p>
        </div>

        {isLoading ? (
          <div className="text-slate-500">Loading metrics...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <StatCard title="Total Leads" icon={<IconUsers size={24} />} value={stats.totalLeads} description="All time inquiries" iconColorClass="text-primary" />
              <StatCard title="Contacted Leads" icon={<IconUserCheck size={24} />} value={stats.contactedLeads} description="Leads you've engaged with" iconColorClass="text-blue-400" />
              <StatCard title="Success Rate" icon={<IconTrophy size={24} />} value={`${stats.successRate}%`} description="Won leads / Closed leads" iconColorClass="text-green-400" />
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-bold text-white">Recent Activity</h2>
              <p className="text-sm text-slate-400">Update status directly from here</p>
            </div>

            <RecentActivityTable 
              leads={leads} 
              role={role} 
              onUpdateStatus={handleUpdateStatus} 
              onDeleteLead={handleDeleteClick} 
            />
            
            <ConfirmModal 
              isOpen={!!leadToDelete}
              title="Delete Lead"
              message="Are you sure you want to delete this lead? This action cannot be undone."
              onConfirm={confirmDeleteLead}
              onCancel={cancelDeleteLead}
              isLoading={isDeleting}
            />
          </>
        )}
      </div>
    </AdminShell>
  );
}
