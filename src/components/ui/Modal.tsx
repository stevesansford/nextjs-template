'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  closeOnOutsideClick?: boolean;
  showCloseButton?: boolean;
}

/**
 * Modal - Dialog component
 * 
 * A reusable modal dialog component that renders on top of the page content.
 * 
 * @param {boolean} isOpen - Whether the modal is visible
 * @param {function} onClose - Function to call when the modal should close
 * @param {string} title - Modal title
 * @param {ReactNode} children - Modal content
 * @param {ReactNode} footer - Footer content, usually contains action buttons
 * @param {string} maxWidth - Maximum width of the modal (sm, md, lg, xl, 2xl, full)
 * @param {boolean} closeOnOutsideClick - Whether clicking outside the modal should close it
 * @param {boolean} showCloseButton - Whether to show the X close button
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = 'md',
  closeOnOutsideClick = true,
  showCloseButton = true
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Define max width classes based on the prop
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    'full': 'max-w-full'
  };
  
  // Handle escape key press to close modal
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);
  
  // Handle clicks outside the modal content
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOutsideClick && modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };
  
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  // If modal is not open, don't render anything
  if (!isOpen) {
    return null;
  }
  
  // Use a portal to render the modal at the end of the document body
  return createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleOutsideClick}
      aria-modal="true"
      role="dialog"
    >
      {/* Modal container */}
      <div 
        ref={modalRef}
        className={`
          bg-card border border-border rounded-lg shadow-lg
          w-full ${maxWidthClasses[maxWidth]}
          animate-in fade-in duration-200
          max-h-[calc(100vh-2rem)] flex flex-col
        `}
        tabIndex={-1}
      >
        {/* Modal header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            {title && <h3 className="text-lg font-semibold">{title}</h3>}
            
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
        )}
        
        {/* Modal content */}
        <div className="px-6 py-4 overflow-y-auto">{children}</div>
        
        {/* Modal footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-border mt-auto">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
} 