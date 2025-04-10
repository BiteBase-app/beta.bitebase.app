/**
 * BiteBase Backend Worker (Direct Version)
 *
 * This worker serves as the backend API for the BiteBase application.
 * It provides endpoints for interacting with the Cloudflare AI API.
 * This version is designed to be accessed directly via the workers.dev domain.
 */

// Cloudflare AI API details
const CLOUDFLARE_ACCOUNT_ID = 'dc95c232d76cc4df23a5ca452a4046ab';
const CLOUDFLARE_API_TOKEN = 'dIPwmSfU475UYmZaKivaQ-fhvt_jh6W8QaKxJ4d5';
const DEFAULT_MODEL = '@cf/meta/llama-3-8b-instruct';

// CORS headers to allow requests from any origin
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, X-HTTP-Method-Override, Accept',
  'Access-Control-Max-Age': '86400',
  'Access-Control-Allow-Credentials': 'true',
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

// Test endpoint
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

// Chat endpoint
async function handleChatEndpoint(request) {
  try {
    console.log('Handling chat endpoint request');

    // Parse the request body
    const data = await request.json();
    console.log('Request data:', JSON.stringify(data));

    const messages = data.messages || [];
    const model = data.model || DEFAULT_MODEL;

    // Call Cloudflare AI API
    const cloudflareUrl = `https://gateway.ai.cloudflare.com/v1/${CLOUDFLARE_ACCOUNT_ID}/bitebase-ai-agents/ai/run/${model}`;

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

      // Format the response to match what the frontend expects
      const formattedResponse = {
        success: true,
        result: {
          response: responseData.result?.response || responseData.result?.content || responseData.response || "I'm sorry, I couldn't generate a response."
        }
      };

      console.log('Formatted response:', formattedResponse);

      return new Response(JSON.stringify(formattedResponse), {
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
          success: false,
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
      JSON.stringify({
        success: false,
        error: error.message
      }), {
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
  // Get the request URL
  const url = new URL(request.url);
  const path = url.pathname;

  // Handle CORS preflight requests for all paths
  if (request.method === 'OPTIONS') {
    return handleOptions(request);
  }

  // Log the request for debugging
  console.log(`Handling ${request.method} request to ${path}`);

  try {
    // Route requests to the appropriate handler
    let response;

    if (path === '/health' || path === '/api/v1/health') {
      response = await handleHealthCheck();
    } else if (path === '/test' || path === '/api/v1/test') {
      response = await handleTestEndpoint();
    } else if (
      path === '/chat' ||
      path === '/api/v1/chat' ||
      path === '/api/v1/cloudflare-ai/chat' ||
      path === '/api/v1/ai/proxy' ||
      path === '/cloudflare-ai/chat' ||
      path === '/ai/proxy'
    ) {
      response = await handleChatEndpoint(request);
    } else {
      response = new Response(JSON.stringify({ error: 'Not found', path: path }), {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 404,
      });
    }

    // Clone the response and add CORS headers to ensure they're present
    const corsResponse = new Response(response.body, response);
    Object.keys(corsHeaders).forEach(key => {
      corsResponse.headers.set(key, corsHeaders[key]);
    });

    return corsResponse;
  } catch (error) {
    console.error(`Error handling request: ${error.message}`);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      status: 500,
    });
  }
}

// Register the event listener
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});
