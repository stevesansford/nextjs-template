import { NextAuthOptions, DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { UserRole } from "@/types/prisma";

// Extend the built-in types
declare module "next-auth" {
  interface User {
    id: string;
    role?: UserRole;
    emailVerified?: Date | null;
    timeZone?: string;
    country?: string;
    theme?: string;
  }

  interface Session {
    user: {
      id: string;
      role?: UserRole;
      emailVerified?: Date | null;
      timeZone?: string;
      country?: string;
      theme?: string;
    } & DefaultSession["user"]
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

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        // Check if email is verified
        // Uncomment the following block to enforce email verification
        /*
        if (!user.emailVerified) {
          throw new Error("email-not-verified");
        }
        */

        // Convert null values to undefined to match NextAuth's User type
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          // Use the actual UserRole enum value
          role: user.role,
          emailVerified: user.emailVerified,
          timeZone: user.timeZone || undefined,
          country: user.country || undefined,
          theme: user.theme || undefined,
        };
      }
    }),
    // You can add more providers here
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // Preserve the UserRole enum value
        token.role = user.role;
        token.emailVerified = user.emailVerified;
        token.timeZone = user.timeZone || undefined;
        token.country = user.country || undefined;
        token.theme = user.theme || undefined;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        // Preserve the UserRole enum value
        session.user.role = token.role;
        session.user.emailVerified = token.emailVerified;
        // Add user settings to the session
        session.user.timeZone = token.timeZone;
        session.user.country = token.country;
        session.user.theme = token.theme;
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/auth/new-user"
  },
  debug: process.env.NODE_ENV === "development",
}; 