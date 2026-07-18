'use client';
import Link from 'next/link';

export function Header() {
  return (
    <header className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-border bg-background/50 backdrop-blur-md">
      <div className="flex items-center gap-2 font-medium text-[15px] text-foreground">
        <span className="w-2 h-2 rounded-[2px] bg-primary inline-block"></span>
        <Link href="/">yourAgency</Link>
      </div>
      <nav className="flex gap-5 text-[13px] text-muted font-medium">
        <Link href="/work" className="hover:text-foreground transition-colors">Work</Link>
        <Link href="/services" className="hover:text-foreground transition-colors">Services</Link>
        <Link href="/team" className="hover:text-foreground transition-colors">Team</Link>
        <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
      </nav>
    </header>
  );
}
