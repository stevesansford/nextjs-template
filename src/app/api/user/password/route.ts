import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth-options';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// Change user password
export async function PUT(request: Request) {
  try {
    // Get authenticated user session
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'You must be logged in to change your password' },
        { status: 401 }
      );
    }
    
    // Get request body
    const body = await request.json();
    const { currentPassword, newPassword } = body;
    
    // Validate input
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Current password and new password are required' },
        { status: 400 }
      );
    }
    
    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: 'New password must be at least 8 characters long' },
        { status: 400 }
      );
    }
    
    // Get user from database
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    
    if (!user || !user.password) {
      return NextResponse.json(
        { error: 'User not found or password not set' },
        { status: 404 }
      );
    }
    
    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 400 }
      );
    }
    
    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update user password
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Password updated successfully',
    });
  } catch (error) {
    console.error('Error changing password:', error);
    
    return NextResponse.json(
      { error: 'An error occurred while changing your password' },
      { status: 500 }
    );
  }
} 