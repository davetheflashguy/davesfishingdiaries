-- Add water_body column to catches table if it doesn't exist
ALTER TABLE catches 
ADD COLUMN IF NOT EXISTS water_body TEXT;
