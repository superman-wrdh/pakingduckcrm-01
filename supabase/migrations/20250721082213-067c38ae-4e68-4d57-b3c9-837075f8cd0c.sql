-- Add designer column to projects table
ALTER TABLE public.projects 
ADD COLUMN designer text;