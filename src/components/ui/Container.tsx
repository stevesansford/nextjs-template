'use client';

import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'fluid';
  padding?: boolean | { x?: boolean; y?: boolean; };
  centered?: boolean;
}

/**
 * Container - Content container with consistent width and padding
 * 
 * A responsive container component that provides consistent max-width
 * and horizontal padding for page content.
 * 
 * @param {ReactNode} children - Container content
 * @param {string} className - Additional CSS classes
 * @param {string} size - Container size (sm, md, lg, xl, full, fluid)
 * @param {boolean|object} padding - Whether to add padding (can separate x/y)
 * @param {boolean} centered - Whether to center the container horizontally
 */
export default function Container({
  children,
  className = '',
  size = 'lg',
  padding = true,
  centered = true,
}: ContainerProps) {
  // Define container width based on size
  const containerSize = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    full: 'max-w-screen-2xl',
    fluid: 'max-w-none',
  }[size];
  
  // Define padding classes
  let paddingClasses = '';
  
  if (typeof padding === 'boolean') {
    paddingClasses = padding ? 'px-4 sm:px-6 py-8' : '';
  } else {
    const { x = true, y = true } = padding;
    paddingClasses = [
      x && 'px-4 sm:px-6',
      y && 'py-8',
    ]
      .filter(Boolean)
      .join(' ');
  }
  
  // Define container class list
  const containerClasses = [
    containerSize,
    paddingClasses,
    centered && 'mx-auto',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  
  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
}

/**
 * Section - Container with semantic section wrapper
 * 
 * A specialized Container that wraps content in a <section> element
 * and adds vertical spacing.
 */
export function Section({
  children,
  className = '',
  ...props
}: ContainerProps) {
  return (
    <section className={`py-12 md:py-16 ${className}`}>
      <Container {...props}>
        {children}
      </Container>
    </section>
  );
}

/**
 * ContentSection - Container specifically for article/text content
 * 
 * A specialized Container with typography-friendly max width and
 * increased spacing.
 */
export function ContentSection({
  children,
  className = '',
  size = 'md',
  ...props
}: ContainerProps) {
  return (
    <Container 
      size={size} 
      className={`prose dark:prose-invert prose-headings:font-semibold prose-a:text-primary max-w-prose ${className}`}
      {...props}
    >
      {children}
    </Container>
  );
} 