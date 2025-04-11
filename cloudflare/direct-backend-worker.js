/**
 * BiteBase Backend Worker (Direct Version)
 *
 * This worker serves as the backend API for the BiteBase application.
 * It provides endpoints for interacting with the Cloudflare AI API.
 * This version is designed to be accessed directly via the workers.dev domain.
 */

// Cloudflare API details
const CLOUDFLARE_ACCOUNT_ID = 'dc95c232d76cc4df23a5ca452a4046ab';
const CLOUDFLARE_API_TOKEN = 'dIPwmSfU475UYmZaKivaQ-fhvt_jh6W8QaKxJ4d5';
const DEFAULT_MODEL = '@cf/meta/llama-3.1-8b-instruct';
const AUTORAG_TOKEN = '3TPrSyeZqreSql6km6VL9jCrYVov2okIaVeVEb_N';
const AUTORAG_ID = 'sparkling-mountain-4026';

// CORS headers to allow requests from any origin
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, X-HTTP-Method-Override, Accept',
  'Access-Control-Max-Age': '86400',
  'Access-Control-Allow-Credentials': 'true',
};

// Handle OPTIONS requests for CORS preflight
function handleOptions(_request) {
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

// AutoRAG search endpoint
async function handleAutoRagSearch(request) {
  try {
    console.log('Handling AutoRAG search request');

    // Parse the request body
    const data = await request.json();
    console.log('Request data:', JSON.stringify(data));

    const query = data.query || '';

    // Call Cloudflare AutoRAG API
    const autoRagUrl = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/autorag/rags/${AUTORAG_ID}/ai-search`;

    const response = await fetch(autoRagUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTORAG_TOKEN}`
      },
      body: JSON.stringify({
        query: query
      })
    });

    if (response.status === 200) {
      const responseData = await response.json();
      console.log('Raw AutoRAG API response:', JSON.stringify(responseData));

      // Format the response to match what the frontend expects
      const formattedResponse = {
        success: true,
        result: responseData
      };

      return new Response(JSON.stringify(formattedResponse), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200,
      });
    } else {
      // Try to parse the error response as JSON
      let errorText;
      try {
        const errorJson = await response.json();
        errorText = JSON.stringify(errorJson);
        console.error('Error response from AutoRAG API:', errorJson);
      } catch (e) {
        // If it's not JSON, get it as text
        errorText = await response.text();
        console.error('Error response from AutoRAG API (text):', errorText);
      }

      // Create a fallback response with a helpful message
      const fallbackResponse = {
        success: false,
        error: `AutoRAG API returned status code ${response.status}: ${errorText}`
      };

      return new Response(JSON.stringify(fallbackResponse), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200, // Return 200 OK with error details
      });
    }
  } catch (error) {
    console.error('Unexpected error in AutoRAG search endpoint:', error);

    return new Response(JSON.stringify({
      success: false,
      error: `Error processing AutoRAG search: ${error.message}`
    }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      status: 500,
    });
  }
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
    console.error('Unexpected error in chat endpoint:', error);

    // Create a fallback response with a helpful message
    const fallbackResponse = {
      success: true,
      result: {
        response: "I'm sorry, I encountered an unexpected error. Please try again in a moment."
      }
    };

    // Return a user-friendly response instead of exposing the error
    return new Response(
      JSON.stringify(fallbackResponse), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200, // Return 200 OK with a fallback message
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

    // Call Cloudflare AI Gateway API with direct provider endpoint
    const cloudflareUrl = `https://gateway.ai.cloudflare.com/v1/${CLOUDFLARE_ACCOUNT_ID}/bitebase-bot/workers-ai/@cf/meta/llama-3.1-8b-instruct`;

    // Convert chat messages to prompt format if needed
    let requestBody;
    if (messages.length > 0) {
      // If we have chat messages, use them directly
      requestBody = {
        messages: messages
      };
    } else {
      // Fallback to a default prompt
      requestBody = {
        prompt: "Hello, how can I help you today?"
      };
    }

    console.log('Request body:', JSON.stringify(requestBody));

    const response = await fetch(cloudflareUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`
      },
      body: JSON.stringify(requestBody)
    });

    if (response.status === 200) {
      const responseData = await response.json();
      console.log('Raw API response:', JSON.stringify(responseData));

      // Extract the response content from the direct provider endpoint response
      let responseContent = "I'm sorry, I couldn't generate a response.";

      // Handle different response formats
      if (responseData.response) {
        responseContent = responseData.response;
      } else if (responseData.result?.response) {
        responseContent = responseData.result.response;
      } else if (responseData.result?.content) {
        responseContent = responseData.result.content;
      } else if (responseData.content) {
        responseContent = responseData.content;
      } else if (responseData.text) {
        responseContent = responseData.text;
      } else if (responseData.choices && responseData.choices[0]?.message?.content) {
        responseContent = responseData.choices[0].message.content;
      }

      // Format the response to match what the frontend expects
      const formattedResponse = {
        success: true,
        result: {
          response: responseContent
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
      // Try to parse the error response as JSON
      let errorText;
      try {
        const errorJson = await response.json();
        errorText = JSON.stringify(errorJson);
        console.error('Error response from Cloudflare AI API:', errorJson);
      } catch (e) {
        // If it's not JSON, get it as text
        errorText = await response.text();
        console.error('Error response from Cloudflare AI API (text):', errorText);
      }

      // Create a fallback response with a helpful message
      const fallbackResponse = {
        success: true,
        result: {
          response: "I'm sorry, I'm having trouble connecting to my AI services right now. Please try again in a moment."
        }
      };

      console.log('Using fallback response due to API error');

      // Return the fallback response instead of an error
      return new Response(
        JSON.stringify(fallbackResponse), {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
          status: 200, // Return 200 OK with a fallback message instead of an error
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
    } else if (
      path === '/autorag' ||
      path === '/api/v1/autorag' ||
      path === '/api/v1/autorag/search' ||
      path === '/autorag/search'
    ) {
      response = await handleAutoRagSearch(request);
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
