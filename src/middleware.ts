import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { isAdminRole } from '@/types/prisma';

// Routes that require authentication
const protectedRoutes = ['/dashboard', '/account'];

// Routes that require admin role
const adminRoutes = ['/dashboard/admin'];

// Routes that should be redirected to the dashboard if already authenticated
const authRoutes = ['/auth/signin', '/auth/signup'];

/**
 * Next.js 15 middleware function
 * Handles authentication routing for protected and auth routes
 * Updated for faster execution and better typing
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Fast path: skip middleware for non-relevant routes
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  
  if (!isProtectedRoute && !isAuthRoute && !isAdminRoute) {
    return NextResponse.next();
  }
  
  try {
    // Get the next-auth session token with optimized options
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: process.env.NODE_ENV === 'production', // Only use secure cookies in production
    });
    
    // Redirect to login if accessing a protected route without a token
    if (isProtectedRoute && !token) {
      const url = new URL('/auth/signin', request.url);
      // Add the current URL as a ?callbackUrl= parameter so the user is redirected
      // back to where they were after signing in
      url.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(url);
    }
    
    // Check admin routes
    if (isAdminRoute) {
      if (!token) {
        const url = new URL('/auth/signin', request.url);
        url.searchParams.set('callbackUrl', encodeURI(request.url));
        return NextResponse.redirect(url);
      }
      
      // Use the helper function to check admin role
      if (!isAdminRole(token.role)) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }
    
    // Redirect to dashboard if accessing auth routes with a token
    if (isAuthRoute && token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    
    // Fail gracefully in case of errors
    return NextResponse.next();
  }
}

/**
 * Define which paths the middleware should run on
 * This is a Next.js 15 performance optimization to avoid running middleware on all routes
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     * But only match routes that are auth-relevant
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
    '/dashboard/:path*',
    '/account/:path*',
    '/auth/signin',
    '/auth/signup'
  ],
}; 