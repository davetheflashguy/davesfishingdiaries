-- Remove duplicate catches keeping only the first occurrence
DELETE FROM catches c1
USING catches c2
WHERE c1.id > c2.id
  AND c1.species = c2.species
  AND c1.date_caught = c2.date_caught
  AND c1.time_of_day IS NOT DISTINCT FROM c2.time_of_day
  AND c1.lure IS NOT DISTINCT FROM c2.lure;

-- Add unique constraint to prevent future duplicates
ALTER TABLE catches
ADD CONSTRAINT catches_unique 
UNIQUE (species, date_caught, time_of_day, lure);
