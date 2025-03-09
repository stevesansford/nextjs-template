'use client';

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '@/lib/theme/theme-provider';

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  showBackLink?: boolean;
  backLinkText?: string;
  backLinkHref?: string;
}

/**
 * AuthLayout - Layout for authentication pages
 * 
 * Provides a centered, card-based layout optimized for login,
 * registration, and other authentication-related pages.
 * 
 * @param {ReactNode} children - The form or content to display
 * @param {string} title - Optional page title
 * @param {string} subtitle - Optional secondary text
 * @param {boolean} showLogo - Whether to show the app logo (default: true)
 * @param {boolean} showBackLink - Whether to show a back navigation link (default: false)
 * @param {string} backLinkText - Text for the back link (default: "Back to home")
 * @param {string} backLinkHref - URL for the back link (default: "/")
 */
export default function AuthLayout({
  children,
  title,
  subtitle,
  showLogo = true,
  showBackLink = false,
  backLinkText = "Back to home",
  backLinkHref = "/"
}: AuthLayoutProps) {
  // For client-side only features
  const [mounted, setMounted] = useState(false);
  
  // We're importing useTheme but not currently using the theme variable
  // Keeping the import for potential future use
  useTheme();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until after client-side hydration
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {/* Optional logo */}
        {showLogo && (
          <div className="text-center mb-6">
            <Link href="/" className="inline-block">
              <h1 className="text-2xl font-bold text-primary">Next.js App Template</h1>
            </Link>
          </div>
        )}
        
        {/* Auth container */}
        <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
          {/* Title and subtitle */}
          {(title || subtitle) && (
            <div className="text-center mb-6">
              {title && <h2 className="text-xl font-semibold text-foreground">{title}</h2>}
              {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
            </div>
          )}
          
          {/* Main content (auth form) */}
          {children}
        </div>
        
        {/* Back link */}
        {showBackLink && (
          <div className="text-center mt-6">
            <Link 
              href={backLinkHref} 
              className="text-sm text-primary hover:underline transition-colors"
            >
              {backLinkText}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 