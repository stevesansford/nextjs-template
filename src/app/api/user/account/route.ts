import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth-options';
import { prisma } from '@/lib/prisma';

// Delete user account
export async function DELETE(_request: Request) {
  try {
    // Get authenticated user session
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'You must be logged in to delete your account' },
        { status: 401 }
      );
    }
    
    // Get user from database
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
      },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Delete user's sessions
    await prisma.session.deleteMany({
      where: {
        userId: user.id,
      },
    });
    
    // Delete user's accounts (OAuth connections)
    await prisma.account.deleteMany({
      where: {
        userId: user.id,
      },
    });
    
    // Delete user
    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Account deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting account:', error);
    
    return NextResponse.json(
      { error: 'An error occurred while deleting your account' },
      { status: 500 }
    );
  }
} 