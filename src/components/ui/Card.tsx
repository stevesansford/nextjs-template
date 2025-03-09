'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string | ReactNode;
  description?: string;
  footer?: ReactNode;
  decoration?: boolean;
  decorationColor?: string;
  isHoverable?: boolean;
  isCompact?: boolean;
}

/**
 * Card - Content container component
 * 
 * A versatile card component for displaying content in a contained box with
 * various styling options.
 * 
 * @param {ReactNode} children - The card content
 * @param {string} className - Additional CSS classes
 * @param {string|ReactNode} title - Card title
 * @param {string} description - Card description text
 * @param {ReactNode} footer - Footer content
 * @param {boolean} decoration - Whether to show a colored decoration on the side
 * @param {string} decorationColor - Color of the decoration (default: primary color)
 * @param {boolean} isHoverable - Whether to add hover effects
 * @param {boolean} isCompact - Whether to use more compact padding
 */
export default function Card({
  children,
  className = '',
  title,
  description,
  footer,
  decoration = false,
  decorationColor = 'primary',
  isHoverable = false,
  isCompact = false
}: CardProps) {
  // Build CSS classes
  const cardClasses = `
    bg-card text-card-foreground rounded-lg border border-border shadow-sm
    ${decoration ? 'overflow-hidden flex' : ''}
    ${isHoverable ? 'transition-all duration-200 hover:shadow-md hover:border-primary/20' : ''}
    ${isCompact ? 'p-3' : 'p-5'}
    ${className}
  `;
  
  // If there's a decoration, render a version with colored side decoration
  if (decoration) {
    return (
      <div className={cardClasses}>
        <div className={`w-1 bg-${decorationColor} h-full mr-4 flex-shrink-0`}></div>
        <div className="flex-grow">
          {title && (
            <div className="mb-3">
              {typeof title === 'string' ? (
                <h3 className="text-lg font-semibold">{title}</h3>
              ) : (
                title
              )}
              {description && <p className="text-muted-foreground text-sm mt-1">{description}</p>}
            </div>
          )}
          <div>{children}</div>
          {footer && <div className="mt-4 pt-3 border-t border-border">{footer}</div>}
        </div>
      </div>
    );
  }
  
  // Standard card layout
  return (
    <div className={cardClasses}>
      {title && (
        <div className="mb-3">
          {typeof title === 'string' ? (
            <h3 className="text-lg font-semibold">{title}</h3>
          ) : (
            title
          )}
          {description && <p className="text-muted-foreground text-sm mt-1">{description}</p>}
        </div>
      )}
      <div>{children}</div>
      {footer && <div className="mt-4 pt-3 border-t border-border">{footer}</div>}
    </div>
  );
} 