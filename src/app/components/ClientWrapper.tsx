'use client';

import dynamic from 'next/dynamic';

// Dynamic import with ssr: false in a client component
const ChatDemo = dynamic(() => import('./ChatDemo'), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-3xl mx-auto p-4 h-[600px] bg-white rounded-lg shadow flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  ),
});

export default function ClientWrapper() {
  return <ChatDemo />;
} 