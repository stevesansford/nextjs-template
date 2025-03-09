'use client';

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
  useEffect,
  useRef
} from 'react';
import { createPortal } from 'react-dom';

// Toast types for different styles
export type ToastType = 'success' | 'error' | 'warning' | 'info';

// Toast object structure
export interface Toast {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
  duration?: number;
  onClose?: () => void;
}

// Context for the toast system
interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

// Create the context with default values
const ToastContext = createContext<ToastContextType>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {}
});

/**
 * ToastProvider - Context provider for toast notifications
 * 
 * Manages toast notifications and provides methods to add and remove them.
 * 
 * @param {ReactNode} children - Child components
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  // Create a ref for the removeToast function to solve circular dependency
  const removeToastRef = useRef<(id: string) => void>(() => {});
  
  // Remove a toast by ID
  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => {
      const toast = prevToasts.find((t) => t.id === id);
      
      // Call onClose callback if provided
      if (toast?.onClose) {
        toast.onClose();
      }
      
      return prevToasts.filter((t) => t.id !== id);
    });
  }, []);
  
  // Update the ref when the function changes
  useEffect(() => {
    removeToastRef.current = removeToast;
  }, [removeToast]);
  
  // Generate unique ID for toasts
  const generateId = useCallback(() => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }, []);
  
  // Add a new toast
  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = generateId();
    const newToast = { ...toast, id };
    
    setToasts((prevToasts) => [...prevToasts, newToast]);
    
    // Auto-remove toast after duration (default: 5 seconds)
    if (toast.duration !== 0) {
      const duration = toast.duration || 5000;
      setTimeout(() => removeToastRef.current(id), duration);
    }
  }, [generateId]);
  
  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

/**
 * useToast - Hook to access toast functionality
 * 
 * Provides methods to show different types of toast notifications.
 */
export function useToast() {
  const { addToast } = useContext(ToastContext);
  
  const toast = {
    success: (props: Omit<Toast, 'id' | 'type'>) => {
      addToast({ ...props, type: 'success' });
    },
    error: (props: Omit<Toast, 'id' | 'type'>) => {
      addToast({ ...props, type: 'error' });
    },
    warning: (props: Omit<Toast, 'id' | 'type'>) => {
      addToast({ ...props, type: 'warning' });
    },
    info: (props: Omit<Toast, 'id' | 'type'>) => {
      addToast({ ...props, type: 'info' });
    },
    custom: (props: Omit<Toast, 'id'>) => {
      addToast(props);
    }
  };
  
  return toast;
}

/**
 * ToastContainer - Component that renders all active toasts
 * 
 * Creates a portal to render toasts at the root level of the DOM.
 */
function ToastContainer() {
  const { toasts, removeToast } = useContext(ToastContext);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Create portal container when component mounts
  useEffect(() => {
    const container = document.createElement('div');
    container.setAttribute('id', 'toast-container');
    document.body.appendChild(container);
    containerRef.current = container;
    
    return () => {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    };
  }, []);
  
  if (!containerRef.current || toasts.length === 0) {
    return null;
  }
  
  return createPortal(
    <div className="fixed top-0 right-0 p-4 z-50 max-h-screen overflow-hidden flex flex-col items-end">
      {toasts.map((toast) => (
        <ToastComponent key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>,
    containerRef.current
  );
}

/**
 * ToastComponent - Individual toast notification
 * 
 * Renders a single toast with appropriate styling based on type.
 * 
 * @param {Toast} toast - The toast to display
 * @param {function} onClose - Function to call when closing the toast
 */
function ToastComponent({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  // Type-specific styling
  const typeStyles = {
    success: {
      icon: (
        <svg className="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      ),
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800'
    },
    error: {
      icon: (
        <svg className="w-5 h-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      ),
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800'
    },
    warning: {
      icon: (
        <svg className="w-5 h-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      ),
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800'
    },
    info: {
      icon: (
        <svg className="w-5 h-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      ),
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800'
    }
  };
  
  const style = typeStyles[toast.type];
  
  return (
    <div
      className={`
        min-w-[300px] max-w-sm rounded-lg shadow-md border p-4 mb-3
        animate-in slide-in-from-right-5 duration-300
        ${style.bg} ${style.border}
      `}
      role="alert"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">{style.icon}</div>
        
        <div className="ml-3 w-0 flex-1">
          <p className="text-sm font-medium text-foreground">{toast.title}</p>
          {toast.description && (
            <p className="mt-1 text-sm text-muted-foreground">{toast.description}</p>
          )}
        </div>
        
        <button
          onClick={onClose}
          className="ml-4 inline-flex flex-shrink-0 rounded-md text-muted-foreground hover:text-foreground focus:outline-none"
        >
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
} 