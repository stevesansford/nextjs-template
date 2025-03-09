/**
 * Re-export UserRole enum from Prisma
 * This ensures consistent access to the enum values throughout the app
 */
import { PrismaClient } from '@prisma/client';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

/**
 * Helper function to check if a value is an admin role
 * This handles both enum values and string values
 */
export function isAdminRole(role: UserRole | string | undefined | null): boolean {
  if (!role) return false;
  
  // Handle string representation
  if (typeof role === 'string') {
    return role === 'ADMIN';
  }
  
  // Handle enum representation
  return role === UserRole.ADMIN;
}

export const prismaClient = new PrismaClient(); 