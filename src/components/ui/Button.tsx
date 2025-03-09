'use client';

import { ReactNode, ButtonHTMLAttributes, forwardRef } from 'react';
import Link from 'next/link';

// Button variants
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';

// Button sizes
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

// Props for the button component
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isFullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  href?: string;
  external?: boolean;
}

/**
 * Button - Interactive button component
 * 
 * A versatile button component with various styles, sizes, and states.
 * Can be rendered as a button or a link.
 * 
 * @param {ReactNode} children - Button content/label
 * @param {ButtonVariant} variant - Visual style of the button
 * @param {ButtonSize} size - Size of the button
 * @param {boolean} isFullWidth - Whether the button should take full width
 * @param {boolean} isLoading - Whether to show a loading spinner
 * @param {ReactNode} leftIcon - Icon to show before the button text
 * @param {ReactNode} rightIcon - Icon to show after the button text
 * @param {string} href - If provided, renders as a link instead of a button
 * @param {boolean} external - If true and href is provided, opens link in a new tab
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  isFullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  href,
  external = false,
  className = '',
  disabled,
  ...props
}, ref) => {
  // Variant styles
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
    outline: 'border border-border bg-background hover:bg-muted',
    ghost: 'hover:bg-muted',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    link: 'text-primary underline-offset-4 hover:underline p-0 h-auto',
  };
  
  // Size styles
  const sizeClasses = {
    sm: 'h-8 px-3 text-xs rounded-md',
    md: 'h-10 px-4 rounded-md',
    lg: 'h-12 px-6 rounded-md',
    icon: 'h-10 w-10 rounded-md p-0',
  };
  
  // Combined classes for the button
  const buttonClasses = `
    inline-flex items-center justify-center
    font-medium
    transition-colors
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-offset-2
    focus-visible:ring-primary
    disabled:opacity-50
    disabled:pointer-events-none
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${isFullWidth ? 'w-full' : ''}
    ${className}
  `;
  
  // Loading spinner component
  const LoadingSpinner = () => (
    <svg
      className="animate-spin -ml-1 mr-2 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
  
  // Content to render inside the button
  const content = (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </>
  );
  
  // If href is provided, render as a Link
  if (href) {
    return (
      <Link
        href={href}
        className={buttonClasses}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </Link>
    );
  }
  
  // Otherwise render as a button
  return (
    <button
      ref={ref}
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {content}
    </button>
  );
});

Button.displayName = 'Button';

export default Button; 