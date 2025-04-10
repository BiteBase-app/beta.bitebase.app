import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { config } from '@/config';
import cloudflareAI from '@/services/cloudflareAIService';
import cloudflareAIUtils from '@/utils/cloudflareAI';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
}

interface StandaloneChatbotProps {
  apiUrl?: string;
  initialMessage?: string;
  title?: string;
  primaryColor?: string;
  secondaryColor?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  width?: string;
  height?: string;
  restaurantProfileId?: string;
}

const defaultStyles = {
  container: {
    fontFamily: 'Inter, system-ui, sans-serif',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    borderRadius: '12px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: '16px',
    color: '#ffffff',
    fontWeight: 600,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer',
    fontSize: '16px',
  },
  messagesContainer: {
    padding: '16px',
    overflowY: 'auto' as const,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  message: {
    padding: '12px',
    borderRadius: '8px',
    maxWidth: '80%',
    wordBreak: 'break-word' as const,
  },
  userMessage: {
    alignSelf: 'flex-end' as const,
    color: '#ffffff',
  },
  assistantMessage: {
    alignSelf: 'flex-start' as const,
    backgroundColor: '#f5f5f5',
  },
  inputContainer: {
    padding: '16px',
    borderTop: '1px solid #e5e5e5',
    display: 'flex',
    gap: '8px',
  },
  input: {
    flexGrow: 1,
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #e5e5e5',
    outline: 'none',
  },
  sendButton: {
    padding: '12px 16px',
    borderRadius: '8px',
    border: 'none',
    color: '#ffffff',
    fontWeight: 600,
    cursor: 'pointer',
  },
  loadingDots: {
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#888',
    animation: 'pulse 1.5s infinite ease-in-out',
  },
  toggleButton: {
    position: 'fixed' as const,
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    border: 'none',
    color: '#ffffff',
    fontSize: '24px',
  },
};

export const StandaloneChatbot: React.FC<StandaloneChatbotProps> = ({
  apiUrl = config.chatbotUrl,
  initialMessage = "Hello! I'm your BiteBase AI Assistant. How can I help you with your restaurant analytics today?",
  title = "BiteBase AI Assistant",
  primaryColor = "#4f46e5",
  secondaryColor = "#818cf8",
  position = "bottom-right",
  width = "350px",
  height = "500px",
  restaurantProfileId,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: initialMessage, timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Position styles
  const getPositionStyles = () => {
    switch (position) {
      case 'bottom-right':
        return { bottom: '20px', right: '20px' };
      case 'bottom-left':
        return { bottom: '20px', left: '20px' };
      case 'top-right':
        return { top: '20px', right: '20px' };
      case 'top-left':
        return { top: '20px', left: '20px' };
      default:
        return { bottom: '20px', right: '20px' };
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let aiResponse = "";

      // First try using our Cloudflare AI service
      try {
        console.log('Using Cloudflare AI service...');
        aiResponse = await cloudflareAI.createChatCompletionWithContext(
          messages.concat(userMessage).map(m => ({ role: m.role, content: m.content })),
          restaurantProfileId
        );
      } catch (serviceError) {
        console.error('Error with Cloudflare AI service:', serviceError);

        // Try direct fetch as first fallback using utility function
        try {
          console.log('Falling back to direct fetch using utility function...');
          aiResponse = await cloudflareAIUtils.createChatCompletionWithContext(
            messages.concat(userMessage).map(m => ({ role: m.role, content: m.content })),
            restaurantProfileId
          );
        } catch (fetchError) {
          console.error('Error with direct fetch:', fetchError);

          // Fall back to API as last resort
          console.log('Falling back to API...');
          const response = await axios.post(apiUrl, {
            messages: messages.concat(userMessage).map(m => ({ role: m.role, content: m.content })),
            restaurant_profile_id: restaurantProfileId
          });
          aiResponse = response.data.response;
        }
      }

      // Add AI response to chat
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: aiResponse,
          timestamp: new Date()
        }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm sorry, I'm having trouble connecting to my services. Please try again later.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen ? (
        <div
          style={{
            ...defaultStyles.container,
            width,
            height,
            position: 'fixed',
            ...getPositionStyles(),
            zIndex: 1000,
          }}
        >
          <div
            style={{
              ...defaultStyles.header,
              backgroundColor: primaryColor,
            }}
          >
            <div>{title}</div>
            <button
              style={defaultStyles.closeButton}
              onClick={toggleChat}
            >
              ✕
            </button>
          </div>

          <div
            style={{
              ...defaultStyles.messagesContainer,
              height: `calc(${height} - 130px)`,
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  ...defaultStyles.message,
                  ...(message.role === 'user'
                    ? { ...defaultStyles.userMessage, backgroundColor: primaryColor }
                    : defaultStyles.assistantMessage),
                }}
              >
                {message.content}
              </div>
            ))}
            {isLoading && (
              <div style={defaultStyles.loadingDots}>
                <div style={{ ...defaultStyles.dot, animationDelay: '0s' }}></div>
                <div style={{ ...defaultStyles.dot, animationDelay: '0.2s' }}></div>
                <div style={{ ...defaultStyles.dot, animationDelay: '0.4s' }}></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={defaultStyles.inputContainer}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              style={defaultStyles.input}
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              style={{
                ...defaultStyles.sendButton,
                backgroundColor: primaryColor,
                opacity: !input.trim() || isLoading ? 0.7 : 1,
              }}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          style={{
            ...defaultStyles.toggleButton,
            backgroundColor: primaryColor,
            ...getPositionStyles(),
            zIndex: 1000,
          }}
        >
          💬
        </button>
      )}

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 1; }
          }
        `}
      </style>
    </>
  );
};

export default StandaloneChatbot;
