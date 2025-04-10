/**
 * Cloudflare AI Gateway Service
 * This service provides direct integration with the Cloudflare AI Gateway
 */

import axios from 'axios';

// Cloudflare AI API URL - Using our proxy to avoid CORS issues
const CLOUDFLARE_API_URL = import.meta.env.VITE_API_URL ?
  `${import.meta.env.VITE_API_URL}/ai/proxy` :
  'https://bitebase-ai-proxy.bitebase.workers.dev/api/v1/ai/proxy';

// Cloudflare AI model
const DEFAULT_MODEL = '@cf/meta/llama-3-8b-instruct';

// No need for API token in frontend as the proxy will handle authentication

// Message interface
export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Chat completion request interface
export interface ChatCompletionRequest {
  messages: Message[];
  model?: string;
  max_tokens?: number;
  temperature?: number;
  stream?: boolean;
}

// Chat completion response interface
export interface ChatCompletionResponse {
  result: {
    content: string;
    role: string;
  };
  metadata: {
    model: string;
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
  };
}

// AI search request interface
export interface AISearchRequest {
  query: string;
  topK?: number;
}

// AI search response interface
export interface AISearchResponse {
  results: Array<{
    text: string;
    score: number;
    metadata: Record<string, any>;
  }>;
}

/**
 * Chat completion function using Cloudflare AI API
 * @param request Chat completion request
 * @returns Chat completion response
 */
export async function chatCompletion(request: ChatCompletionRequest): Promise<ChatCompletionResponse> {
  try {
    const model = request.model || DEFAULT_MODEL;

    const response = await axios.post(
      CLOUDFLARE_API_URL,
      {
        model: model,
        messages: request.messages,
        max_tokens: request.max_tokens || 500,
        temperature: request.temperature || 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Transform the response to match our expected format
    return {
      result: {
        content: response.data.result?.response || '',
        role: 'assistant'
      },
      metadata: {
        model: model,
        usage: response.data.result?.usage || {
          prompt_tokens: 0,
          completion_tokens: 0,
          total_tokens: 0
        }
      }
    };
  } catch (error) {
    console.error('Error calling Cloudflare AI API:', error);

    // Check if it's an Axios error with a response
    if (axios.isAxiosError(error) && error.response) {
      console.error('API Error Response:', error.response.data);
      throw new Error(`Cloudflare AI API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    }

    throw error;
  }
}



/**
 * AI search function
 * @param request AI search request
 * @returns AI search response
 */
export async function aiSearch(request: AISearchRequest): Promise<AISearchResponse> {
  try {
    // For AI search, we'll use a simple query to the Llama model
    const response = await chatCompletion({
      messages: [
        {
          role: 'system',
          content: 'You are a search assistant that helps find relevant information. Provide concise results.'
        },
        {
          role: 'user',
          content: request.query
        }
      ]
    });

    // Format the response as search results
    return {
      results: [
        {
          text: response.result.content,
          score: 1.0,
          metadata: {}
        }
      ]
    };
  } catch (error) {
    console.error('Error performing AI search:', error);
    throw error;
  }
}

/**
 * Create a chat completion with restaurant context
 * @param messages Chat messages
 * @param restaurantProfileId Restaurant profile ID
 * @returns Chat completion response
 */
export async function createChatCompletionWithContext(
  messages: Message[],
  restaurantProfileId?: string
): Promise<string> {
  try {
    // Prepare messages with system prompt
    const systemPrompt = `You are BiteBase AI, an intelligent assistant for restaurant owners and managers.
You help with market research, location analysis, competitive analysis, and business strategy.
You have access to restaurant data, market trends, and location intelligence.
Be concise, professional, and helpful. If you don't know something, say so and suggest how the user might find that information.`;

    const aiMessages: Message[] = [
      { role: 'system', content: systemPrompt },
    ];

    // Add restaurant context if available
    if (restaurantProfileId) {
      const restaurantContext = `The user is asking about restaurant with ID ${restaurantProfileId}.`;
      aiMessages.push({ role: 'system', content: restaurantContext });
    }

    // Add user messages
    aiMessages.push(...messages);

    // Call Cloudflare AI Gateway
    const response = await chatCompletion({
      messages: aiMessages,
    });

    return response.result.content;
  } catch (error) {
    console.error('Error creating chat completion with context:', error);
    return "I'm sorry, I'm having trouble connecting to my services. Please try again later.";
  }
}

export default {
  chatCompletion,
  aiSearch,
  createChatCompletionWithContext,
};
