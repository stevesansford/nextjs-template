import { SessionAuth } from '@/components/auth/SessionAuth';
import { ReactNode } from 'react';

/**
 * Dashboard layout with server-side authentication protection
 * This ensures all dashboard pages are protected from unauthorized access
 */
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <SessionAuth>{children}</SessionAuth>;
} 