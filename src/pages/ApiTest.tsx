import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CheckCircle } from "lucide-react";
import apiService from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { useRestaurantProfiles } from '../hooks/useRestaurantProfiles';
import { useResearchProjects } from '../hooks/useResearchProjects';
import { useLocation } from '../hooks/useLocation';
import { useAnalytics } from '../hooks/useAnalytics';
import { useReports } from '../hooks/useReports';

const ApiTest: React.FC = () => {
  const [activeTab, setActiveTab] = useState('auth');
  const [testResults, setTestResults] = useState<Record<string, { success: boolean; message: string; data?: any }>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const auth = useAuth();
  const { profiles, createProfile } = useRestaurantProfiles();
  const { projects, createProject } = useResearchProjects();
  const locationService = useLocation();
  const analyticsService = useAnalytics();
  const reportsService = useReports();

  // Test authentication
  const testLogin = async () => {
    setLoading({ ...loading, login: true });
    try {
      // Use production credentials from environment variables or fallback to test credentials
      const email = import.meta.env.VITE_TEST_USER_EMAIL || 'admin@example.com';
      const password = import.meta.env.VITE_TEST_USER_PASSWORD || 'admin123';

      console.log(`Attempting login with email: ${email}`);
      const success = await auth.login(email, password);

      setTestResults({
        ...testResults,
        login: {
          success,
          message: success ? 'Login successful' : 'Login failed',
          data: auth.user
        }
      });
    } catch (error: any) {
      console.error('Login error:', error);
      setTestResults({
        ...testResults,
        login: {
          success: false,
          message: `Login failed: ${error.message || 'Unknown error'}`
        }
      });
    } finally {
      setLoading({ ...loading, login: false });
    }
  };

  // Test restaurant profiles
  const testCreateRestaurantProfile = async () => {
    setLoading({ ...loading, createProfile: true });
    try {
      // Check if user is authenticated first
      if (!auth.isAuthenticated) {
        throw new Error('You must be logged in to create a restaurant profile. Please test login first.');
      }

      // Generate a unique name with timestamp to avoid duplicates
      const timestamp = new Date().toISOString().replace(/[^0-9]/g, '');

      const data = {
        restaurant_name: `Test Restaurant ${timestamp}`,
        concept_description: 'A test restaurant for API testing',
        cuisine_type: 'Thai',
        target_audience: 'Young professionals',
        price_range: '$$',
        business_type: 'new',
        is_local_brand: true,
        street_address: '123 Test Street',
        city: 'Bangkok',
        state: '',
        zip_code: '10110',
        district: 'Test District',
      };

      console.log('Creating restaurant profile with data:', data);
      const profile = await createProfile(data);

      if (!profile) {
        throw new Error('Failed to create restaurant profile - API returned null or undefined');
      }

      setTestResults({
        ...testResults,
        createProfile: {
          success: true,
          message: 'Restaurant profile created successfully',
          data: profile
        }
      });
    } catch (error: any) {
      console.error('Restaurant profile creation error:', error);
      setTestResults({
        ...testResults,
        createProfile: {
          success: false,
          message: `Failed to create restaurant profile: ${error.message || 'Unknown error'}`
        }
      });
    } finally {
      setLoading({ ...loading, createProfile: false });
    }
  };

  // Test research projects
  const testCreateResearchProject = async () => {
    setLoading({ ...loading, createProject: true });
    try {
      // Check if user is authenticated first
      if (!auth.isAuthenticated) {
        throw new Error('You must be logged in to create a research project. Please test login first.');
      }

      // Check if profiles are available
      if (!profiles || profiles.length === 0) {
        throw new Error('No restaurant profiles available. Please create a profile first.');
      }

      // Generate a unique name with timestamp to avoid duplicates
      const timestamp = new Date().toISOString().replace(/[^0-9]/g, '');

      const data = {
        name: `Test Research Project ${timestamp}`,
        description: 'A test research project for API testing',
        restaurant_profile_id: profiles[0].id,
        competitive_analysis: true,
        market_sizing: true,
        demographic_analysis: true,
        location_intelligence: true,
      };

      console.log('Creating research project with data:', data);
      const project = await createProject(data);

      if (!project) {
        throw new Error('Failed to create research project - API returned null or undefined');
      }

      setTestResults({
        ...testResults,
        createProject: {
          success: true,
          message: 'Research project created successfully',
          data: project
        }
      });
    } catch (error: any) {
      console.error('Research project creation error:', error);
      setTestResults({
        ...testResults,
        createProject: {
          success: false,
          message: `Failed to create research project: ${error.message || 'Unknown error'}`
        }
      });
    } finally {
      setLoading({ ...loading, createProject: false });
    }
  };

  // Test location analysis
  const testLocationAnalysis = async () => {
    setLoading({ ...loading, locationAnalysis: true });
    try {
      // Check if user is authenticated first
      if (!auth.isAuthenticated) {
        throw new Error('You must be logged in to analyze a location. Please test login first.');
      }

      // Bangkok coordinates (or use environment variables for different locations)
      const latitude = parseFloat(import.meta.env.VITE_TEST_LATITUDE) || 13.7563;
      const longitude = parseFloat(import.meta.env.VITE_TEST_LONGITUDE) || 100.5018;
      const radius = parseFloat(import.meta.env.VITE_TEST_RADIUS) || 1.0;

      console.log(`Analyzing location at coordinates: ${latitude}, ${longitude} with radius ${radius}km`);
      const locationData = await locationService.analyzeLocation(latitude, longitude, radius);

      if (!locationData) {
        throw new Error('Failed to analyze location - API returned null or undefined');
      }

      setTestResults({
        ...testResults,
        locationAnalysis: {
          success: true,
          message: 'Location analysis successful',
          data: locationData
        }
      });
    } catch (error: any) {
      console.error('Location analysis error:', error);
      setTestResults({
        ...testResults,
        locationAnalysis: {
          success: false,
          message: `Failed to analyze location: ${error.message || 'Unknown error'}`
        }
      });
    } finally {
      setLoading({ ...loading, locationAnalysis: false });
    }
  };

  // Test analytics
  const testMarketTrends = async () => {
    setLoading({ ...loading, marketTrends: true });
    try {
      // Check if user is authenticated first
      if (!auth.isAuthenticated) {
        throw new Error('You must be logged in to get market trends. Please test login first.');
      }

      // Use environment variables or default values
      const cuisineType = import.meta.env.VITE_TEST_CUISINE_TYPE || 'Thai';
      const location = import.meta.env.VITE_TEST_LOCATION || 'Bangkok';

      console.log(`Getting market trends for cuisine: ${cuisineType} in location: ${location}`);
      const trendsData = await analyticsService.getMarketTrends(cuisineType, location);

      if (!trendsData) {
        throw new Error('Failed to get market trends - API returned null or undefined');
      }

      setTestResults({
        ...testResults,
        marketTrends: {
          success: true,
          message: 'Market trends analysis successful',
          data: trendsData
        }
      });
    } catch (error: any) {
      console.error('Market trends error:', error);
      setTestResults({
        ...testResults,
        marketTrends: {
          success: false,
          message: `Failed to get market trends: ${error.message || 'Unknown error'}`
        }
      });
    } finally {
      setLoading({ ...loading, marketTrends: false });
    }
  };

  // Test reports
  const testCreateReport = async () => {
    setLoading({ ...loading, createReport: true });
    try {
      // Check if user is authenticated first
      if (!auth.isAuthenticated) {
        throw new Error('You must be logged in to create a report. Please test login first.');
      }

      // Check if projects are available
      if (!projects || projects.length === 0) {
        throw new Error('No research projects available. Please create a project first.');
      }

      // Generate a unique name with timestamp to avoid duplicates
      const timestamp = new Date().toISOString().replace(/[^0-9]/g, '');

      const data = {
        name: `Test Report ${timestamp}`,
        type: 'market_analysis',
        format: 'json',
        research_project_id: projects[0].id,
      };

      console.log('Creating report with data:', data);
      const report = await reportsService.createReport(data);

      if (!report) {
        throw new Error('Failed to create report - API returned null or undefined');
      }

      setTestResults({
        ...testResults,
        createReport: {
          success: true,
          message: 'Report created successfully',
          data: report
        }
      });
    } catch (error: any) {
      console.error('Report creation error:', error);
      setTestResults({
        ...testResults,
        createReport: {
          success: false,
          message: `Failed to create report: ${error.message || 'Unknown error'}`
        }
      });
    } finally {
      setLoading({ ...loading, createReport: false });
    }
  };

  // Test health check
  const testHealthCheck = async () => {
    setLoading({ ...loading, healthCheck: true });
    try {
      // Use the API_URL from the environment or default to localhost
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_URL}/health`);

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();

      setTestResults({
        ...testResults,
        healthCheck: {
          success: true,
          message: 'Health check successful',
          data
        }
      });
    } catch (error: any) {
      console.error('Health check error:', error);
      setTestResults({
        ...testResults,
        healthCheck: {
          success: false,
          message: `Health check failed: ${error.message || 'Unknown error'}`
        }
      });
    } finally {
      setLoading({ ...loading, healthCheck: false });
    }
  };

  // Render test result
  const renderTestResult = (key: string) => {
    const result = testResults[key];
    if (!result) return null;

    return (
      <Alert variant={result.success ? "default" : "destructive"} className="mt-4">
        <div className="flex items-center">
          {result.success ? (
            <CheckCircle className="h-4 w-4 mr-2" />
          ) : (
            <AlertCircle className="h-4 w-4 mr-2" />
          )}
          <AlertTitle>{result.success ? 'Success' : 'Error'}</AlertTitle>
        </div>
        <AlertDescription>{result.message}</AlertDescription>
        {result.data && (
          <div className="mt-2">
            <details>
              <summary className="cursor-pointer font-medium">Response Data</summary>
              <pre className="mt-2 bg-slate-100 p-2 rounded text-xs overflow-auto max-h-60">
                {JSON.stringify(result.data, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </Alert>
    );
  };

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-6">API Integration Test</h1>
      <p className="text-muted-foreground mb-8">
        This page tests the integration between the frontend and backend API.
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="auth">Authentication</TabsTrigger>
          <TabsTrigger value="profiles">Restaurant Profiles</TabsTrigger>
          <TabsTrigger value="projects">Research Projects</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="health">Health Check</TabsTrigger>
        </TabsList>

        <TabsContent value="auth">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Tests</CardTitle>
              <CardDescription>Test authentication API endpoints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Button
                    onClick={testLogin}
                    disabled={loading.login}
                  >
                    {loading.login ? 'Testing...' : 'Test Login'}
                  </Button>
                  {renderTestResult('login')}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profiles">
          <Card>
            <CardHeader>
              <CardTitle>Restaurant Profile Tests</CardTitle>
              <CardDescription>Test restaurant profile API endpoints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Button
                    onClick={testCreateRestaurantProfile}
                    disabled={loading.createProfile}
                  >
                    {loading.createProfile ? 'Testing...' : 'Test Create Restaurant Profile'}
                  </Button>
                  {renderTestResult('createProfile')}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Research Project Tests</CardTitle>
              <CardDescription>Test research project API endpoints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Button
                    onClick={testCreateResearchProject}
                    disabled={loading.createProject}
                  >
                    {loading.createProject ? 'Testing...' : 'Test Create Research Project'}
                  </Button>
                  {renderTestResult('createProject')}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="location">
          <Card>
            <CardHeader>
              <CardTitle>Location Tests</CardTitle>
              <CardDescription>Test location API endpoints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Button
                    onClick={testLocationAnalysis}
                    disabled={loading.locationAnalysis}
                  >
                    {loading.locationAnalysis ? 'Testing...' : 'Test Location Analysis'}
                  </Button>
                  {renderTestResult('locationAnalysis')}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Tests</CardTitle>
              <CardDescription>Test analytics API endpoints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Button
                    onClick={testMarketTrends}
                    disabled={loading.marketTrends}
                  >
                    {loading.marketTrends ? 'Testing...' : 'Test Market Trends'}
                  </Button>
                  {renderTestResult('marketTrends')}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reports Tests</CardTitle>
              <CardDescription>Test reports API endpoints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Button
                    onClick={testCreateReport}
                    disabled={loading.createReport}
                  >
                    {loading.createReport ? 'Testing...' : 'Test Create Report'}
                  </Button>
                  {renderTestResult('createReport')}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health">
          <Card>
            <CardHeader>
              <CardTitle>Health Check</CardTitle>
              <CardDescription>Test backend health check endpoint</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Button
                    onClick={testHealthCheck}
                    disabled={loading.healthCheck}
                  >
                    {loading.healthCheck ? 'Testing...' : 'Test Health Check'}
                  </Button>
                  {renderTestResult('healthCheck')}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiTest;
