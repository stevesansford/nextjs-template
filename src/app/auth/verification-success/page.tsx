import Link from 'next/link';

export default function VerificationSuccess() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
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
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="mt-4 text-3xl font-bold">Email Verified!</h1>
          <p className="mt-2 text-gray-600">
            Your email has been successfully verified. You can now use all features of your account.
          </p>
          <div className="mt-8">
            <Link
              href="/auth/signin"
              className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 