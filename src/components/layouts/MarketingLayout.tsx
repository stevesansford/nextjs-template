'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { useTheme } from '@/lib/theme/theme-provider';

interface MarketingLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  darkHeader?: boolean;
  transparentHeader?: boolean;
}

/**
 * MarketingLayout - Layout for public marketing pages
 * 
 * Provides a layout optimized for public-facing marketing pages
 * with configurable header and footer.
 * 
 * @param {ReactNode} children - The page content
 * @param {boolean} showHeader - Whether to show the header (default: true)
 * @param {boolean} showFooter - Whether to show the footer (default: true)
 * @param {boolean} darkHeader - Use dark styling for header (default: false)
 * @param {boolean} transparentHeader - Make header background transparent (default: false)
 */
export default function MarketingLayout({
  children,
  showHeader = true,
  showFooter = true,
  darkHeader = false,
  transparentHeader = false
}: MarketingLayoutProps) {
  const { theme, setTheme } = useTheme();
  
  // Determine header classes based on props
  const headerClasses = `
    w-full 
    ${transparentHeader ? 'absolute top-0 left-0 z-10 bg-transparent' : 'bg-background border-b border-border'} 
    ${darkHeader ? 'text-white' : 'text-foreground'}
  `;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      {showHeader && (
        <header className={headerClasses}>
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo/Brand */}
              <div>
                <Link href="/" className="text-xl font-bold">
                  Next.js App Template
                </Link>
              </div>
              
              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/features" className="hover:text-primary transition-colors">
                  Features
                </Link>
                <Link href="/pricing" className="hover:text-primary transition-colors">
                  Pricing
                </Link>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About
                </Link>
                <Link href="/blog" className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </nav>
              
              {/* CTA Buttons */}
              <div className="flex items-center space-x-3">
                <Link 
                  href="/auth/signin"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Log in
                </Link>
                <Link 
                  href="/auth/signup"
                  className="text-sm bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Sign up
                </Link>
                
                {/* Theme toggle */}
                <button 
                  onClick={() => setTheme(theme.mode === 'dark' ? 'light' : 'dark')}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme.mode === 'dark' ? '🌙' : '☀️'}
                </button>
              </div>
            </div>
          </div>
        </header>
      )}
      
      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer */}
      {showFooter && (
        <footer className="bg-muted py-12 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Next.js App Template</h3>
                <p className="text-muted-foreground">
                  Building the future of web applications
                </p>
                <div className="flex space-x-4">
                  {/* Social media links - add your own icons */}
                  <a href="#" className="text-muted-foreground hover:text-primary">Twitter</a>
                  <a href="#" className="text-muted-foreground hover:text-primary">GitHub</a>
                  <a href="#" className="text-muted-foreground hover:text-primary">LinkedIn</a>
                </div>
              </div>
              
              {/* Product links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-primary">Features</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary">Pricing</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary">Changelog</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary">Roadmap</a></li>
                </ul>
              </div>
              
              {/* Resources */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-primary">Documentation</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary">Blog</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary">Support</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary">Tutorials</a></li>
                </ul>
              </div>
              
              {/* Company */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-primary">About</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary">Team</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary">Careers</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary">Contact</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
              <p>© {new Date().getFullYear()} Next.js App Template. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
} 