-- Run this in Supabase SQL Editor if 'price', 'level', or 'category' columns
-- are missing from the 'courses' table.

-- Add price column (defaults to 0)
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS price NUMERIC(10,2) DEFAULT 0;

-- Add level column (defaults to 'Beginner')
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS level TEXT DEFAULT 'Beginner';

-- Add category column (defaults to 'General')
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'General';

-- Add duration column (optional)
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS duration TEXT;
