import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth-options';
import { prisma } from '@/lib/prisma';

// Update user settings
export async function PUT(request: Request) {
  try {
    // Get authenticated user session
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'You must be logged in to update your settings' },
        { status: 401 }
      );
    }
    
    // Get request body
    const body = await request.json();
    const { timeZone, country, theme } = body;
    
    // Validate input
    if (!timeZone || !country) {
      return NextResponse.json(
        { error: 'Time zone and country are required' },
        { status: 400 }
      );
    }
    
    // Update user in database
    // Note: This will throw an error until the database schema is updated
    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        timeZone,
        country,
        theme,
      },
    });
    
    // Return success response without sensitive data
    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        timeZone: updatedUser.timeZone,
        country: updatedUser.country,
        theme: updatedUser.theme,
      },
    });
  } catch (error) {
    console.error('Error updating user settings:', error);
    
    return NextResponse.json(
      { error: 'An error occurred while updating your settings' },
      { status: 500 }
    );
  }
} 