export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`font-black uppercase tracking-tighter flex items-baseline whitespace-nowrap ${className}`}>
      NPH-STUDIO
    </div>
  );
}
