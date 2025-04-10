import { useState, useEffect } from 'react';
import apiService from '../services/api';

export interface RestaurantProfile {
  id: string;
  restaurant_name: string;
  concept_description?: string;
  cuisine_type?: string;
  target_audience?: string;
  price_range?: string;
  business_type: string;
  is_local_brand: boolean;
  street_address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  district?: string;
  building_name?: string;
  floor?: string;
  nearest_bts?: string;
  nearest_mrt?: string;
  latitude?: number;
  longitude?: number;
  research_goals?: string[];
  created_at: string;
  updated_at?: string;
  owner_id: string;
}

export const useRestaurantProfiles = () => {
  const [profiles, setProfiles] = useState<RestaurantProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all restaurant profiles
  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const response = await apiService.getRestaurantProfiles(true); // Use mock data
      setProfiles(response.data);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching restaurant profiles:', err);
      setError(err.response?.data?.detail || 'Failed to fetch restaurant profiles');
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single restaurant profile
  const fetchProfile = async (id: string) => {
    try {
      setLoading(true);
      const response = await apiService.getRestaurantProfile(id);
      return response.data;
    } catch (err: any) {
      console.error(`Error fetching restaurant profile ${id}:`, err);
      setError(err.response?.data?.detail || 'Failed to fetch restaurant profile');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Create a new restaurant profile
  const createProfile = async (data: Partial<RestaurantProfile>) => {
    try {
      setLoading(true);
      const response = await apiService.createRestaurantProfile(data);
      setProfiles([...profiles, response.data]);
      setError(null);
      return response.data;
    } catch (err: any) {
      console.error('Error creating restaurant profile:', err);
      setError(err.response?.data?.detail || 'Failed to create restaurant profile');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update a restaurant profile
  const updateProfile = async (id: string, data: Partial<RestaurantProfile>) => {
    try {
      setLoading(true);
      const response = await apiService.updateRestaurantProfile(id, data);
      setProfiles(profiles.map(profile => profile.id === id ? response.data : profile));
      setError(null);
      return response.data;
    } catch (err: any) {
      console.error(`Error updating restaurant profile ${id}:`, err);
      setError(err.response?.data?.detail || 'Failed to update restaurant profile');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete a restaurant profile
  const deleteProfile = async (id: string) => {
    try {
      setLoading(true);
      await apiService.deleteRestaurantProfile(id);
      setProfiles(profiles.filter(profile => profile.id !== id));
      setError(null);
      return true;
    } catch (err: any) {
      console.error(`Error deleting restaurant profile ${id}:`, err);
      setError(err.response?.data?.detail || 'Failed to delete restaurant profile');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Fetch profiles on mount
  useEffect(() => {
    fetchProfiles();
  }, []);

  return {
    profiles,
    loading,
    error,
    fetchProfiles,
    fetchProfile,
    createProfile,
    updateProfile,
    deleteProfile,
  };
};
