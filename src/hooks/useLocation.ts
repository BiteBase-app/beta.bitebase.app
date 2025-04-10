import { useState } from 'react';
import apiService from '../services/api';

export interface LocationData {
  location_score: number;
  nearby_places: any[];
  accessibility: {
    public_transport: number;
    walking: number;
    parking: number;
  };
  visibility: number;
  foot_traffic: any;
  competitors: any[];
}

export interface CompetitorData {
  total_competitors: number;
  competitors: any[];
  average_rating: number;
  price_level_distribution: {
    $: number;
    $$: number;
    $$$: number;
    $$$$: number;
  };
}

export interface DemographicData {
  population: {
    total: number;
    density: number;
    growth_rate: number;
  };
  age_distribution: {
    [key: string]: number;
  };
  income_levels: {
    [key: string]: number;
  };
  education_levels: {
    [key: string]: number;
  };
  household_types: {
    [key: string]: number;
  };
}

export const useLocation = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Analyze a location
  const analyzeLocation = async (latitude: number, longitude: number, radius: number = 1.0) => {
    try {
      setLoading(true);
      const response = await apiService.analyzeLocation(latitude, longitude, radius);
      setError(null);
      return response.data as LocationData;
    } catch (err: any) {
      console.error('Error analyzing location:', err);
      setError(err.response?.data?.detail || 'Failed to analyze location');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Get competitors for a location
  const getCompetitors = async (latitude: number, longitude: number, radius: number = 1.0, cuisineType?: string) => {
    try {
      setLoading(true);
      const response = await apiService.getCompetitors(latitude, longitude, radius, cuisineType);
      setError(null);
      return response.data as CompetitorData;
    } catch (err: any) {
      console.error('Error getting competitors:', err);
      setError(err.response?.data?.detail || 'Failed to get competitors');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Get demographics for a location
  const getDemographics = async (latitude: number, longitude: number, radius: number = 1.0) => {
    try {
      setLoading(true);
      const response = await apiService.getDemographics(latitude, longitude, radius);
      setError(null);
      return response.data as DemographicData;
    } catch (err: any) {
      console.error('Error getting demographics:', err);
      setError(err.response?.data?.detail || 'Failed to get demographics');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    analyzeLocation,
    getCompetitors,
    getDemographics,
  };
};
