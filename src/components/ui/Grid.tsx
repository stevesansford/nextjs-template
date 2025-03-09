'use client';

import { ReactNode } from 'react';

// Grid container props
interface GridProps {
  children: ReactNode;
  className?: string;
  cols?: number | { sm?: number; md?: number; lg?: number; xl?: number; };
  gap?: number | { x?: number; y?: number; };
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  justifyItems?: 'start' | 'center' | 'end' | 'stretch';
}

// Grid item props
interface GridItemProps {
  children: ReactNode;
  className?: string;
  colSpan?: number | { sm?: number; md?: number; lg?: number; xl?: number; };
  rowSpan?: number;
}

/**
 * Grid - Responsive grid container
 * 
 * A flexible grid layout component using CSS Grid with responsive capabilities.
 * 
 * @param {ReactNode} children - Grid items
 * @param {string} className - Additional CSS classes
 * @param {number|object} cols - Number of columns (can be responsive object)
 * @param {number|object} gap - Grid gap (can be separate x/y values)
 * @param {string} alignItems - Vertical alignment of items
 * @param {string} justifyItems - Horizontal alignment of items
 */
export function Grid({
  children,
  className = '',
  cols = 1,
  gap = 4,
  alignItems = 'stretch',
  justifyItems = 'stretch',
}: GridProps) {
  // Build column classes based on cols prop
  let colsClasses = '';
  
  if (typeof cols === 'number') {
    colsClasses = `grid-cols-${cols}`;
  } else {
    // Handle responsive columns
    const { sm, md, lg, xl } = cols;
    colsClasses = [
      'grid-cols-1', // Default for mobile
      sm && `sm:grid-cols-${sm}`,
      md && `md:grid-cols-${md}`,
      lg && `lg:grid-cols-${lg}`,
      xl && `xl:grid-cols-${xl}`,
    ]
      .filter(Boolean)
      .join(' ');
  }
  
  // Build gap classes based on gap prop
  let gapClasses = '';
  
  if (typeof gap === 'number') {
    gapClasses = `gap-${gap}`;
  } else {
    // Handle separate x/y gaps
    const { x, y } = gap;
    gapClasses = [
      x && `gap-x-${x}`,
      y && `gap-y-${y}`,
    ]
      .filter(Boolean)
      .join(' ');
  }
  
  // Build alignment classes
  const alignmentClasses = [
    `items-${alignItems}`,
    `justify-items-${justifyItems}`
  ].join(' ');
  
  return (
    <div className={`grid ${colsClasses} ${gapClasses} ${alignmentClasses} ${className}`}>
      {children}
    </div>
  );
}

/**
 * GridItem - Grid item for use within Grid
 * 
 * A component representing an item within a Grid with options for spanning
 * multiple columns or rows.
 * 
 * @param {ReactNode} children - Item content
 * @param {string} className - Additional CSS classes
 * @param {number|object} colSpan - Number of columns to span (can be responsive)
 * @param {number} rowSpan - Number of rows to span
 */
export function GridItem({
  children,
  className = '',
  colSpan,
  rowSpan,
}: GridItemProps) {
  // Build column span classes
  let colSpanClasses = '';
  
  if (typeof colSpan === 'number') {
    colSpanClasses = `col-span-${colSpan}`;
  } else if (colSpan) {
    // Handle responsive column spans
    const { sm, md, lg, xl } = colSpan;
    colSpanClasses = [
      'col-span-1', // Default for mobile
      sm && `sm:col-span-${sm}`,
      md && `md:col-span-${md}`,
      lg && `lg:col-span-${lg}`,
      xl && `xl:col-span-${xl}`,
    ]
      .filter(Boolean)
      .join(' ');
  }
  
  // Build row span classes
  const rowSpanClasses = rowSpan ? `row-span-${rowSpan}` : '';
  
  return (
    <div className={`${colSpanClasses} ${rowSpanClasses} ${className}`}>
      {children}
    </div>
  );
}

/**
 * ResponsiveGrid - A preconfigured responsive grid
 * 
 * A grid component with sensible responsive defaults.
 */
export function ResponsiveGrid({
  children,
  className = '',
  gap = 4,
  ...props
}: Omit<GridProps, 'cols'>) {
  return (
    <Grid
      cols={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      gap={gap}
      className={className}
      {...props}
    >
      {children}
    </Grid>
  );
}

/**
 * TwoColumnGrid - A preset two-column grid
 * 
 * A grid component with a two-column layout that switches to single column on mobile.
 */
export function TwoColumnGrid({
  children,
  className = '',
  gap = 6,
  ...props
}: Omit<GridProps, 'cols'>) {
  return (
    <Grid
      cols={{ sm: 1, md: 2 }}
      gap={gap}
      className={className}
      {...props}
    >
      {children}
    </Grid>
  );
} 