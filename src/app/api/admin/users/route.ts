import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth-options';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@/types/prisma';

// Get all users (admin only)
export async function GET(request: NextRequest) {
  try {
    // Check admin authorization
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }
    
    // Get query parameters for pagination
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    // Get users with pagination
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        emailVerified: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    // Get total user count for pagination
    const total = await prisma.user.count();
    
    return NextResponse.json({
      users,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    
    return NextResponse.json(
      { error: 'An error occurred while fetching users' },
      { status: 500 }
    );
  }
}

// Delete a user (admin only)
export async function DELETE(request: NextRequest) {
  try {
    // Check admin authorization
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }
    
    // Get user ID from request body
    const body = await request.json();
    const { userId } = body;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Check if attempting to delete self (prevent admin from deleting themselves)
    if (user.email === session.user.email) {
      return NextResponse.json(
        { error: 'Cannot delete your own account through admin panel' },
        { status: 400 }
      );
    }
    
    // Delete user's sessions
    await prisma.session.deleteMany({
      where: { userId },
    });
    
    // Delete user's accounts (OAuth connections)
    await prisma.account.deleteMany({
      where: { userId },
    });
    
    // Delete the user
    await prisma.user.delete({
      where: { id: userId },
    });
    
    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    
    return NextResponse.json(
      { error: 'An error occurred while deleting the user' },
      { status: 500 }
    );
  }
} 