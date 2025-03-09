/**
 * Font Configuration
 * -----------------
 * This file centralizes font-related configurations for the application.
 * It provides utilities and constants for using fonts consistently
 * throughout the application.
 */

/**
 * Font weights mapped to semantic names for better readability
 */
export const fontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  bold: 700,
};

/**
 * CSS class names for different font styles
 */
export const fontClasses = {
  // Heading styles
  h1: "text-4xl font-bold tracking-tight",
  h2: "text-3xl font-bold tracking-tight",
  h3: "text-2xl font-bold",
  h4: "text-xl font-bold",
  h5: "text-lg font-bold",
  h6: "text-base font-bold",
  
  // Text styles
  body: "text-base",
  bodySmall: "text-sm",
  bodyLarge: "text-lg",
  
  // Interactive elements
  button: "text-sm font-medium",
  caption: "text-xs",
  
  // Special text
  code: "font-mono text-sm",
  label: "text-sm font-medium",
  hint: "text-sm text-muted-foreground",
};

/**
 * Helper function to combine font classes with custom classes
 */
export function getFontClass(
  type: keyof typeof fontClasses,
  customClasses?: string
): string {
  return `${fontClasses[type]} ${customClasses || ""}`.trim();
} 