'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useTheme } from '@/lib/theme/theme-provider';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';

interface TopNavProps {
  onMenuClick: () => void;
  title?: string;
}

/**
 * TopNav - Top navigation bar
 * 
 * Provides the main top navigation bar with application controls,
 * theme toggle, and user menu.
 * 
 * @param {function} onMenuClick - Function to call when the mobile menu button is clicked
 * @param {string} title - Optional page title to display in the header
 */
export default function TopNav({ onMenuClick, title }: TopNavProps) {
  const { session, isAuthenticated } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration issues with client-side only rendering
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // State for user dropdown
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  // Ref for user dropdown element
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  // Handle clicks outside of dropdown to close it
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        userMenuOpen && 
        userMenuRef.current && 
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [userMenuOpen]);
  
  // Toggle user menu
  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };
  
  // Handle logout
  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  return (
    <header className="h-16 border-b border-border bg-background z-10">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left section - Menu button (mobile) and title */}
        <div className="flex items-center">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-md text-muted-foreground hover:bg-muted transition-colors mr-2"
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          
          {/* Page title */}
          {title && (
            <h1 className="text-xl font-semibold text-foreground hidden sm:block">
              {title}
            </h1>
          )}
        </div>
        
        {/* Right section - search, theme toggle, user menu */}
        <div className="flex items-center space-x-2">
          {/* Search bar */}
          <div className="relative hidden md:block">
            <input 
              type="text" 
              placeholder="Search..." 
              className="py-1.5 px-4 pl-10 rounded-full bg-muted text-foreground text-sm w-40 focus:w-64 transition-all focus:outline-none"
            />
            <svg 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          
          {/* Theme toggle */}
          <button 
            onClick={() => setTheme(theme.mode === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {theme.mode === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>
          
          {/* User menu */}
          {mounted && isAuthenticated && session ? (
            <div className="relative" ref={userMenuRef}>
              <button 
                onClick={toggleUserMenu}
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-muted transition-colors"
                aria-label="User menu"
              >
                {session.user?.image ? (
                  <Image 
                    src={session.user.image} 
                    alt={session.user.name || 'User'} 
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                    {session.user?.name?.[0] || 'U'}
                  </div>
                )}
                <span className="hidden sm:block text-sm">{session.user?.name}</span>
                <svg 
                  className="w-4 h-4 text-muted-foreground hidden sm:block" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              
              {/* User dropdown menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-background rounded-md shadow-lg border border-border z-10 overflow-hidden">
                  <div className="p-3 border-b border-border">
                    <div className="font-medium">{session.user?.name}</div>
                    <div className="text-sm text-muted-foreground truncate">{session.user?.email}</div>
                  </div>
                  
                  <div className="py-1">
                    <Link 
                      href="/dashboard" 
                      className="px-4 py-2 text-sm hover:bg-muted transition-colors flex items-center space-x-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                      </svg>
                      <span>Dashboard</span>
                    </Link>
                    <Link 
                      href="/account" 
                      className="px-4 py-2 text-sm hover:bg-muted transition-colors flex items-center space-x-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <span>Account</span>
                    </Link>
                  </div>
                  
                  <div className="border-t border-border">
                    <button 
                      onClick={handleLogout}
                      className="px-4 py-2 text-sm text-red-500 hover:bg-muted transition-colors w-full text-left flex items-center space-x-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      <span>Log out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link 
                href="/auth/signin"
                className="px-3 py-1.5 text-sm hover:bg-muted transition-colors rounded-md"
              >
                Log in
              </Link>
              <Link 
                href="/auth/signup"
                className="px-3 py-1.5 text-sm bg-primary hover:bg-primary/90 text-white rounded-md transition-colors"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 