export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg 
      width="40" 
      height="40" 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* N */}
      <path d="M20 80V20L50 80V20" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
      {/* P */}
      <path d="M55 80V20H75C83.2843 20 90 26.7157 90 35C90 43.2843 83.2843 50 75 50H55" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Dot / Accent */}
      <circle cx="85" cy="80" r="6" fill="var(--color-primary)"/>
    </svg>
  );
}
