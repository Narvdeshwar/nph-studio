import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NPH Studio Admin',
  description: 'Internal admin portal for NPH Studio',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-primary selection:text-white">
      {children}
    </div>
  );
}
