import React from 'react';
import { fontClasses, getFontClass } from '@/lib/fonts';

type TypographyVariant = keyof typeof fontClasses;

type TypographyProps = {
  variant?: TypographyVariant;
  component?: React.ElementType;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

/**
 * Typography component for consistent text styling throughout the application.
 * 
 * @example
 * // Heading with default h1 tag
 * <Typography variant="h1">Main Heading</Typography>
 * 
 * @example
 * // Body text with span element and additional classes
 * <Typography variant="body" component="span" className="text-primary">Some text</Typography>
 */
export default function Typography({
  variant = 'body',
  component,
  className = '',
  children,
  ...rest
}: TypographyProps) {
  // Map variants to default HTML elements if not specified
  const defaultElementMap: Record<TypographyVariant, React.ElementType> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    body: 'p',
    bodySmall: 'p',
    bodyLarge: 'p',
    button: 'span',
    caption: 'span',
    code: 'code',
    label: 'label',
    hint: 'span',
  };

  const Component = component || defaultElementMap[variant];
  const fontClass = getFontClass(variant, className);

  return (
    <Component className={fontClass} {...rest}>
      {children}
    </Component>
  );
}

/**
 * Heading component for convenient heading usage
 */
export function Heading({
  level = 1,
  className = '',
  children,
  ...rest
}: {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>) {
  const variant = `h${level}` as TypographyVariant;
  return (
    <Typography variant={variant} className={className} {...rest}>
      {children}
    </Typography>
  );
}

/**
 * Text component for paragraph and span text elements
 */
export function Text({
  size = 'normal',
  component = 'p',
  className = '',
  children,
  ...rest
}: {
  size?: 'small' | 'normal' | 'large';
  component?: 'p' | 'span' | 'div';
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  const sizeVariantMap = {
    small: 'bodySmall',
    normal: 'body',
    large: 'bodyLarge',
  };
  
  const variant = sizeVariantMap[size] as TypographyVariant;
  
  return (
    <Typography variant={variant} component={component} className={className} {...rest}>
      {children}
    </Typography>
  );
} 