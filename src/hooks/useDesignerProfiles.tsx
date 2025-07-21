import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Designer {
  id: string;
  name: string;
  status: "Active" | "Inactive" | "Busy";
  email: string;
  type: "Senior Designer" | "Junior Designer" | "Lead Designer" | "UI/UX Designer";
  location: string;
  phone?: string;
}

export const useDesignerProfiles = () => {
  const [designers, setDesigners] = useState<Designer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchDesigners = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('designer_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      // Transform the data to match the Designer interface
      const transformedData: Designer[] = (data || []).map((profile) => ({
        id: profile.id,
        name: profile.name || 'Unknown Designer',
        status: (profile.status || 'Active') as Designer['status'],
        email: profile.email || '',
        type: (profile.type || 'Senior Designer') as Designer['type'],
        location: profile.location || 'Unknown Location',
        phone: profile.phone,
      }));

      setDesigners(transformedData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch designer profiles';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchDesigners();
  };

  useEffect(() => {
    fetchDesigners();
  }, []);

  return {
    designers,
    loading,
    error,
    refetch,
  };
};