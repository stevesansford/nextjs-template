'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/lib/theme/theme-provider';
import { ToastProvider } from '@/components/ui/Toast';

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Global providers wrapper
 * Wraps the application with all necessary context providers
 * including authentication, theme, and notifications.
 */
export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider 
      refetchInterval={60 * 5}
      refetchOnWindowFocus={true}
    >
      <ThemeProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </ThemeProvider>
    </SessionProvider>
  );
} 