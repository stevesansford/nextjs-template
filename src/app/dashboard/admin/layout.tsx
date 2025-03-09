import { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth-options';
import { redirect } from 'next/navigation';
import { isAdminRole } from '@/types/prisma';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin dashboard for user management',
};

/**
 * Admin section layout - checks authorization
 * No additional wrapper needed since dashboard/layout.tsx already includes the necessary DashboardLayout
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check admin authorization on server side
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user || !isAdminRole(session.user.role)) {
    // Redirect non-admin users
    redirect('/dashboard');
  }
  
  return children;
} 