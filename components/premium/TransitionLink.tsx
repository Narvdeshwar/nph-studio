'use client';
import Link, { LinkProps } from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function TransitionLink({ href, children, className, onClick, ...props }: TransitionLinkProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleTransition = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onClick) onClick(e);

    const targetUrl = typeof href === 'string' ? href : href.pathname || '/';

    if (pathname === targetUrl) {
      // If we are already on this page, don't animate, just return
      return;
    }
    
    // Dispatch a custom event to trigger the curtain
    window.dispatchEvent(new Event('route-change-start'));
    
    // Wait for curtain to fully cover the screen before pushing route
    setTimeout(() => {
      router.push(targetUrl);
    }, 700); 
  };

  return (
    <Link href={href} onClick={handleTransition} className={className} {...props}>
      {children}
    </Link>
  );
}
