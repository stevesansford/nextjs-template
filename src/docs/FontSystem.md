# Font System Documentation

This Next.js template uses a flexible and maintainable font system designed to ensure consistent typography throughout your application.

## Table of Contents

1. [Font Selection](#font-selection)
2. [Font Configuration](#font-configuration)
3. [Typography Components](#typography-components)
4. [Font Classes](#font-classes)
5. [Changing Fonts](#changing-fonts)

## Font Selection

The template uses [Roboto](https://fonts.google.com/specimen/Roboto) as the primary sans-serif font and [Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono) for code blocks and monospaced text. These fonts are loaded and optimized using Next.js's built-in font optimization.

## Font Configuration

The font configuration is centralized in two main files:

1. `src/app/layout.tsx` - Loads and configures the fonts
2. `src/lib/fonts.ts` - Defines font weights, classes, and utility functions

### Layout Configuration

The root layout file sets up the font variables that are used throughout the application:

```tsx
// src/app/layout.tsx
import { Roboto, Roboto_Mono } from "next/font/google";

// Main font for most text
const robotoSans = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

// Monospace font for code blocks
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});
```

### Font Utility

The fonts utility file provides consistent font definitions:

```tsx
// src/lib/fonts.ts
export const fontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  bold: 700,
};

export const fontClasses = {
  h1: "text-4xl font-bold tracking-tight",
  h2: "text-3xl font-bold tracking-tight",
  // ...more class definitions
};

export function getFontClass(
  type: keyof typeof fontClasses,
  customClasses?: string
): string {
  return `${fontClasses[type]} ${customClasses || ""}`.trim();
}
```

## Typography Components

The template includes a Typography component system for consistent text styling.

### Basic Usage

```tsx
import Typography, { Heading, Text } from '@/components/ui/Typography';

// Using the main Typography component
<Typography variant="h1">Main Heading</Typography>

// Using the Heading convenience component
<Heading level={2}>Section Title</Heading>

// Using the Text convenience component
<Text size="large">Larger paragraph text</Text>
```

### Available Variants

- Headings: `h1`, `h2`, `h3`, `h4`, `h5`, `h6`
- Text: `body`, `bodySmall`, `bodyLarge`
- Special: `button`, `caption`, `code`, `label`, `hint`

## Font Classes

The font system defines standardized classes for different text styles, which you can use directly in your Tailwind classes or through the Typography components.

## Changing Fonts

To change the fonts used in this template, follow these steps:

### 1. Update the Font Import

In `src/app/layout.tsx`, change the font import to your preferred Google Font or local font:

```tsx
// For Google Fonts
import { YourFont, YourFont_Mono } from "next/font/google";

// OR for local fonts
import localFont from "next/font/local";
const yourFont = localFont({
  src: "../assets/fonts/your-font.woff2",
  variable: "--font-sans",
});
```

### 2. Update Font Configuration

Update the font configuration with the appropriate weights:

```tsx
const yourFont = YourFont({
  subsets: ["latin"], 
  weight: ["400", "500", "700"], // Adjust to available weights
  variable: "--font-sans",
  display: "swap",
});
```

### 3. Update Font Classes (Optional)

If your new font has different visual characteristics, you may want to adjust the font classes in `src/lib/fonts.ts`:

```tsx
export const fontClasses = {
  h1: "text-5xl font-bold tracking-normal", // Adjust as needed
  // ... update other styles
};
```

### 4. Testing Your Changes

After making these changes, test your application on various screen sizes to ensure the new fonts work well in all contexts.

---

By following this font system structure, you can maintain consistent typography throughout your application while making it easy to change fonts when needed. 