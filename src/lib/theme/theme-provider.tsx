'use client';

import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import { themes, defaultTheme, getTheme, ThemeColors, hexToRGB } from './theme';

/**
 * ThemeContextProps interface defines the shape of the ThemeContext value
 */
interface ThemeContextProps {
  theme: ThemeColors;               // Current theme
  setTheme: (themeId: string) => void; // Function to change theme
  availableThemes: ThemeColors[];   // All available themes
  systemTheme: 'light' | 'dark';    // System theme preference
}

/**
 * ThemeProviderProps interface defines the props for ThemeProvider component
 */
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultThemeId?: string;          // Optional default theme ID
}

// Create a context for the theme
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

/**
 * LocalStorage key for storing the user's theme preference
 */
const THEME_STORAGE_KEY = 'app-theme-preference';

/**
 * ThemeProvider component manages theme state and provides theme-related
 * functionality to its children through context
 */
export function ThemeProvider({
  children,
  defaultThemeId = defaultTheme.id,
}: ThemeProviderProps) {
  // State for the current theme ID
  const [themeId, setThemeId] = useState<string>(defaultThemeId);
  
  // State for the system's theme preference
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');
  
  // Initialize theme from localStorage or default on mount
  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      // Try to get stored theme preference
      const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      
      // Check system preference for dark mode
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (storedTheme && themes[storedTheme]) {
        setThemeId(storedTheme);
      } else {
        // If no stored preference, use system preference
        setSystemTheme(prefersDark ? 'dark' : 'light');
        
        // If no stored theme, use system preference to select default
        if (prefersDark && !storedTheme) {
          setThemeId('dark');
        }
      }

      // Apply the theme immediately
      const currentThemeId = storedTheme || (prefersDark ? 'dark' : defaultThemeId);
      if (themes[currentThemeId]) {
        applyThemeToDocument(themes[currentThemeId]);
      }
    }
  }, [defaultThemeId]);
  
  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };
    
    // Add event listener
    mediaQuery.addEventListener('change', handleChange);
    
    // Clean up
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // Get the current theme object based on theme ID
  const currentTheme = useMemo(() => getTheme(themeId), [themeId]);
  
  // Get all available themes as an array
  const availableThemes = useMemo(() => Object.values(themes), []);
  
  // Function to change the current theme
  const setTheme = (newThemeId: string) => {
    if (themes[newThemeId]) {
      // Update state immediately to trigger re-render
      setThemeId(newThemeId);
      
      // Save to localStorage
      localStorage.setItem(THEME_STORAGE_KEY, newThemeId);
      
      // Apply theme classes to document immediately
      applyThemeToDocument(themes[newThemeId]);
    } else {
      console.warn(`Theme "${newThemeId}" not found. Using default theme instead.`);
      setThemeId(defaultTheme.id);
      localStorage.setItem(THEME_STORAGE_KEY, defaultTheme.id);
      applyThemeToDocument(defaultTheme);
    }
  };
  
  // Apply the theme to the document when the theme changes
  useEffect(() => {
    applyThemeToDocument(currentTheme);
  }, [currentTheme]);
  
  // Context value
  const contextValue = useMemo(() => ({
    theme: currentTheme,
    setTheme,
    availableThemes,
    systemTheme,
  }), [currentTheme, availableThemes, systemTheme]);
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Helper function to set theme based on mode ('light' or 'dark')
 * This makes it easier to set themes by mode rather than ID
 */
export function setThemeByMode(mode: 'light' | 'dark') {
  // Map mode to default theme ID
  const themeId = mode === 'light' ? 'gray' : 'dark';
  
  // Get stored theme key
  const THEME_STORAGE_KEY = 'app-theme-preference';
  
  // Get theme object
  const theme = themes[themeId];
  
  // Save to localStorage
  localStorage.setItem(THEME_STORAGE_KEY, themeId);
  
  // Apply theme to document
  if (typeof document !== 'undefined') {
    // Apply theme directly using full theme object
    applyThemeToDocument(theme);
  }
  
  return themeId;
}

/**
 * Helper function to apply theme to document by setting CSS variables
 * and toggling dark/light classes
 */
function applyThemeToDocument(theme: ThemeColors) {
  // Skip if not in browser
  if (typeof document === 'undefined') return;
  
  const html = document.documentElement;
  const body = document.body;
  
  // Apply dark/light mode class based on the theme mode
  if (theme.mode === 'dark') {
    html.classList.add('dark');
    html.classList.remove('light');
    
    // Convert color values to RGB for CSS variables
    const bgRGB = hexToRGB(theme.colors.background);
    const fgRGB = hexToRGB(theme.colors.foreground);
    const cardRGB = hexToRGB(theme.colors.card);
    const cardFgRGB = hexToRGB(theme.colors.foreground);
    const mutedRGB = hexToRGB(theme.colors.muted);
    const mutedFgRGB = hexToRGB('#b0b2c2'); // Light gray for muted text
    const borderRGB = hexToRGB(theme.colors.border);
    
    // Force critical CSS variables for dark theme
    html.style.setProperty('--background', `${bgRGB[0]}, ${bgRGB[1]}, ${bgRGB[2]}`, 'important');
    html.style.setProperty('--foreground', `${fgRGB[0]}, ${fgRGB[1]}, ${fgRGB[2]}`, 'important');
    body.style.setProperty('--background', `${bgRGB[0]}, ${bgRGB[1]}, ${bgRGB[2]}`, 'important');
    body.style.setProperty('--foreground', `${fgRGB[0]}, ${fgRGB[1]}, ${fgRGB[2]}`, 'important');
    
    // Apply key dark theme CSS variables for components
    html.style.setProperty('--card', `${cardRGB[0]}, ${cardRGB[1]}, ${cardRGB[2]}`, 'important');
    html.style.setProperty('--card-foreground', `${cardFgRGB[0]}, ${cardFgRGB[1]}, ${cardFgRGB[2]}`, 'important');
    html.style.setProperty('--muted', `${mutedRGB[0]}, ${mutedRGB[1]}, ${mutedRGB[2]}`, 'important');
    html.style.setProperty('--muted-foreground', `${mutedFgRGB[0]}, ${mutedFgRGB[1]}, ${mutedFgRGB[2]}`, 'important');
    html.style.setProperty('--border', `${borderRGB[0]}, ${borderRGB[1]}, ${borderRGB[2]}`, 'important');
    
    // Set primary color
    const primaryRGB = hexToRGB(theme.colors.primary);
    html.style.setProperty('--primary', `${primaryRGB[0]}, ${primaryRGB[1]}, ${primaryRGB[2]}`, 'important');
    
    // Set secondary color
    const secondaryRGB = hexToRGB(theme.colors.secondary);
    html.style.setProperty('--secondary', `${secondaryRGB[0]}, ${secondaryRGB[1]}, ${secondaryRGB[2]}`, 'important');
    
    // Set accent color
    const accentRGB = hexToRGB(theme.colors.accent);
    html.style.setProperty('--accent', `${accentRGB[0]}, ${accentRGB[1]}, ${accentRGB[2]}`, 'important');
  } else {
    html.classList.add('light');
    html.classList.remove('dark');
    
    // Convert color values to RGB for CSS variables
    const bgRGB = hexToRGB(theme.colors.background);
    const fgRGB = hexToRGB(theme.colors.foreground);
    const cardRGB = hexToRGB(theme.colors.card);
    const cardFgRGB = hexToRGB(theme.colors.foreground);
    const mutedRGB = hexToRGB(theme.colors.muted);
    const mutedFgRGB = hexToRGB('#6B7280'); // Gray for muted text
    const borderRGB = hexToRGB(theme.colors.border);
    
    // Force critical CSS variables for light theme
    html.style.setProperty('--background', `${bgRGB[0]}, ${bgRGB[1]}, ${bgRGB[2]}`, 'important');
    html.style.setProperty('--foreground', `${fgRGB[0]}, ${fgRGB[1]}, ${fgRGB[2]}`, 'important');
    body.style.setProperty('--background', `${bgRGB[0]}, ${bgRGB[1]}, ${bgRGB[2]}`, 'important');
    body.style.setProperty('--foreground', `${fgRGB[0]}, ${fgRGB[1]}, ${fgRGB[2]}`, 'important');
    
    // Apply key light theme CSS variables for components
    html.style.setProperty('--card', `${cardRGB[0]}, ${cardRGB[1]}, ${cardRGB[2]}`, 'important');
    html.style.setProperty('--card-foreground', `${cardFgRGB[0]}, ${cardFgRGB[1]}, ${cardFgRGB[2]}`, 'important');
    html.style.setProperty('--muted', `${mutedRGB[0]}, ${mutedRGB[1]}, ${mutedRGB[2]}`, 'important');
    html.style.setProperty('--muted-foreground', `${mutedFgRGB[0]}, ${mutedFgRGB[1]}, ${mutedFgRGB[2]}`, 'important');
    html.style.setProperty('--border', `${borderRGB[0]}, ${borderRGB[1]}, ${borderRGB[2]}`, 'important');
    
    // Set primary color
    const primaryRGB = hexToRGB(theme.colors.primary);
    html.style.setProperty('--primary', `${primaryRGB[0]}, ${primaryRGB[1]}, ${primaryRGB[2]}`, 'important');
    
    // Set secondary color
    const secondaryRGB = hexToRGB(theme.colors.secondary);
    html.style.setProperty('--secondary', `${secondaryRGB[0]}, ${secondaryRGB[1]}, ${secondaryRGB[2]}`, 'important');
    
    // Set accent color
    const accentRGB = hexToRGB(theme.colors.accent);
    html.style.setProperty('--accent', `${accentRGB[0]}, ${accentRGB[1]}, ${accentRGB[2]}`, 'important');
  }
  
  // Set theme attributes
  html.setAttribute('data-theme', theme.id);
  html.setAttribute('data-theme-mode', theme.mode);
  
  // Apply color scheme for browser controls
  html.style.colorScheme = theme.mode;
}

/**
 * useTheme hook provides access to the ThemeContext
 * Throws an error if used outside a ThemeProvider
 */
export function useTheme(): ThemeContextProps {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
} 