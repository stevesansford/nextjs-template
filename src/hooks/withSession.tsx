'use client';

import { ComponentType, useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { Session } from 'next-auth';

/**
 * Higher-order component that wraps a component with session data
 * @param Component - The component to wrap with session data
 * @returns A new component with session data provided as props
 */
export function withSession<P extends object>(
  Component: ComponentType<P & { session: Session | null; isAuthenticated: boolean }>
) {
  return function WithSessionComponent(props: P) {
    const { session, isAuthenticated, isLoading } = useAuth();
    const [mounted, setMounted] = useState(false);
    
    // Prevent hydration issues with client-side only rendering
    useEffect(() => {
      setMounted(true);
    }, []);
    
    // Don't render during SSR to prevent hydration mismatch
    if (!mounted) {
      return null;
    }
    
    if (isLoading) {
      // Render loading state
      return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }
    
    // Render component with session props
    return <Component {...props} session={session} isAuthenticated={isAuthenticated} />;
  };
} 