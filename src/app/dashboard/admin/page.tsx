'use client';

import Link from 'next/link';
import Card from '@/components/ui/Card';
import DashboardLayout from '@/components/layouts/DashboardLayout';

export default function AdminDashboardPage() {
  return (
    <DashboardLayout
      title="Admin Dashboard"
      description="Manage users and application settings"
      showBreadcrumbs={true}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/dashboard/admin/users" className="block">
            <Card className="h-full p-6 transition-all hover:border-primary hover:shadow-md">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">User Management</h3>
                <p className="text-sm text-muted flex-grow">
                  View, manage and delete users from your application.
                </p>
                <div className="mt-4 text-sm font-medium text-primary">
                  Manage Users →
                </div>
              </div>
            </Card>
          </Link>

          {/* Placeholder for future admin features */}
          <Card className="h-full p-6 opacity-60">
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-muted"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Content Management</h3>
              <p className="text-sm text-muted flex-grow">
                Coming soon - Manage site content and pages.
              </p>
              <div className="mt-4 text-sm font-medium text-muted">
                Coming Soon
              </div>
            </div>
          </Card>

          <Card className="h-full p-6 opacity-60">
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-muted"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Site Settings</h3>
              <p className="text-sm text-muted flex-grow">
                Coming soon - Configure application settings.
              </p>
              <div className="mt-4 text-sm font-medium text-muted">
                Coming Soon
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
} 