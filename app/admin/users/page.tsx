'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from '@/components/AdminShell';
import { ConfirmModal } from '@/components/ConfirmModal';
import { IconUserPlus, IconTrash, IconX } from '@tabler/icons-react';
import { supabase } from '@/lib/supabase';
import { createAdminUser } from '@/app/actions/adminAuth';
import { useToast } from '@/components/ToastProvider';

type AdminUser = {
  id: string;
  username: string;
  role: string;
  created_at: string;
};

export default function UsersManagement() {
  const router = useRouter();
  const { toast } = useToast();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('admin');
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState('');

  // Delete modal state
  const [userToDelete, setUserToDelete] = useState<{id: string, username: string} | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function fetchUsers() {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('admin_users')
      .select('id, username, role, created_at')
      .order('created_at', { ascending: true });
      
    if (error) {
      console.error('Error fetching admin users:', error);
    } else if (data) {
      setUsers(data);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    const role = localStorage.getItem('nph_admin_role');
    if (role !== 'superadmin') {
      router.push('/admin/dashboard');
    } else {
      setTimeout(() => {
        setIsAuthorized(true);
        fetchUsers();
      }, 0);
    }
  }, [router]);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError('');
    setIsCreating(true);

    const result = await createAdminUser(newUsername, newPassword, newRole);
    
    if (result.success && result.user) {
      setUsers([...users, {
        id: result.user.id,
        username: result.user.username,
        role: result.user.role,
        created_at: result.user.created_at
      }]);
      setShowAddModal(false);
      setNewUsername('');
      setNewPassword('');
      setNewRole('admin');
      toast('User created successfully', 'success');
    } else {
      setCreateError(result.error || 'Failed to create user');
      toast('Failed to create user', 'error');
    }
    
    setIsCreating(false);
  };

  const handleDeleteClick = (id: string, username: string) => {
    if (username === 'superadmin') {
      alert('Cannot delete the default superadmin account.');
      return;
    }
    setUserToDelete({ id, username });
  };

  const confirmDeleteUser = async () => {
    if (!userToDelete) return;
    setIsDeleting(true);
    
    const { error } = await supabase.from('admin_users').delete().eq('id', userToDelete.id);
    if (error) {
      toast('Failed to delete user', 'error');
      console.error(error);
    } else {
      setUsers(users.filter(u => u.id !== userToDelete.id));
      setUserToDelete(null);
      toast('User deleted successfully', 'success');
    }
    setIsDeleting(false);
  };

  if (!isAuthorized) {
    return null;
  }

  return (
    <AdminShell>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-slate-400 mt-1">Manage admin access to the portal</p>
          </div>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-[#E04D2D] text-white rounded-lg transition-colors font-medium text-sm shadow-lg shadow-primary/20 cursor-pointer"
            onClick={() => setShowAddModal(true)}
          >
            <IconUserPlus size={18} /> Add User
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/50 border-b border-slate-800">
                  <th className="p-4 font-semibold text-xs uppercase tracking-wider text-slate-400">Username</th>
                  <th className="p-4 font-semibold text-xs uppercase tracking-wider text-slate-400">Role</th>
                  <th className="p-4 font-semibold text-xs uppercase tracking-wider text-slate-400">Created</th>
                  <th className="p-4 font-semibold text-xs uppercase tracking-wider text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {isLoading ? (
                  <tr><td colSpan={4} className="p-8 text-center text-slate-500">Loading users...</td></tr>
                ) : users.length === 0 ? (
                  <tr><td colSpan={4} className="p-8 text-center text-slate-500">No users found.</td></tr>
                ) : (
                  users.map(user => (
                    <tr key={user.id} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 font-medium text-white">{user.username}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          user.role === 'superadmin' ? 'bg-purple-900/30 text-purple-400 border border-purple-800/50' : 'bg-blue-900/30 text-blue-400 border border-blue-800/50'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        {user.username !== 'superadmin' && (
                          <button 
                            onClick={() => handleDeleteClick(user.id, user.username)}
                            className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                            title={`Delete ${user.username}`}
                          >
                            <IconTrash size={16} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add User Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Add New User</h2>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white transition-colors">
                  <IconX size={20} />
                </button>
              </div>

              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Username</label>
                  <input 
                    type="text" 
                    required
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="Enter username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                  <input 
                    type="password"
                    required 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="Enter password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Role</label>
                  <select 
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="admin">Admin</option>
                    <option value="superadmin">Superadmin</option>
                  </select>
                </div>

                {createError && <p className="text-red-500 text-sm mt-2">{createError}</p>}

                <div className="flex gap-3 mt-6">
                  <button 
                    type="button" 
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-2.5 px-4 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-300 transition-colors font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isCreating}
                    className="flex-1 py-2.5 px-4 rounded-lg bg-primary hover:bg-[#E04D2D] text-white transition-colors font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCreating ? 'Creating...' : 'Create User'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Delete Confirmation Modal */}
        <ConfirmModal 
          isOpen={!!userToDelete}
          title="Delete User"
          message={`Are you sure you want to delete the user "${userToDelete?.username}"? This action cannot be undone.`}
          onConfirm={confirmDeleteUser}
          onCancel={() => setUserToDelete(null)}
          isLoading={isDeleting}
        />
      </div>
    </AdminShell>
  );
}
