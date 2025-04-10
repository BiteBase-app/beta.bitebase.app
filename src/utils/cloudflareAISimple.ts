/**
 * Simple Cloudflare AI utility
 * Direct integration with Cloudflare AI API
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
 * Simple function to call Cloudflare AI API directly
 */
export async function callCloudflareAI(messages: Message[]): Promise<string> {
  console.log('Calling Cloudflare AI with messages:', messages);
  
  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/${DEFAULT_MODEL}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
        },
        body: JSON.stringify({ messages }),
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error (${response.status}): ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Cloudflare AI response:', data);
    
    if (data.success && data.result?.response) {
      return data.result.response;
    } else {
      throw new Error(`API returned success=false or missing response: ${JSON.stringify(data)}`);
    }
  } catch (error) {
    console.error('Error calling Cloudflare AI:', error);
    throw error;
  }
}

export default {
  callCloudflareAI
};
