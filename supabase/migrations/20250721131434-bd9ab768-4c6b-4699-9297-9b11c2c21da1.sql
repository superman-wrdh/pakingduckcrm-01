-- Add type field to designer_profiles table
ALTER TABLE public.designer_profiles 
ADD COLUMN type TEXT DEFAULT 'Senior Designer';

-- Add some sample data if the table is empty
INSERT INTO public.designer_profiles (user_id, name, email, status, location, phone, type) 
VALUES 
  (gen_random_uuid(), 'Alice Johnson', 'alice.johnson@company.com', 'Active', 'New York, USA', '+1-555-0101', 'Senior Designer'),
  (gen_random_uuid(), 'Bob Chen', 'bob.chen@company.com', 'Busy', 'San Francisco, USA', '+1-555-0102', 'UI/UX Designer'),
  (gen_random_uuid(), 'Carol Martinez', 'carol.martinez@company.com', 'Active', 'Los Angeles, USA', '+1-555-0103', 'Lead Designer'),
  (gen_random_uuid(), 'David Kim', 'david.kim@company.com', 'Inactive', 'Seattle, USA', '+1-555-0104', 'Junior Designer'),
  (gen_random_uuid(), 'Emma Wilson', 'emma.wilson@company.com', 'Active', 'Chicago, USA', '+1-555-0105', 'Senior Designer')
ON CONFLICT (user_id) DO NOTHING;