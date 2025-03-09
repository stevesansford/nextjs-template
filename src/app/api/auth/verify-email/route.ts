import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    // Get token from URL parameters
    const searchParams = req.nextUrl.searchParams;
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.redirect(new URL('/auth/verification-error?error=missing-token', req.url));
    }

    // Find the verification token
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      return NextResponse.redirect(new URL('/auth/verification-error?error=invalid-token', req.url));
    }

    // Check if token is expired
    if (verificationToken.expires < new Date()) {
      // Clean up expired token
      await prisma.verificationToken.delete({
        where: { token },
      });
      
      return NextResponse.redirect(new URL('/auth/verification-error?error=expired-token', req.url));
    }

    // Find user by email (identifier)
    const user = await prisma.user.findUnique({
      where: { email: verificationToken.identifier },
    });

    if (!user) {
      return NextResponse.redirect(new URL('/auth/verification-error?error=user-not-found', req.url));
    }

    // Update user's emailVerified status
    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: new Date() },
    });

    // Delete the used token
    await prisma.verificationToken.delete({
      where: { token },
    });

    // Redirect to verification success page
    return NextResponse.redirect(new URL('/auth/verification-success', req.url));
    
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.redirect(new URL('/auth/verification-error?error=server-error', req.url));
  }
} 