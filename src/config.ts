/**
 * Application configuration
 */

// Environment types
type Environment = 'development' | 'staging' | 'production';

// API endpoints configuration
interface ApiConfig {
  baseUrl: string;
  chatbotUrl: string;
}

// Configuration by environment
const configs: Record<Environment, ApiConfig> = {
  development: {
    baseUrl: 'http://localhost:8001/api/v1',
    chatbotUrl: 'http://localhost:8001/api/v1/chatbot/chat',
  },
  staging: {
    baseUrl: 'https://bitebase-chatbot.your-subdomain.workers.dev/api/v1',
    chatbotUrl: 'https://bitebase-chatbot.your-subdomain.workers.dev/api/v1/chatbot/chat',
  },
  production: {
    baseUrl: 'https://api.bitebase.app/api/v1',
    chatbotUrl: 'https://api.bitebase.app/api/v1/chatbot/chat',
  },
};

// Get current environment from environment variables or default to development
const currentEnv = (import.meta.env.VITE_APP_ENV as Environment) || 'development';

// Export the configuration for the current environment
export const config = configs[currentEnv];

// Export other configuration values
export const appConfig = {
  appName: 'BiteBase Intelligence',
  version: '1.0.0',
  environment: currentEnv,
};
