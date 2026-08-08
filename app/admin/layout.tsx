import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NPH Studio Admin',
  description: 'Internal admin portal for NPH Studio',
};

import { ToastProvider } from '@/components/ToastProvider';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-primary/30">
        {children}
      </div>
    </ToastProvider>
  );
}
