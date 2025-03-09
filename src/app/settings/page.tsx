'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the new settings page location
    router.replace('/dashboard/settings');
  }, [router]);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Redirecting...</h2>
        <p className="text-muted-foreground">
          The settings page has been moved to /dashboard/settings
        </p>
      </div>
    </div>
  );
} 