/**
 * Utility functions for direct Cloudflare AI API calls
 */

// Cloudflare account and API details
const CLOUDFLARE_ACCOUNT_ID = 'dc95c232d76cc4df23a5ca452a4046ab';
const CLOUDFLARE_API_TOKEN = 'dIPwmSfU475UYmZaKivaQ-fhvt_jh6W8QaKxJ4d5';
const DEFAULT_MODEL = '@cf/meta/llama-3-8b-instruct';

// Message interface
export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/**
 * Call Cloudflare AI API directly
 * @param messages Array of messages
 * @param model Model to use
 * @returns AI response text
 */
export async function callCloudflareAI(
  messages: Message[],
  model: string = DEFAULT_MODEL
): Promise<string> {
  try {
    console.log(`Calling Cloudflare AI API with model: ${model}`);
    
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/${model}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
        },
        body: JSON.stringify({ messages }),
      }
    );
    
    const data = await response.json();
    console.log('Cloudflare AI API response:', data);
    
    if (data.success && data.result?.response) {
      return data.result.response;
    } else {
      throw new Error(`Cloudflare AI API Error: ${JSON.stringify(data)}`);
    }
  } catch (error) {
    console.error('Error calling Cloudflare AI API:', error);
    throw error;
  }
}

/**
 * Create a chat completion with restaurant context
 * @param messages Chat messages
 * @param restaurantProfileId Restaurant profile ID
 * @returns AI response text
 */
export async function createChatCompletionWithContext(
  messages: Message[],
  restaurantProfileId?: string
): Promise<string> {
  try {
    // Prepare system prompt
    const systemPrompt = `You are BiteBase AI, an intelligent assistant for restaurant owners and managers.
You help with market research, location analysis, competitive analysis, and business strategy.
You have access to restaurant data, market trends, and location intelligence.
Be concise, professional, and helpful. If you don't know something, say so and suggest how the user might find that information.`;
    
    // Prepare messages array
    const apiMessages: Message[] = [
      { role: 'system', content: systemPrompt }
    ];
    
    // Add restaurant context if available
    if (restaurantProfileId) {
      const restaurantContext = `The user is asking about restaurant with ID ${restaurantProfileId}.`;
      apiMessages.push({ role: 'system', content: restaurantContext });
    }
    
    // Add conversation messages
    apiMessages.push(...messages);
    
    // Call Cloudflare AI API
    return await callCloudflareAI(apiMessages);
  } catch (error) {
    console.error('Error creating chat completion with context:', error);
    throw error;
  }
}

export default {
  callCloudflareAI,
  createChatCompletionWithContext,
};
