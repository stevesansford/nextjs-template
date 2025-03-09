'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate form
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register');
      }

      // Registration successful, now log in automatically
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        setError('Registration successful, but failed to sign in automatically. Please sign in manually.');
        router.push('/auth/signin?registered=true');
      } else {
        // Automatically signed in, redirect to dashboard
        router.push('/dashboard');
      }
    } catch (err: Error | unknown) {
      console.error('Registration error:', err);
      
      // Check what kind of error we have and set appropriate message
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred during registration');
      }
      
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-card p-8 shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Create an Account</h1>
          <p className="mt-2 text-muted">
            Sign up to get started
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-error/10 p-4 text-sm text-error">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 block w-full rounded-md border border-border px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

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
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full rounded-md border border-border px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
              <p className="mt-1 text-xs text-muted">
                Must be at least 8 characters long
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="mt-1 block w-full rounded-md border border-border px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-60"
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted">
            Already have an account?{' '}
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