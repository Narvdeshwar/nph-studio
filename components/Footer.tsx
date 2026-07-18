import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background py-16 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-[32px] font-medium text-foreground mb-4">
          Ready to build your next product?
        </h2>
        <p className="text-[16px] text-muted mb-8 max-w-[400px]">
          Let's talk about your idea, scope the MVP, and get it built in weeks, not months.
        </p>
        <button className="bg-primary text-white border-none py-[12px] px-8 rounded-lg text-[15px] font-medium cursor-pointer transition-all hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(255,90,54,0.35)] active:scale-95 mb-16">
          Book a discovery call
        </button>

        <div className="w-full flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-border text-[13px] text-muted">
          <div className="flex items-center gap-2 font-medium text-foreground mb-4 sm:mb-0">
            <span className="w-2 h-2 rounded-[2px] bg-primary inline-block"></span>
            yourAgency
          </div>
          <div className="flex gap-4">
            <Link href="/work" className="hover:text-foreground transition-colors">Work</Link>
            <Link href="/services" className="hover:text-foreground transition-colors">Services</Link>
            <Link href="/team" className="hover:text-foreground transition-colors">Team</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
