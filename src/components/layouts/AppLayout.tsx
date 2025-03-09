'use client';

import { ReactNode, useState, useEffect } from 'react';
import Sidebar from '@/components/navigation/Sidebar';
import TopNav from '@/components/navigation/TopNav';
import MobileNav from '@/components/navigation/MobileNav';
import { useTheme } from '@/lib/theme/theme-provider';

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

/**
 * AppLayout - Main authenticated application layout
 * 
 * This layout provides a consistent structure for authenticated sections
 * of the application including a sidebar, top navigation, and responsive
 * adjustments for different screen sizes.
 * 
 * @param {ReactNode} children - Page content to be rendered in the layout
 * @param {string} title - Optional page title
 * @param {string} description - Optional page description
 */
export default function AppLayout({
  children,
  title,
  description
}: AppLayoutProps) {
  // State for tracking sidebar visibility on mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // State for tracking viewport width
  const [isMobile, setIsMobile] = useState(false);
  
  // We are importing useTheme but not currently using the theme variable
  // Keeping the import for potential future use
  useTheme();

  // Handle window resize for responsive behavior
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      
      // Auto-close sidebar on mobile when resizing down
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    // Check initially
    checkIfMobile();

    // Add event listener for resize
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up event listener
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Note: Removed direct DOM manipulation for theme application
  // Theme is now applied through CSS variables and Tailwind classes

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top navigation - always visible */}
      <TopNav 
        onMenuClick={toggleSidebar} 
        title={title} 
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - visible on desktop, or when opened on mobile */}
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          isMobile={isMobile}
        />
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background">
          {/* Page header with title and description */}
          {(title || description) && (
            <div className="mb-6">
              {title && <h1 className="text-2xl font-bold text-foreground">{title}</h1>}
              {description && <p className="text-muted-foreground mt-1">{description}</p>}
            </div>
          )}
          
          {/* Page content */}
          {children}
        </main>
      </div>
      
      {/* Mobile navigation - only visible on small screens */}
      {isMobile && <MobileNav />}
    </div>
  );
} 