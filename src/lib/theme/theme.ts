/**
 * Theme Configuration
 * ------------------
 * This file defines the theme structure, available themes, and exports 
 * utility functions for working with themes
 */

/**
 * Theme Type Definition
 * Represents the structure of a complete theme
 */
export type ThemeColors = {
  name: string;         // Human-readable theme name
  id: string;           // Unique theme identifier
  mode: 'light' | 'dark'; // Base theme mode
  colors: {             // Theme color tokens
    primary: string;    // HEX values for colors
    secondary: string;
    background: string;
    foreground: string;
    muted: string;
    accent: string;
    card: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
};

/**
 * Predefined Themes
 * -----------------
 * Collection of preset themes that can be used directly
 */

// Classic gray theme (default)
export const lightTheme: ThemeColors = {
  name: 'Light Gray',
  id: 'gray',
  mode: 'light',
  colors: {
    primary: '#3b82f6',      // Blue
    secondary: '#6366f1',    // Indigo
    background: '#f9fafb',   // Gray 50
    foreground: '#1f2937',   // Gray 800
    muted: '#f3f4f6',        // Gray 100
    accent: '#e0f2fe',       // Sky 100
    card: '#ffffff',         // White
    border: '#e5e7eb',       // Gray 200
    success: '#10b981',      // Emerald 500
    warning: '#f59e0b',      // Amber 500
    error: '#ef4444',        // Red 500
    info: '#0ea5e9',         // Sky 500
  }
};

// Dark slate theme
export const darkTheme: ThemeColors = {
  name: 'Dark Slate',
  id: 'dark',
  mode: 'dark',
  colors: {
    primary: '#60a5fa',      // Blue 400
    secondary: '#a5b4fc',    // Indigo 300
    background: '#0f172a',   // Slate 900
    foreground: '#f1f5f9',   // Slate 100
    muted: '#1e293b',        // Slate 800
    accent: '#1e40af',       // Blue 800
    card: '#1e293b',         // Slate 800
    border: '#334155',       // Slate 700
    success: '#34d399',      // Emerald 400
    warning: '#fbbf24',      // Amber 400
    error: '#f87171',        // Red 400
    info: '#38bdf8',         // Sky 400
  }
};

// Warm theme
export const warmTheme: ThemeColors = {
  name: 'Warm',
  id: 'warm',
  mode: 'light',
  colors: {
    primary: '#f97316',      // Orange
    secondary: '#ec4899',    // Pink
    background: '#fffbf5',   // Cream background
    foreground: '#1e293b',
    muted: '#f7f2ec',
    accent: '#fef3c7',
    card: '#ffffff',
    border: '#fde68a',
    success: '#15803d',
    warning: '#d97706',
    error: '#b91c1c',
    info: '#0369a1',
  }
};

// Cozy dark theme
export const cozyDarkTheme: ThemeColors = {
  name: 'Cozy Dark',
  id: 'cozy-dark',
  mode: 'dark',
  colors: {
    primary: '#f59e0b',      // Amber
    secondary: '#d946ef',    // Fuchsia
    background: '#1c1917',   // Dark brown
    foreground: '#fafaf9',
    muted: '#292524',
    accent: '#44403c',
    card: '#292524',
    border: '#44403c',
    success: '#16a34a',
    warning: '#d97706',
    error: '#dc2626',
    info: '#0ea5e9',
  }
};

/**
 * Available Themes Registry
 * -------------------------
 * Collection of all available themes for the application
 */
export const themes: Record<string, ThemeColors> = {
  'gray': lightTheme,
  'dark': darkTheme,
  'warm': warmTheme,
  'cozy-dark': cozyDarkTheme,
};

/**
 * Default Theme
 * -------------
 * The fallback theme when none is specified
 */
export const defaultTheme = lightTheme;

/**
 * Utility function to convert RGB components to CSS color
 * @param r - Red component (0-255)
 * @param g - Green component (0-255)
 * @param b - Blue component (0-255)
 * @returns CSS rgb() color string
 */
export function rgbToCSS(r: number, g: number, b: number): string {
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Utility function to convert hex color to RGB components
 * @param hex - Hex color string (e.g., #ff0000)
 * @returns Array of [r, g, b] values
 */
export function hexToRGB(hex: string): [number, number, number] {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Parse r, g, b values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return [r, g, b];
}

/**
 * Utility function to get a theme by ID
 * @param themeId - The ID of the theme to retrieve
 * @returns The theme object or the default theme if not found
 */
export function getTheme(themeId: string): ThemeColors {
  return themes[themeId] || defaultTheme;
} 