/**
 * Cloudflare Worker for BiteBase AI Chatbot
 * This worker uses Cloudflare AI to power the chatbot functionality
 */

// System prompt for the chatbot
const SYSTEM_PROMPT = `You are BiteBase AI, an intelligent assistant for restaurant owners and managers.
You help with market research, location analysis, competitive analysis, and business strategy.
You have access to restaurant data, market trends, and location intelligence.
Be concise, professional, and helpful. If you don't know something, say so and suggest how the user might find that information.`;

// Configure CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    // Parse the URL to get the path
    const url = new URL(request.url);
    const path = url.pathname;

    // Handle chatbot endpoint
    if (path === '/api/v1/chatbot/chat' && request.method === 'POST') {
      try {
        // Parse the request body
        const data = await request.json();
        const messages = data.messages || [];
        const restaurantProfileId = data.restaurant_profile_id;

        // Prepare messages for AI
        const aiMessages = [
          { role: 'system', content: SYSTEM_PROMPT },
        ];

        // Add restaurant context if available
        if (restaurantProfileId) {
          const restaurantContext = `The user is asking about restaurant with ID ${restaurantProfileId}.`;
          aiMessages.push({ role: 'system', content: restaurantContext });
        }

        // Add user messages
        for (const msg of messages) {
          aiMessages.push({ role: msg.role, content: msg.content });
        }

        // Call Cloudflare AI Gateway
        const response = await fetch('https://gateway.ai.cloudflare.com/v1/dc95c232d76cc4df23a5ca452a4046ab/bitebase-ai-agents/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.AI_GATEWAY_TOKEN}`
          },
          body: JSON.stringify({
            messages: aiMessages,
            max_tokens: 500,
            model: 'claude-3-haiku-20240307'
          })
        }).then(res => res.json());

        // Return the response
        return new Response(
          JSON.stringify({
            response: response.result?.content || "I'm sorry, I couldn't generate a response.",
            sources: null,
          }),
          {
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          }
        );
      } catch (error) {
        // Handle errors
        return new Response(
          JSON.stringify({
            error: error.message,
          }),
          {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          }
        );
      }
    }

    // Handle restaurant profiles endpoint
    if (path === '/api/v1/restaurant-profiles/' && request.method === 'GET') {
      // Mock restaurant profiles
      const profiles = [
        {
          id: "mock-restaurant-1",
          restaurant_name: "Thai Delight",
          concept_description: "Authentic Thai cuisine in a modern setting",
          cuisine_type: "Thai",
          business_type: "existing",
          owner_id: "mock-user-id",
          created_at: "2023-01-01T00:00:00",
          is_local_brand: true,
          target_audience: "Young professionals",
          price_range: "$$",
          street_address: "123 Main St",
          city: "Bangkok",
          state: "",
          zip_code: "10110",
          district: "Sukhumvit"
        },
        {
          id: "mock-restaurant-2",
          restaurant_name: "Sushi Express",
          concept_description: "Fast and fresh Japanese cuisine",
          cuisine_type: "Japanese",
          business_type: "new",
          owner_id: "mock-user-id",
          created_at: "2023-02-01T00:00:00",
          is_local_brand: false,
          target_audience: "Business professionals",
          price_range: "$$$",
          street_address: "456 Market St",
          city: "Tokyo",
          state: "",
          zip_code: "100-0001",
          district: "Chiyoda"
        }
      ];

      return new Response(
        JSON.stringify(profiles),
        {
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

    // Handle 404 for all other routes
    return new Response('Not Found', {
      status: 404,
      headers: corsHeaders,
    });
  },
};
