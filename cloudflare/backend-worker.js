/**
 * BiteBase Backend Worker
 * 
 * This worker serves as the backend API for the BiteBase application.
 * It provides endpoints for interacting with the Cloudflare AI API.
 */

// Cloudflare AI API details
const CLOUDFLARE_ACCOUNT_ID = 'dc95c232d76cc4df23a5ca452a4046ab';
const CLOUDFLARE_API_TOKEN = 'dIPwmSfU475UYmZaKivaQ-fhvt_jh6W8QaKxJ4d5';
const DEFAULT_MODEL = '@cf/meta/llama-3-8b-instruct';

// CORS headers to allow requests from any origin
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

// Handle OPTIONS requests for CORS preflight
function handleOptions(request) {
  return new Response(null, {
    headers: corsHeaders,
    status: 204,
  });
}

// Health check endpoint
async function handleHealthCheck() {
  return new Response(JSON.stringify({ status: 'ok' }), {
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
    status: 200,
  });
}

// Test endpoint (equivalent to the Python test_endpoint)
async function handleTestEndpoint() {
  try {
    // Call Cloudflare AI API
    const cloudflareUrl = `https://gateway.ai.cloudflare.com/v1/${CLOUDFLARE_ACCOUNT_ID}/bitebase-ai-agents/ai/run/${DEFAULT_MODEL}`;
    
    const payload = {
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Hello, how are you?' }
      ]
    };
    
    const response = await fetch(cloudflareUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`
      },
      body: JSON.stringify(payload)
    });
    
    if (response.status === 200) {
      const responseData = await response.json();
      return new Response(JSON.stringify(responseData), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200,
      });
    } else {
      const errorText = await response.text();
      return new Response(
        JSON.stringify({ 
          error: `Cloudflare API returned status code ${response.status}: ${errorText}` 
        }), {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
          status: 500,
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 500,
      }
    );
  }
}

// Chat endpoint
async function handleChatEndpoint(request) {
  try {
    // Parse the request body
    const data = await request.json();
    const messages = data.messages || [];
    
    // Call Cloudflare AI API
    const cloudflareUrl = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/${DEFAULT_MODEL}`;
    
    const response = await fetch(cloudflareUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`
      },
      body: JSON.stringify({
        messages: messages
      })
    });
    
    if (response.status === 200) {
      const responseData = await response.json();
      return new Response(JSON.stringify(responseData), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200,
      });
    } else {
      const errorText = await response.text();
      return new Response(
        JSON.stringify({ 
          error: `Cloudflare AI API returned status code ${response.status}: ${errorText}` 
        }), {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
          status: 500,
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 500,
      }
    );
  }
}

// Main request handler
async function handleRequest(request) {
  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return handleOptions(request);
  }
  
  const url = new URL(request.url);
  const path = url.pathname;
  
  // Route requests to the appropriate handler
  if (path === '/api/v1/health' && request.method === 'GET') {
    return handleHealthCheck();
  } else if (path === '/api/v1/test' && request.method === 'GET') {
    return handleTestEndpoint();
  } else if (path === '/api/v1/cloudflare-ai/chat' && request.method === 'POST') {
    return handleChatEndpoint(request);
  } else {
    return new Response(JSON.stringify({ error: 'Not found' }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      status: 404,
    });
  }
}

// Register the event listener
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});
