'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function VerifyRequest() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // In a real application, this would send a request to resend verification email
      // For now, we'll just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      /* Uncomment this in a real implementation
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to send verification email');
      }
      */

      setSubmitted(true);
    } catch (err: Error | unknown) {
      console.error('Verification email error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Check Your Email</h1>
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                If an account exists with the email {email}, we&apos;ve sent instructions to verify your email address.
              </p>
              <p className="mt-4 text-gray-600">
                Please check your email inbox and spam folder.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/auth/signin"
                className="text-blue-600 hover:text-blue-500"
              >
                Return to sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Verify Your Email</h1>
          <p className="mt-2 text-gray-600">
            Enter your email to receive a verification link
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60"
            >
              {isLoading ? 'Sending...' : 'Send verification link'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already verified your email?{' '}
            <Link
              href="/auth/signin"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 