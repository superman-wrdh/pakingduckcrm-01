-- Add type field to designer_profiles table
ALTER TABLE public.designer_profiles 
ADD COLUMN type TEXT DEFAULT 'Senior Designer';