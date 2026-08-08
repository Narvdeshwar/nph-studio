'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Setup feature state
  const [isCheckingSetup, setIsCheckingSetup] = useState(true);
  const [needsSetup, setNeedsSetup] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    // Check if already authenticated
    const auth = localStorage.getItem('nph_admin_auth');
    if (auth === 'true') {
      router.push('/admin/dashboard');
      return;
    }

    // Check if there are ANY superadmins in the DB. If 0, we need setup.
    async function checkSetup() {
      try {
        const { checkSetupStatus } = await import('@/app/actions/adminAuth');
        const status = await checkSetupStatus();
        if (status.success && status.needsSetup) {
          setNeedsSetup(true);
        }
      } catch (err) {
        console.error("Failed to check setup status", err);
      } finally {
        setIsCheckingSetup(false);
      }
    }
    
    checkSetup();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (needsSetup) {
        // Initial setup flow
        const { createAdminUser } = await import('@/app/actions/adminAuth');
        const result = await createAdminUser(username, password, 'superadmin');
        
        if (result.success && result.user) {
          localStorage.setItem('nph_admin_auth', 'true');
          localStorage.setItem('nph_admin_role', result.user.role);
          router.push('/admin/dashboard');
        } else {
          setError(result.error || 'Failed to create initial superadmin');
        }
      } else {
        // Normal login flow
        const { verifyLogin } = await import('@/app/actions/adminAuth');
        const result = await verifyLogin(username, password);
        
        if (result.success && result.user) {
          localStorage.setItem('nph_admin_auth', 'true');
          localStorage.setItem('nph_admin_role', result.user.role);
          router.push('/admin/dashboard');
        } else {
          setError(result.error || 'Invalid username or password');
        }
      }
    } catch {
      setError(needsSetup ? 'An error occurred during setup' : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingSetup) {
    return <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950 text-slate-500">Checking system status...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-2 text-white">
          {needsSetup ? 'System Setup' : 'Admin Portal'}
        </h1>
        <p className="text-slate-400 mb-8">
          {needsSetup 
            ? 'No superadmin found! Create the initial superadmin account below to secure your system.'
            : 'Enter your credentials to access the NPH Studio dashboard.'
          }
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Username</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
              placeholder={needsSetup ? "Choose a username" : "admin"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <input 
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
              placeholder={needsSetup ? "Choose a secure password" : "••••••••"}
            />
          </div>
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-[#E04D2D] text-white font-bold py-3 px-4 rounded-lg transition-colors mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading 
              ? (needsSetup ? 'Creating...' : 'Logging in...') 
              : (needsSetup ? 'Create Superadmin' : 'Login')
            }
          </button>
        </form>
      </div>
    </div>
  );
}
