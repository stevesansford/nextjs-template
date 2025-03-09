'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamic import in client component
const ClientChatDemo = dynamic(() => import('./ClientWrapper'), {
  ssr: false,
});

// Loading fallback component
function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-16 h-16 border-t-4 border-primary border-solid rounded-full animate-spin"></div>
      <p className="mt-4 text-muted">Loading...</p>
    </div>
  );
}

export default function ClientChatWrapper() {
  return (
    <div className="h-full w-full">
      <Suspense fallback={<Loading />}>
        <ClientChatDemo />
      </Suspense>
    </div>
  );
} 