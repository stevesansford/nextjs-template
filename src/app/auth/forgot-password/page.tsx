'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to send reset email');
      }

      setSubmitted(true);
    } catch (err: Error | unknown) {
      console.error('Password reset error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <div className="w-full max-w-md space-y-8 rounded-xl bg-card p-8 shadow-md">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">Check Your Email</h1>
            <div className="mt-6 text-center">
              <p className="text-muted">
                If an account exists with the email {email}, we&apos;ve sent instructions to reset your password.
              </p>
              <p className="mt-4 text-muted">
                Please check your email inbox and spam folder.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/auth/signin"
                className="text-primary hover:text-primary/90"
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-card p-8 shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Reset Password</h1>
          <p className="mt-2 text-muted">
            Enter your email to receive a password reset link
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-error/10 p-4 text-sm text-error">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded-md border border-border px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-60"
            >
              {isLoading ? 'Sending...' : 'Send reset link'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted">
            Remember your password?{' '}
            <Link
              href="/auth/signin"
              className="font-medium text-primary hover:text-primary/90"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 