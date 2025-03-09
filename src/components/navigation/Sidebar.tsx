'use client';

import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import { isAdminRole } from '@/types/prisma';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
}

interface NavItem {
  title: string;
  href: string;
  icon: ReactNode;
}

/**
 * Sidebar - Main navigation sidebar
 * 
 * Responsive sidebar that provides the main navigation for authenticated sections
 * of the application. Collapses to off-canvas on mobile devices.
 * 
 * @param {boolean} isOpen - Whether the sidebar is visible on mobile
 * @param {function} onClose - Function to call when closing the sidebar
 * @param {boolean} isMobile - Whether the current viewport is mobile-sized
 */
export default function Sidebar({ isOpen, onClose, isMobile }: SidebarProps) {
  const pathname = usePathname();
  const { session, isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration issues with client-side only state
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Navigation items - includes only pages that actually exist
  const navItems: NavItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
          <rect width="7" height="7" x="3" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="14" rx="1" />
          <rect width="7" height="7" x="3" y="14" rx="1" />
        </svg>
      )
    },
    // Only show admin link for users with admin role
    ...(isAdminRole(session?.user?.role) ? [
      {
        title: 'Admin',
        href: '/dashboard/admin',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ),
      }
    ] : []),
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      )
    }
  ];
  
  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    if (isMobile) {
      const handleOutsideClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest('.sidebar') && isOpen) {
          onClose();
        }
      };
      
      document.addEventListener('mousedown', handleOutsideClick);
      
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }
  }, [isMobile, isOpen, onClose]);
  
  // Prevent body scrolling when sidebar is open on mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, isOpen]);
  
  // Sidebar overlay and positioning styles for mobile
  const overlayClasses = isMobile ? `
    fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ease-in-out
    ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
  ` : '';
  
  const sidebarClasses = `
    sidebar
    h-full bg-card border-r border-border z-40
    ${isMobile ? 'fixed left-0 top-0 w-64 transform transition-transform duration-300 ease-in-out' : 'w-64 hidden md:block'}
    ${isMobile && isOpen ? 'translate-x-0' : isMobile ? '-translate-x-full' : ''}
  `;

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && <div className={overlayClasses} onClick={onClose} />}
      
      {/* Sidebar */}
      <div className={sidebarClasses}>
        {/* Sidebar header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-foreground">
            Next.js App Template
          </Link>
          
          {/* Close button - only on mobile */}
          {isMobile && (
            <button 
              onClick={onClose}
              className="p-2 rounded-md hover:bg-muted transition-colors"
              aria-label="Close sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
        
        {/* Navigation items */}
        <nav className="p-2">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
                
              return (
                <li key={item.href}>
                  <Link 
                    href={item.href}
                    className={`
                      flex items-center px-3 py-2 rounded-md 
                      group transition-colors
                      ${isActive 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-foreground hover:bg-muted'
                      }
                    `}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        {/* User section at bottom */}
        {mounted && isAuthenticated && session && (
          <div className="border-t border-border mt-auto p-4">
            <div className="flex items-center">
              {session.user?.image ? (
                <Image 
                  src={session.user.image} 
                  alt={session.user.name || 'User'} 
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full mr-3"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3">
                  {session.user?.name?.[0] || 'U'}
                </div>
              )}
              <div>
                {session.user?.name && (
                  <div className="font-medium text-foreground">{session.user.name}</div>
                )}
                {session.user?.email && (
                  <div className="text-sm text-muted-foreground">{session.user.email}</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
} 