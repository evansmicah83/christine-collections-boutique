-- Add saved delivery addresses array to profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS saved_addresses JSONB[] NOT NULL DEFAULT '{}';
