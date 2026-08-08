'use client';

import { useEffect, useState } from 'react';
import { GhostCursor } from '@/components/premium/GhostCursor';

export function ThemeCursor() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check for coarse pointer (touch screen)
    const checkPointer = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    };

    checkPointer();
  }, []);

  useEffect(() => {
    if (!isMobile) {
      document.body.classList.add('custom-cursor-active');
    } else {
      document.body.classList.remove('custom-cursor-active');
    }
    return () => document.body.classList.remove('custom-cursor-active');
  }, [isMobile]);

  if (isMobile) {
    return null; // Don't render custom cursors on touch devices for massive performance gain
  }

  return <GhostCursor />;
}
