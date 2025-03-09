'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthLayout from '@/components/layouts/AuthLayout';
import Button from '@/components/ui/Button';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError('Invalid email or password');
        setIsLoading(false);
        return;
      }

      // Successfully signed in, redirect to dashboard instead of homepage
      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      console.error('Sign in error:', err);
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Sign In"
      subtitle="Sign in to your account to continue"
      showBackLink={true}
      backLinkText="Back to home"
      backLinkHref="/"
    >
      {error && (
        <div className="rounded-md bg-error/10 p-4 text-sm text-error mb-6">
          {error}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
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
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                Password
              </label>
              <Link 
                href="/auth/forgot-password"
                className="text-sm font-medium text-primary hover:text-primary/90"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full rounded-md border border-border px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          isFullWidth
        >
          Sign in
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted">
            Don&apos;t have an account?{' '}
            <Link
              href="/auth/signup"
              className="font-medium text-primary hover:text-primary/90"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
} 