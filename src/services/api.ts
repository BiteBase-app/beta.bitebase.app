import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { config } from '@/config';

// API base URL
const API_URL = import.meta.env.VITE_API_URL || config.baseUrl;

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API service class
class ApiService {
  // Auth endpoints
  async login(email: string, password: string): Promise<AxiosResponse> {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    return apiClient.post('/auth/login/access-token', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  async register(email: string, password: string, fullName: string): Promise<AxiosResponse> {
    return apiClient.post('/auth/register', {
      email,
      password,
      full_name: fullName,
    });
  }

  async getCurrentUser(): Promise<AxiosResponse> {
    return apiClient.get('/users/me');
  }

  // Restaurant profile endpoints
  async getRestaurantProfiles(useMockData: boolean = false): Promise<AxiosResponse> {
    return apiClient.get('/restaurant-profiles/', {
      headers: useMockData ? { 'X-Mock-Data': 'true' } : undefined
    });
  }

  async getRestaurantProfile(id: string, useMockData: boolean = false): Promise<AxiosResponse> {
    return apiClient.get(`/restaurant-profiles/${id}`, {
      headers: useMockData ? { 'X-Mock-Data': 'true' } : undefined
    });
  }

  async createRestaurantProfile(data: any, useMockData: boolean = false): Promise<AxiosResponse> {
    return apiClient.post('/restaurant-profiles/', data, {
      headers: useMockData ? { 'X-Mock-Data': 'true' } : undefined
    });
  }

  async updateRestaurantProfile(id: string, data: any, useMockData: boolean = false): Promise<AxiosResponse> {
    return apiClient.put(`/restaurant-profiles/${id}`, data, {
      headers: useMockData ? { 'X-Mock-Data': 'true' } : undefined
    });
  }

  async deleteRestaurantProfile(id: string, useMockData: boolean = false): Promise<AxiosResponse> {
    return apiClient.delete(`/restaurant-profiles/${id}`, {
      headers: useMockData ? { 'X-Mock-Data': 'true' } : undefined
    });
  }

  // Research project endpoints
  async getResearchProjects(useMockData: boolean = false): Promise<AxiosResponse> {
    return apiClient.get('/research-projects/', {
      headers: useMockData ? { 'X-Mock-Data': 'true' } : undefined
    });
  }

  async getResearchProject(id: string, useMockData: boolean = false): Promise<AxiosResponse> {
    return apiClient.get(`/research-projects/${id}`, {
      headers: useMockData ? { 'X-Mock-Data': 'true' } : undefined
    });
  }

  async createResearchProject(data: any, useMockData: boolean = false): Promise<AxiosResponse> {
    return apiClient.post('/research-projects/', data, {
      headers: useMockData ? { 'X-Mock-Data': 'true' } : undefined
    });
  }

  async updateResearchProject(id: string, data: any, useMockData: boolean = false): Promise<AxiosResponse> {
    return apiClient.put(`/research-projects/${id}`, data, {
      headers: useMockData ? { 'X-Mock-Data': 'true' } : undefined
    });
  }

  async analyzeResearchProject(id: string, useMockData: boolean = false): Promise<AxiosResponse> {
    return apiClient.post(`/research-projects/${id}/analyze`, {}, {
      headers: useMockData ? { 'X-Mock-Data': 'true' } : undefined
    });
  }

  // Location endpoints
  async analyzeLocation(latitude: number, longitude: number, radius: number): Promise<AxiosResponse> {
    return apiClient.get('/location/analyze', {
      params: { latitude, longitude, radius },
    });
  }

  async getCompetitors(latitude: number, longitude: number, radius: number, cuisineType?: string): Promise<AxiosResponse> {
    return apiClient.get('/location/competitors', {
      params: { latitude, longitude, radius, cuisine_type: cuisineType },
    });
  }

  async getDemographics(latitude: number, longitude: number, radius: number): Promise<AxiosResponse> {
    return apiClient.get('/location/demographics', {
      params: { latitude, longitude, radius },
    });
  }

  // Analytics endpoints
  async getMarketTrends(cuisineType?: string, location?: string): Promise<AxiosResponse> {
    return apiClient.get('/analytics/market-trends', {
      params: { cuisine_type: cuisineType, location },
    });
  }

  async getCompetitorAnalysis(restaurantProfileId: string): Promise<AxiosResponse> {
    return apiClient.get(`/analytics/competitor-analysis/${restaurantProfileId}`);
  }

  async getPerformanceForecast(restaurantProfileId: string, months: number = 12): Promise<AxiosResponse> {
    return apiClient.get(`/analytics/performance-forecast/${restaurantProfileId}`, {
      params: { months },
    });
  }

  async getCustomerDemographics(restaurantProfileId: string): Promise<AxiosResponse> {
    return apiClient.get(`/analytics/customer-demographics/${restaurantProfileId}`);
  }

  // Chatbot endpoints
  async sendChatMessage(messages: Array<{role: string, content: string}>, restaurantProfileId?: string, useMockUser: boolean = true): Promise<AxiosResponse> {
    return apiClient.post('/chatbot/chat', {
      messages,
      restaurant_profile_id: restaurantProfileId
    }, {
      headers: useMockUser ? { 'X-Mock-User': 'true' } : undefined
    });
  }

  async streamChatMessage(messages: Array<{role: string, content: string}>, restaurantProfileId?: string, useMockUser: boolean = true): Promise<AxiosResponse> {
    return apiClient.post('/chatbot/chat/stream', {
      messages,
      restaurant_profile_id: restaurantProfileId
    }, {
      responseType: 'stream',
      headers: useMockUser ? { 'X-Mock-User': 'true' } : undefined
    });
  }

  // Reports endpoints
  async getReports(useMockData: boolean = false): Promise<AxiosResponse> {
    return apiClient.get('/reports/', {
      headers: useMockData ? { 'X-Mock-Data': 'true' } : undefined
    });
  }

  async getReport(id: string, useMockData: boolean = false): Promise<AxiosResponse> {
    return apiClient.get(`/reports/${id}`, {
      headers: useMockData ? { 'X-Mock-Data': 'true' } : undefined
    });
  }

  async createReport(data: any, useMockData: boolean = false): Promise<AxiosResponse> {
    return apiClient.post('/reports/', data, {
      headers: useMockData ? { 'X-Mock-Data': 'true' } : undefined
    });
  }

  async downloadReport(id: string, useMockData: boolean = false): Promise<AxiosResponse> {
    return apiClient.get(`/reports/${id}/download`, {
      responseType: 'blob',
      headers: useMockData ? { 'X-Mock-Data': 'true' } : undefined
    });
  }

  async getReportsByProject(researchProjectId: string, useMockData: boolean = false): Promise<AxiosResponse> {
    return apiClient.get(`/reports/by-project/${researchProjectId}`, {
      headers: useMockData ? { 'X-Mock-Data': 'true' } : undefined
    });
  }

  // Integrations endpoints
  async getIntegrations(): Promise<AxiosResponse> {
    return apiClient.get('/integrations/');
  }

  async createIntegration(data: any): Promise<AxiosResponse> {
    return apiClient.post('/integrations/', data);
  }

  async connectIntegration(id: string): Promise<AxiosResponse> {
    return apiClient.post(`/integrations/${id}/connect`);
  }

  async syncIntegration(id: string): Promise<AxiosResponse> {
    return apiClient.post(`/integrations/${id}/sync`);
  }
}

const apiService = new ApiService();
export { apiClient };
export default apiService;
