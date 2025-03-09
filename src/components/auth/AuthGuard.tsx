'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState, ReactNode } from 'react';

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  requireAuth?: boolean;
}

/**
 * AuthGuard component that handles authentication state changes
 * with proper hydration safety
 * 
 * @param children - The protected content to render when authenticated
 * @param fallback - Optional fallback UI to show during loading state
 * @param requireAuth - Whether authentication is required (default: true)
 */
export default function AuthGuard({ 
  children, 
  fallback,
  requireAuth = true 
}: AuthGuardProps) {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  
  // Prevent hydration issues with this client-side only state
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    
    // Handle authentication redirects on the client side only
    if (isClient && status === 'unauthenticated' && requireAuth) {
      // Store the intended destination to redirect back after login
      const returnUrl = encodeURIComponent(pathname);
      router.push(`/auth/signin?callbackUrl=${returnUrl}`);
    }
  }, [status, router, pathname, isClient, requireAuth]);

  // Show nothing during SSR to prevent hydration mismatch
  if (!isClient) {
    return null;
  }
  
  // Show loading state
  if (status === 'loading') {
    return fallback || (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // For authenticated users or when auth is not required
  if ((requireAuth && status === 'authenticated') || (!requireAuth)) {
    return <>{children}</>;
  }
  
  // By default render nothing if unauthenticated (redirect happens in effect)
  return null;
} 