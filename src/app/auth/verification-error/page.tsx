'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function VerificationErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams?.get('error') || 'unknown-error';
  
  const errorMessages: Record<string, string> = {
    'missing-token': 'No verification token was provided.',
    'invalid-token': 'The verification link is invalid.',
    'expired-token': 'The verification link has expired.',
    'user-not-found': 'User associated with this verification link could not be found.',
    'server-error': 'A server error occurred during verification.',
    'unknown-error': 'An unknown error occurred during verification.'
  };
  
  const errorMessage = errorMessages[error] || errorMessages['unknown-error'];

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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="mt-4 text-3xl font-bold">Verification Failed</h1>
          <p className="mt-2 text-gray-600">
            {errorMessage}
          </p>
          <div className="mt-8 space-y-4">
            <Link
              href="/auth/signin"
              className="block text-blue-600 hover:text-blue-500"
            >
              Return to sign in
            </Link>
            {(error === 'expired-token' || error === 'invalid-token') && (
              <Link
                href="/auth/signup"
                className="block text-blue-600 hover:text-blue-500"
              >
                Sign up again
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerificationError() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Verification Failed</h1>
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <VerificationErrorContent />
    </Suspense>
  );
} 