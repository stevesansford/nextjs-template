import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth/password';
import { randomBytes } from 'crypto';
import { z } from 'zod';

// Schema for requesting a password reset
const requestResetSchema = z.object({
  email: z.string().email('Invalid email address'),
});

// Schema for resetting the password with token
const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

// Request a password reset
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate input
    const result = requestResetSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.format() },
        { status: 400 }
      );
    }
    
    const { email } = result.data;
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    if (!user) {
      // Return success even if user doesn't exist for security reasons
      return NextResponse.json({ 
        message: 'If a user with that email exists, we sent a password reset link' 
      });
    }
    
    // Generate reset token
    const token = randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600000); // 1 hour from now
    
    // Save verification token
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });
    
    // TODO: Send email with reset link
    // In a real application, you would use an email service to send the link
    // The link should point to your reset password form with the token
    // For demo purposes, we just return the token in the response
    
    return NextResponse.json({ 
      message: 'If a user with that email exists, we sent a password reset link',
      // Remove this in production!
      debug: { token, resetUrl: `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}` }
    });
    
  } catch (error) {
    console.error('Password reset request error:', error);
    return NextResponse.json(
      { error: 'Failed to process password reset request' },
      { status: 500 }
    );
  }
}

// Apply the password reset
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate input
    const result = resetPasswordSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.format() },
        { status: 400 }
      );
    }
    
    const { token, password } = result.data;
    
    // Find the token
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });
    
    if (!verificationToken) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      );
    }
    
    // Check if token is expired
    if (verificationToken.expires < new Date()) {
      // Clean up expired token
      await prisma.verificationToken.delete({
        where: { token },
      });
      
      return NextResponse.json(
        { error: 'Token has expired' },
        { status: 400 }
      );
    }
    
    // Find user by email (identifier)
    const user = await prisma.user.findUnique({
      where: { email: verificationToken.identifier },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Hash the new password
    const hashedPassword = await hashPassword(password);
    
    // Update user's password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });
    
    // Delete the used token
    await prisma.verificationToken.delete({
      where: { token },
    });
    
    return NextResponse.json({ 
      message: 'Password has been reset successfully' 
    });
    
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { error: 'Failed to reset password' },
      { status: 500 }
    );
  }
} 