import { useState, useEffect } from 'react';
import apiService from '../services/api';

export interface ResearchProject {
  id: string;
  name: string;
  description?: string;
  restaurant_profile_id: string;
  status: 'pending' | 'in_progress' | 'completed';
  progress: number;
  competitive_analysis: boolean;
  market_sizing: boolean;
  demographic_analysis: boolean;
  location_intelligence: boolean;
  tourist_analysis: boolean;
  local_competition: boolean;
  pricing_strategy: boolean;
  food_delivery_analysis: boolean;
  results?: any;
  created_at: string;
  updated_at?: string;
  completed_at?: string;
  owner_id: string;
}

export const useResearchProjects = () => {
  const [projects, setProjects] = useState<ResearchProject[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all research projects
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await apiService.getResearchProjects();
      setProjects(response.data);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching research projects:', err);
      setError(err.response?.data?.detail || 'Failed to fetch research projects');
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single research project
  const fetchProject = async (id: string) => {
    try {
      setLoading(true);
      const response = await apiService.getResearchProject(id);
      return response.data;
    } catch (err: any) {
      console.error(`Error fetching research project ${id}:`, err);
      setError(err.response?.data?.detail || 'Failed to fetch research project');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Create a new research project
  const createProject = async (data: Partial<ResearchProject>) => {
    try {
      setLoading(true);
      const response = await apiService.createResearchProject(data);
      setProjects([...projects, response.data]);
      setError(null);
      return response.data;
    } catch (err: any) {
      console.error('Error creating research project:', err);
      setError(err.response?.data?.detail || 'Failed to create research project');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update a research project
  const updateProject = async (id: string, data: Partial<ResearchProject>) => {
    try {
      setLoading(true);
      const response = await apiService.updateResearchProject(id, data);
      setProjects(projects.map(project => project.id === id ? response.data : project));
      setError(null);
      return response.data;
    } catch (err: any) {
      console.error(`Error updating research project ${id}:`, err);
      setError(err.response?.data?.detail || 'Failed to update research project');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Analyze a research project
  const analyzeProject = async (id: string) => {
    try {
      setLoading(true);
      const response = await apiService.analyzeResearchProject(id);
      setProjects(projects.map(project => project.id === id ? response.data : project));
      setError(null);
      return response.data;
    } catch (err: any) {
      console.error(`Error analyzing research project ${id}:`, err);
      setError(err.response?.data?.detail || 'Failed to analyze research project');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Fetch projects on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    fetchProjects,
    fetchProject,
    createProject,
    updateProject,
    analyzeProject,
  };
};
