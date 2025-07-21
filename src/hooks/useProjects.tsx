import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Project {
  id: string;
  name: string;
  client: string;
  type: string;
  status: string;
  description?: string;
  due_date: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setProjects(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

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

  return {
    projects,
    loading,
    error,
    getProjectStats,
    getStatusColor,
    getProgressPercentage,
    refetch: fetchProjects
  };
};