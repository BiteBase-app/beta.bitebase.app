import { useState } from 'react';
import apiService from '../services/api';

export interface MarketTrendsData {
  industry_growth_rate: number;
  cuisine_trends: {
    [key: string]: number;
  };
  location_trends: {
    [key: string]: number;
  };
  consumer_preferences: any[];
  emerging_trends: string[];
}

export interface CompetitorAnalysisData {
  total_competitors: number;
  competitors: any[];
  market_saturation: number;
  competitive_positioning: {
    [key: string]: {
      rating: number;
      percentile: number;
      description: string;
    };
  };
  opportunity_areas: string[];
}

export interface PerformanceForecastData {
  revenue_forecast: number[];
  customer_forecast: number[];
  profit_forecast: number[];
  break_even_point: number;
  roi_estimate: number;
  key_performance_indicators: {
    average_check: number;
    customer_retention_rate: number;
    table_turnover_rate: number;
    food_cost_percentage: number;
    labor_cost_percentage: number;
  };
}

export interface CustomerDemographicsData {
  age_distribution: {
    [key: string]: number;
  };
  gender_distribution: {
    [key: string]: number;
  };
  income_levels: {
    [key: string]: number;
  };
  dining_preferences: {
    [key: string]: number;
  };
  visit_frequency: {
    [key: string]: number;
  };
  customer_personas: any[];
}

export const useAnalytics = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Get market trends
  const getMarketTrends = async (cuisineType?: string, location?: string) => {
    try {
      setLoading(true);
      const response = await apiService.getMarketTrends(cuisineType, location);
      setError(null);
      return response.data as MarketTrendsData;
    } catch (err: any) {
      console.error('Error getting market trends:', err);
      setError(err.response?.data?.detail || 'Failed to get market trends');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Get competitor analysis
  const getCompetitorAnalysis = async (restaurantProfileId: string) => {
    try {
      setLoading(true);
      const response = await apiService.getCompetitorAnalysis(restaurantProfileId);
      setError(null);
      return response.data as CompetitorAnalysisData;
    } catch (err: any) {
      console.error('Error getting competitor analysis:', err);
      setError(err.response?.data?.detail || 'Failed to get competitor analysis');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Get performance forecast
  const getPerformanceForecast = async (restaurantProfileId: string, months: number = 12) => {
    try {
      setLoading(true);
      const response = await apiService.getPerformanceForecast(restaurantProfileId, months);
      setError(null);
      return response.data as PerformanceForecastData;
    } catch (err: any) {
      console.error('Error getting performance forecast:', err);
      setError(err.response?.data?.detail || 'Failed to get performance forecast');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Get customer demographics
  const getCustomerDemographics = async (restaurantProfileId: string) => {
    try {
      setLoading(true);
      const response = await apiService.getCustomerDemographics(restaurantProfileId);
      setError(null);
      return response.data as CustomerDemographicsData;
    } catch (err: any) {
      console.error('Error getting customer demographics:', err);
      setError(err.response?.data?.detail || 'Failed to get customer demographics');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getMarketTrends,
    getCompetitorAnalysis,
    getPerformanceForecast,
    getCustomerDemographics,
  };
};
