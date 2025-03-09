import { SessionAuth } from '@/components/auth/SessionAuth';
import { ReactNode } from 'react';

export default function AccountLayout({ children }: { children: ReactNode }) {
  return <SessionAuth>{children}</SessionAuth>;
} 