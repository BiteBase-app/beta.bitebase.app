import React from 'react';
import ReactDOM from 'react-dom';
import { StandaloneChatbot } from '../components/StandaloneChatbot';

interface ChatbotConfig {
  apiUrl?: string;
  initialMessage?: string;
  title?: string;
  primaryColor?: string;
  secondaryColor?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  width?: string;
  height?: string;
  containerId?: string;
  restaurantProfileId?: string;
}

// Default configuration
const defaultConfig: ChatbotConfig = {
  apiUrl: 'https://api.bitebase.ai/api/v1/chatbot/chat',
  initialMessage: "Hello! I'm your BiteBase AI Assistant. How can I help you with your restaurant analytics today?",
  title: "BiteBase AI Assistant",
  primaryColor: "#4f46e5",
  secondaryColor: "#818cf8",
  position: "bottom-right",
  width: "350px",
  height: "500px",
  containerId: "bitebase-chatbot"
};

// Initialize the chatbot
const init = (config: ChatbotConfig = {}) => {
  const mergedConfig = { ...defaultConfig, ...config };
  const container = document.getElementById(mergedConfig.containerId || 'bitebase-chatbot');
  
  if (!container) {
    console.error(`Container with ID "${mergedConfig.containerId || 'bitebase-chatbot'}" not found.`);
    return;
  }
  
  ReactDOM.render(
    <StandaloneChatbot
      apiUrl={mergedConfig.apiUrl}
      initialMessage={mergedConfig.initialMessage}
      title={mergedConfig.title}
      primaryColor={mergedConfig.primaryColor}
      secondaryColor={mergedConfig.secondaryColor}
      position={mergedConfig.position}
      width={mergedConfig.width}
      height={mergedConfig.height}
      restaurantProfileId={mergedConfig.restaurantProfileId}
    />,
    container
  );
};

// Export the chatbot API
const BiteBaseChatbot = {
  init
};

// Make it available globally
(window as any).BiteBaseChatbot = BiteBaseChatbot;

export default BiteBaseChatbot;
