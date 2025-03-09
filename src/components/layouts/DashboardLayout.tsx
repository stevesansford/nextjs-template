'use client';

import { ReactNode } from 'react';
import AppLayout from './AppLayout';

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  showBreadcrumbs?: boolean;
  showActions?: boolean;
  actions?: ReactNode;
}

/**
 * DashboardLayout - Specialized layout for dashboard views
 * 
 * Extends the AppLayout with dashboard-specific features like
 * summary cards, breadcrumbs, and action buttons.
 * 
 * @param {ReactNode} children - The main dashboard content
 * @param {string} title - Dashboard title
 * @param {string} description - Dashboard description
 * @param {boolean} showBreadcrumbs - Whether to display breadcrumb navigation
 * @param {boolean} showActions - Whether to show the actions container
 * @param {ReactNode} actions - Additional action buttons/controls to display
 */
export default function DashboardLayout({
  children,
  title = "Dashboard",
  description,
  showBreadcrumbs = true,
  showActions = false,
  actions
}: DashboardLayoutProps) {
  // Mock data for breadcrumb paths - in a real app, this would be dynamic
  const breadcrumbPaths = [
    { label: 'Home', href: '/' },
    { label: title, href: '#' }
  ];

  return (
    <AppLayout title={title} description={description}>
      <div className="space-y-6">
        {/* Top row with breadcrumbs and actions */}
        {(showBreadcrumbs || showActions) && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Breadcrumbs navigation */}
            {showBreadcrumbs && (
              <nav className="text-sm text-muted-foreground">
                <ol className="flex items-center space-x-2">
                  {breadcrumbPaths.map((path, index) => (
                    <li key={path.href} className="flex items-center">
                      {index > 0 && <span className="mx-2 text-muted-foreground">/</span>}
                      {index === breadcrumbPaths.length - 1 ? (
                        <span className="font-medium text-foreground">{path.label}</span>
                      ) : (
                        <a href={path.href} className="hover:text-primary transition-colors">
                          {path.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            
            {/* Action buttons */}
            {showActions && actions && (
              <div className="flex items-center space-x-2">
                {actions}
              </div>
            )}
          </div>
        )}
        
        {/* Dashboard content */}
        <div>
          {children}
        </div>
      </div>
    </AppLayout>
  );
} 