# Chatbot CORS Issue Fix

This document explains the changes made to fix the CORS (Cross-Origin Resource Sharing) issues with the chatbot functionality.

## Problem

The chatbot was encountering a 405 (Method Not Allowed) error and CORS policy violations when trying to access the Cloudflare AI API directly from the frontend:

```
Failed to load resource: the server responded with a status of 405 ()
Error sending message: Bn
Error details: Request failed with status code 405

Access to XMLHttpRequest at 'https://api.cloudflare.com/client/v4/accounts/dc95c232d76cc4df23a5ca452a4046ab/ai/run/@cf/meta/llama-3-8b-instruct' from origin 'https://0f7e5a34.beta-bitebase-app.pages.dev' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## Solution

We implemented a backend proxy using Cloudflare Workers to handle the API calls to the Cloudflare AI API. This proxy:

1. Adds the necessary CORS headers to allow requests from any origin
2. Forwards the requests to the Cloudflare AI API with the proper authentication
3. Returns the responses to the frontend with the appropriate CORS headers

## Changes Made

1. **Created a backend worker**:
   - `cloudflare/backend-worker.js` - A Cloudflare Worker that acts as a proxy for the Cloudflare AI API
   - `cloudflare/backend-wrangler.toml` - Configuration for the backend worker

2. **Updated frontend services**:
   - Modified `src/services/cloudflareAIService.ts` to use the backend proxy instead of calling the Cloudflare AI API directly
   - Updated `src/utils/cloudflareAI.ts` to use the backend proxy for direct API calls

3. **Updated environment variables**:
   - Modified `cloudflare-pages-setup.cjs` to point to the new backend worker

## Testing the Chatbot

To test the chatbot functionality:

1. Visit the deployed application at [https://main.bitebase-app.pages.dev](https://main.bitebase-app.pages.dev)
2. Navigate to the chatbot page or use the chatbot widget
3. Send a message to the chatbot
4. Verify that the chatbot responds without any CORS errors

## Troubleshooting

If you still encounter issues with the chatbot:

1. **Check the browser console for errors**:
   - Open the browser developer tools (F12 or right-click > Inspect)
   - Go to the Console tab
   - Look for any error messages related to CORS or API calls

2. **Verify the backend worker is deployed**:
   - The backend worker should be available at `https://bitebase-backend.bitebase.workers.dev/api/v1/`
   - You can test it with a simple health check: `https://bitebase-backend.bitebase.workers.dev/api/v1/health`

3. **Check the API endpoints**:
   - The frontend should be calling `/api/v1/cloudflare-ai/chat` or `/api/v1/ai/proxy`
   - These endpoints should be handled by the backend worker

## Future Improvements

1. **Add more robust error handling**:
   - Implement better error messages for the user
   - Add retry logic for failed API calls

2. **Implement caching**:
   - Cache common responses to reduce API calls
   - Use Cloudflare's KV storage for persistent caching

3. **Add monitoring and logging**:
   - Set up monitoring for the backend worker
   - Implement detailed logging for debugging
