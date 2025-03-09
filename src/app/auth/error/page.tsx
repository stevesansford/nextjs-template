'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams?.get('error') || 'default';
  
  const errorMessages: Record<string, { title: string; message: string }> = {
    'default': {
      title: 'Authentication Error',
      message: 'An error occurred during authentication. Please try again.',
    },
    'accessdenied': {
      title: 'Access Denied',
      message: 'You do not have permission to sign in.',
    },
    'verification': {
      title: 'Verification Required',
      message: 'Please check your email to verify your account before signing in.',
    },
    'email-not-verified': {
      title: 'Email Not Verified',
      message: 'You need to verify your email before signing in. Please check your inbox for a verification email.',
    },
    'credentialssignin': {
      title: 'Invalid Credentials',
      message: 'The email or password you entered is incorrect. Please try again.',
    },
  };
  
  const { title, message } = errorMessages[error] || errorMessages['default'];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">{title}</h1>
          <p className="mt-2 text-gray-600">{message}</p>
          
          <div className="mt-8 space-y-4">
            <Link
              href="/auth/signin"
              className="block text-blue-600 hover:text-blue-500"
            >
              Return to sign in
            </Link>
            
            {error === 'email-not-verified' && (
              <Link
                href="/auth/verify-request"
                className="block text-blue-600 hover:text-blue-500"
              >
                Resend verification email
              </Link>
            )}
            
            <Link
              href="/"
              className="block text-blue-600 hover:text-blue-500"
            >
              Go to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthError() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md">
          <div className="text-center">
            <h1 className="mt-4 text-3xl font-bold text-gray-900">Authentication Error</h1>
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <AuthErrorContent />
    </Suspense>
  );
} 