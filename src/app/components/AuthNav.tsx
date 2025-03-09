'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function AuthNav() {
  const { session, isLoading, isAuthenticated } = useAuth();
  // Prevent hydration issues with client-side only rendering
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Don't render anything during SSR or until mounted on client
  if (!mounted) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-full bg-muted animate-pulse"></div>
        <div className="h-4 w-20 bg-muted animate-pulse rounded"></div>
      </div>
    );
  }

  if (isAuthenticated && session) {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || 'Profile picture'}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
              {session.user?.name?.[0] || "U"}
            </div>
          )}
          <span className="text-sm font-medium text-foreground">
            {session.user?.name || session.user?.email?.split('@')[0]}
          </span>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="rounded-md bg-card px-4 py-2 text-sm text-foreground hover:bg-card/80"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <Link
        href="/auth/signin"
        className="text-sm font-medium text-foreground hover:text-foreground/80"
      >
        Sign in
      </Link>
      <Link
        href="/auth/signup"
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-600"
      >
        Sign up
      </Link>
    </div>
  );
} 