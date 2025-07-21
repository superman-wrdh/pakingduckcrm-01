import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ProjectWithDesigner {
  id: string;
  name: string;
  client: string;
  designer?: {
    id: string;
    name: string;
    email: string;
    type: string;
    status: string;
  };
  type: string;
  status: string;
  description?: string;
  due_date: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export const useProjectsWithDesigners = () => {
  const [projects, setProjects] = useState<ProjectWithDesigner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch projects with joined designer information
      const { data, error: fetchError } = await supabase
        .from('projects')
        .select(`
          id,
          name,
          client,
          type,
          status,
          description,
          due_date,
          created_at,
          updated_at,
          user_id,
          designer_profiles!projects_designer_id_fkey (
            id,
            name,
            email,
            type,
            status
          )
        `)
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      // Transform the data to match the ProjectWithDesigner interface
      const transformedData: ProjectWithDesigner[] = (data || []).map((project) => ({
        id: project.id,
        name: project.name,
        client: project.client,
        designer: project.designer_profiles ? {
          id: project.designer_profiles.id,
          name: project.designer_profiles.name || 'Unknown Designer',
          email: project.designer_profiles.email || '',
          type: project.designer_profiles.type || 'Designer',
          status: project.designer_profiles.status || 'active'
        } : undefined,
        type: project.type,
        status: project.status,
        description: project.description,
        due_date: project.due_date,
        created_at: project.created_at,
        updated_at: project.updated_at,
        user_id: project.user_id,
      }));

      setProjects(transformedData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch projects';
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

  const assignDesignerToProject = async (projectId: string, designerId: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ designer_id: designerId })
        .eq('id', projectId);

      if (error) throw error;

      // Refresh projects after assignment
      await fetchProjects();
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to assign designer';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    }
  };

  const unassignDesignerFromProject = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ designer_id: null })
        .eq('id', projectId);

      if (error) throw error;

      // Refresh projects after unassignment
      await fetchProjects();
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to unassign designer';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    }
  };

  const getProjectStats = () => {
    const totalProjects = projects.length;
    const activeProjects = projects.filter(p => 
      !['complete', 'delivering'].includes(p.status)
    ).length;
    const completedThisMonth = projects.filter(p => {
      const completedDate = new Date(p.updated_at);
      const now = new Date();
      return p.status === 'complete' && 
        completedDate.getMonth() === now.getMonth() && 
        completedDate.getFullYear() === now.getFullYear();
    }).length;

    return {
      totalProjects,
      activeProjects,
      completedThisMonth,
      inProgress: projects.filter(p => ['design development', 'prototyping', 'testing & refinement', 'production'].includes(p.status)).length
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "project initiation": return "bg-gray-100 text-gray-800";
      case "design development": return "bg-blue-100 text-blue-800";
      case "prototyping": return "bg-purple-100 text-purple-800";
      case "testing & refinement": return "bg-yellow-100 text-yellow-800";
      case "production": return "bg-orange-100 text-orange-800";
      case "delivering": return "bg-cyan-100 text-cyan-800";
      case "complete": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressPercentage = (status: string) => {
    switch (status) {
      case "project initiation": return 10;
      case "design development": return 25;
      case "prototyping": return 45;
      case "testing & refinement": return 65;
      case "production": return 80;
      case "delivering": return 95;
      case "complete": return 100;
      default: return 0;
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    getProjectStats,
    getStatusColor,
    getProgressPercentage,
    assignDesignerToProject,
    unassignDesignerFromProject,
    refetch: fetchProjects
  };
};