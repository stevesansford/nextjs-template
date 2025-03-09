import { PrismaClient } from '@prisma/client';
import { UserRole } from '@/types/prisma';

const prisma = new PrismaClient();

/**
 * Script to set a user as an admin
 * Run with: npx ts-node scripts/set-admin-user.ts you@example.com
 */
async function main() {
  // Get email from command line argument
  const email = process.argv[2];
  
  if (!email) {
    console.error('Please provide an email address');
    process.exit(1);
  }
  
  try {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, name: true, email: true, role: true }
    });
    
    if (!user) {
      console.error(`User with email ${email} not found`);
      process.exit(1);
    }
    
    // Update user role to ADMIN
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { role: UserRole.ADMIN },
      select: { id: true, name: true, email: true, role: true }
    });
    
    console.log('User updated successfully:');
    console.log(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 