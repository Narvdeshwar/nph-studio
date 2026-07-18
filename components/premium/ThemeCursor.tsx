'use client';

import { useEffect, useState } from 'react';
import SplashCursor from '@/components/SplashCursor';
import { GhostCursor } from '@/components/premium/GhostCursor';

export function ThemeCursor() {
  const [isDark, setIsDark] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if dark class is present on html or if system prefers dark
    const checkTheme = () => {
      const hasDarkClass = document.documentElement.classList.contains('dark');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(hasDarkClass || prefersDark);
    };
    
    // Check for coarse pointer (touch screen)
    const checkPointer = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    };

    checkTheme();
    checkPointer();

    // Set up observer to watch for theme changes if a toggle is used
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Watch for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!document.documentElement.classList.contains('dark')) {
        setIsDark(e.matches);
      }
    };
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  if (isMobile) {
    return null; // Don't render custom cursors on touch devices for massive performance gain
  }

  if (isDark) {
    return (
      <SplashCursor 
        BACK_COLOR={{ r: 0, g: 0, b: 0 }} 
        SIM_RESOLUTION={128} 
        DYE_RESOLUTION={1024} 
        PRESSURE_ITERATIONS={15} 
      />
    );
  }

  return <GhostCursor />;
}
