-- Add role field to User model
ALTER TABLE "User" ADD COLUMN "role" TEXT NOT NULL DEFAULT 'user';

-- Update any existing users (optional: you can set specific users as admins here)
-- Example: UPDATE "User" SET "role" = 'admin' WHERE "email" = 'admin@example.com'; 