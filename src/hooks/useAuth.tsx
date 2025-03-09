'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

/**
 * Custom hook for safely accessing authentication state
 * with proper hydration safety
 */
export function useAuth() {
  const { data: session, status, update } = useSession();
  const [isClient, setIsClient] = useState(false);

  // Prevent hydration issues with client-side only state
  useEffect(() => {
    setIsClient(true);
  }, []);

  return {
    session: isClient ? session : null,
    status: isClient ? status : 'loading',
    update,
    isAuthenticated: isClient && status === 'authenticated',
    isLoading: !isClient || status === 'loading',
    isUnauthenticated: isClient && status === 'unauthenticated',
  };
} 