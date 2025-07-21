-- Add designer_id column to projects table with foreign key relationship
ALTER TABLE public.projects 
ADD COLUMN designer_id uuid REFERENCES public.designer_profiles(id) ON DELETE SET NULL;

-- Create index on designer_id for better query performance
CREATE INDEX idx_projects_designer_id ON public.projects(designer_id);

-- Create index on designer_profiles user_id for better query performance  
CREATE INDEX idx_designer_profiles_user_id ON public.designer_profiles(user_id);

-- Migrate existing data from designer text field to designer_id
UPDATE public.projects 
SET designer_id = dp.id
FROM public.designer_profiles dp
WHERE projects.designer = dp.name AND projects.designer IS NOT NULL;

-- Create a function to get designer details for projects
CREATE OR REPLACE FUNCTION get_project_with_designer_details()
RETURNS TABLE (
  project_id uuid,
  project_name text,
  client text,
  designer_name text,
  designer_id uuid,
  designer_email text,
  designer_type text,
  designer_status text,
  project_type text,
  project_status text,
  project_description text,
  due_date date,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  user_id uuid
) 
LANGUAGE sql STABLE
AS $$
  SELECT 
    p.id as project_id,
    p.name as project_name,
    p.client,
    dp.name as designer_name,
    dp.id as designer_id,
    dp.email as designer_email,
    dp.type as designer_type,
    dp.status as designer_status,
    p.type as project_type,
    p.status as project_status,
    p.description as project_description,
    p.due_date,
    p.created_at,
    p.updated_at,
    p.user_id
  FROM public.projects p
  LEFT JOIN public.designer_profiles dp ON p.designer_id = dp.id
  WHERE p.user_id = auth.uid()
  ORDER BY p.created_at DESC;
$$;