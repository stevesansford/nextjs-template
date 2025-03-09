-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- AlterTable: First add a temporary column to avoid data loss
ALTER TABLE "User" ADD COLUMN "role_enum" "UserRole";

-- Update temporary column based on existing role values
UPDATE "User" SET "role_enum" = 'ADMIN' WHERE "role" = 'admin';
UPDATE "User" SET "role_enum" = 'USER' WHERE "role" IS NULL OR "role" != 'admin';

-- Drop the old column and rename the new one
ALTER TABLE "User" DROP COLUMN "role";
ALTER TABLE "User" RENAME COLUMN "role_enum" TO "role";

-- Set the default and not null constraints
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';
ALTER TABLE "User" ALTER COLUMN "role" SET NOT NULL; 