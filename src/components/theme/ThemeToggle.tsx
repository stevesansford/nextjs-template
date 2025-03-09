'use client';

import React from 'react';
import { useTheme } from '@/lib/theme/theme-provider';

/**
 * ThemeToggleProps for customizing the theme toggle component
 */
interface ThemeToggleProps {
  /**
   * Include theme name in button (default: false)
   */
  showName?: boolean;
  
  /**
   * CSS class name to apply to the component
   */
  className?: string;
}

/**
 * ThemeToggle component that displays buttons for switching between available themes
 * 
 * Usage:
 * <ThemeToggle />
 * <ThemeToggle showName />
 */
export default function ThemeToggle({ 
  showName = false,
  className = ''
}: ThemeToggleProps) {
  const { theme, setTheme, availableThemes } = useTheme();
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm font-medium">Theme:</span>
      <div className="flex flex-wrap gap-2">
        {availableThemes.map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`
              inline-flex items-center justify-center rounded-md p-2 
              ${theme.id === t.id 
                ? 'bg-primary/90 text-white' 
                : 'bg-card hover:bg-accent'}
              transition-colors focus-visible:outline-none focus-visible:ring-1 
              focus-visible:ring-ring border border-border
            `}
            title={t.name}
            aria-label={`Switch to ${t.name} theme`}
          >
            <ThemeIcon themeId={t.id} />
            {showName && (
              <span className="ml-2">{t.name}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * A dropdown version of the theme toggle for mobile or when space is limited
 */
export function ThemeToggleDropdown({ className = '' }: { className?: string }) {
  const { theme, setTheme, availableThemes } = useTheme();
  
  return (
    <div className={`relative ${className}`}>
      <select
        value={theme.id}
        onChange={(e) => setTheme(e.target.value)}
        className="appearance-none bg-card border border-border rounded-md pl-8 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        aria-label="Select theme"
      >
        {availableThemes.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>
      <div className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none">
        <ThemeIcon themeId={theme.id} size="sm" />
      </div>
    </div>
  );
}

/**
 * Simple toggle button to switch between light and dark mode
 */
export function LightDarkToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const isDark = theme.mode === 'dark';
  
  const toggleTheme = () => {
    setTheme(isDark ? 'blue' : 'dark'); 
  };
  
  return (
    <button
      onClick={toggleTheme}
      className={`
        rounded-md p-2 border border-border
        ${isDark ? 'bg-card' : 'bg-muted'} 
        hover:bg-accent transition-colors
        ${className}
      `}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </button>
  );
}

/**
 * Icon component for each theme
 */
function ThemeIcon({ 
  themeId, 
  size = 'md' 
}: { 
  themeId: string; 
  size?: 'sm' | 'md' | 'lg' 
}) {
  const sizeClasses = {
    'sm': 'h-4 w-4',
    'md': 'h-5 w-5',
    'lg': 'h-6 w-6',
  };
  
  const sizeClass = sizeClasses[size];
  
  switch (themeId) {
    case 'blue':
      return <CircleIcon className={`${sizeClass} text-primary-500`} />;
    case 'dark':
      return <MoonIcon className={`${sizeClass} text-gray-300`} />;
    case 'warm':
      return <SunIcon className={`${sizeClass} text-orange-500`} />;
    case 'cozy-dark':
      return <FireIcon className={`${sizeClass} text-amber-500`} />;
    default:
      return <CircleIcon className={`${sizeClass}`} />;
  }
}

// Simple icon components
function SunIcon({ className = '' }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon({ className = '' }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function FireIcon({ className = '' }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
    </svg>
  );
}

function CircleIcon({ className = '' }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
} 