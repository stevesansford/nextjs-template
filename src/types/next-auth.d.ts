import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";
import { UserRole } from "@/types/prisma";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: UserRole;
      emailVerified?: Date | null;
      timeZone?: string;
      country?: string;
      theme?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role?: UserRole;
    emailVerified?: Date | null;
    timeZone?: string;
    country?: string;
    theme?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: UserRole;
    emailVerified?: Date | null;
    timeZone?: string;
    country?: string;
    theme?: string;
  }
} 