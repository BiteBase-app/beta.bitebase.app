import { useState, useEffect } from 'react';
import apiService from '../services/api';

export interface Report {
  id: string;
  name: string;
  type: 'market_analysis' | 'competitive_analysis' | 'location_intelligence' | 'demographic_analysis' | 'custom';
  format: 'pdf' | 'excel' | 'csv' | 'json';
  research_project_id: string;
  data?: any;
  file_path?: string;
  created_at: string;
  updated_at?: string;
  owner_id: string;
}

export const useReports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all reports
  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await apiService.getReports();
      setReports(response.data);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching reports:', err);
      setError(err.response?.data?.detail || 'Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single report
  const fetchReport = async (id: string) => {
    try {
      setLoading(true);
      const response = await apiService.getReport(id);
      return response.data;
    } catch (err: any) {
      console.error(`Error fetching report ${id}:`, err);
      setError(err.response?.data?.detail || 'Failed to fetch report');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Create a new report
  const createReport = async (data: Partial<Report>) => {
    try {
      setLoading(true);
      const response = await apiService.createReport(data);
      setReports([...reports, response.data]);
      setError(null);
      return response.data;
    } catch (err: any) {
      console.error('Error creating report:', err);
      setError(err.response?.data?.detail || 'Failed to create report');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Download a report
  const downloadReport = async (id: string) => {
    try {
      setLoading(true);
      const response = await apiService.downloadReport(id);
      
      // Get the report to determine the filename
      const reportResponse = await apiService.getReport(id);
      const report = reportResponse.data;
      
      // Create a blob from the response data
      const blob = new Blob([response.data]);
      
      // Create a link element and trigger download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${report.name.replace(/\s+/g, '_').toLowerCase()}.${report.format}`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      setError(null);
      return true;
    } catch (err: any) {
      console.error(`Error downloading report ${id}:`, err);
      setError(err.response?.data?.detail || 'Failed to download report');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Fetch reports by project
  const fetchReportsByProject = async (researchProjectId: string) => {
    try {
      setLoading(true);
      const response = await apiService.getReportsByProject(researchProjectId);
      return response.data;
    } catch (err: any) {
      console.error(`Error fetching reports for project ${researchProjectId}:`, err);
      setError(err.response?.data?.detail || 'Failed to fetch reports for project');
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Fetch reports on mount
  useEffect(() => {
    fetchReports();
  }, []);

  return {
    reports,
    loading,
    error,
    fetchReports,
    fetchReport,
    createReport,
    downloadReport,
    fetchReportsByProject,
  };
};
