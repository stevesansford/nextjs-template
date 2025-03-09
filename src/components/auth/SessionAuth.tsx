import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth/auth-options';
import { ReactNode } from 'react';

interface SessionAuthProps {
  children: ReactNode;
  redirectTo?: string;
}

/**
 * Server component for session authentication
 * Uses server-side session checking to prevent hydration issues
 * 
 * @param children - Content to render if authenticated
 * @param redirectTo - Where to redirect if not authenticated (default: /auth/signin)
 */
export async function SessionAuth({ 
  children, 
  redirectTo = '/auth/signin' 
}: SessionAuthProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    // For security, append current URL as callback
    const callbackUrl = encodeURIComponent(redirectTo);
    redirect(`/auth/signin?callbackUrl=${callbackUrl}`);
  }

  return <>{children}</>;
} 