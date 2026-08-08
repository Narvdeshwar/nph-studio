import React from 'react';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="nph studio"
    >
      {/* n */}
      <path
        d="M 20 80 L 20 45 A 20 20 0 0 1 60 45 L 60 80"
        fill="none"
        stroke="#FF5A36"
        strokeWidth="16"
        strokeLinejoin="round"
        strokeLinecap="butt"
      />

      {/* p stem */}
      <path
        d="M 80 17 L 80 110"
        fill="none"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="butt"
        className="transition-colors"
      />
      {/* p bowl */}
      <circle
        cx="100"
        cy="45"
        r="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="16"
        className="transition-colors"
      />

      {/* h stem */}
      <rect x="132" y="15" width="16" height="65" fill="#7C3AED" />
      <circle cx="140" cy="15" r="8" fill="#7C3AED" />

      {/* h arch */}
      <path
        d="M 140 45 A 20 20 0 0 1 180 45 L 180 80"
        fill="none"
        stroke="#7C3AED"
        strokeWidth="16"
        strokeLinecap="butt"
      />

      {/* dot */}
      {/* <circle cx="200" cy="72" r="8" fill="#FF5A36" /> */}

      {/* -studio text */}
      <text
        x="216"
        y="80"
        fontFamily="inherit"
        fontSize="72"
        fontWeight="bold"
        fill="currentColor"
        letterSpacing="-0.03em"
        className="transition-colors"
      >
        - studio
      </text>
    </svg>
  );
}
