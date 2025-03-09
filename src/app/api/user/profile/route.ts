import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth-options';
import { prisma } from '@/lib/prisma';

// Update user profile
export async function PUT(request: Request) {
  try {
    // Get authenticated user session
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'You must be logged in to update your profile' },
        { status: 401 }
      );
    }
    
    // Get request body
    const body = await request.json();
    const { name } = body;
    
    // Validate input
    if (typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }
    
    // Update user in database
    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        name: name.trim(),
      },
    });
    
    // Return success response without sensitive data
    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    
    return NextResponse.json(
      { error: 'An error occurred while updating your profile' },
      { status: 500 }
    );
  }
} 