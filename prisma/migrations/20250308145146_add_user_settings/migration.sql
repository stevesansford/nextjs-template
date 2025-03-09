-- AlterTable
ALTER TABLE "User" ADD COLUMN     "country" TEXT DEFAULT 'US',
ADD COLUMN     "theme" TEXT,
ADD COLUMN     "timeZone" TEXT DEFAULT 'UTC';
