'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { IconLayoutDashboard, IconUsers, IconAddressBook, IconLogout, IconMenu2, IconX } from '@tabler/icons-react';
import { Logo } from './Logo';

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    // We intentionally delay this to avoid synchronous cascading renders during paint
    const timer = setTimeout(() => {
      setIsMobileMenuOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const auth = localStorage.getItem('nph_admin_auth');
    const storedRole = localStorage.getItem('nph_admin_role');
    
    if (auth !== 'true') {
      router.push('/admin');
    } else {
      // Defer state update to avoid cascading render lint error
      setTimeout(() => {
        setRole(storedRole);
        setIsLoading(false);
      }, 0);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('nph_admin_auth');
    localStorage.removeItem('nph_admin_role');
    router.push('/admin');
  };

  if (isLoading) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-500">Loading...</div>;
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: <IconLayoutDashboard size={20} /> },
    { name: 'Leads', href: '/admin/leads', icon: <IconAddressBook size={20} /> },
  ];

  if (role === 'superadmin') {
    navItems.push({ name: 'Users', href: '/admin/users', icon: <IconUsers size={20} /> });
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col md:flex-row overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 z-20 sticky top-0">
        <Logo className="h-6 w-auto" />
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="p-2 -mr-2 text-slate-400 hover:text-white transition-colors"
        >
          {isMobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="hidden md:flex h-16 items-center px-6 border-b border-slate-800">
          <Logo className="h-6 w-auto" />
        </div>
        <div className="flex md:hidden h-16 items-center px-6 border-b border-slate-800 justify-between">
          <span className="font-bold text-lg tracking-tight">Navigation</span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 p-2 -mr-2"><IconX size={20}/></button>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-primary text-white font-medium' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-950 rounded-lg border border-slate-800">
            <div className="flex flex-col">
              <span className="text-sm font-medium">Admin</span>
              <span className="text-xs text-slate-500 capitalize">{role}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="text-slate-400 hover:text-red-400 transition-colors"
              title="Logout"
            >
              <IconLogout size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden md:h-screen w-full relative z-10">
        {children}
      </main>
    </div>
  );
}
