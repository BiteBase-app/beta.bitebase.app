# Cloudflare AI Proxy Setup

This document explains how to set up and deploy the Cloudflare AI Proxy, which resolves CORS issues when accessing the Cloudflare AI API from your frontend application.

## What is the AI Proxy?

The AI Proxy is a Cloudflare Worker that acts as an intermediary between your frontend application and the Cloudflare AI API. It:

1. Handles CORS headers to allow requests from your application domain
2. Forwards requests to the Cloudflare AI API with the proper authentication
3. Returns the API responses to your frontend application

## Why is this needed?

Direct browser requests to the Cloudflare AI API are blocked by CORS policies because the API doesn't include the necessary CORS headers to allow cross-origin requests from your application domain. The proxy solves this by adding these headers and handling the authentication securely.

## Deployment Steps

### 1. Deploy the AI Proxy Worker

```bash
# Deploy using the provided script
npm run deploy:ai-proxy
```

This will deploy the AI proxy worker to Cloudflare, making it available at:
`https://bitebase-ai-proxy.bitebase.workers.dev/api/v1/ai/proxy`

### 2. Update Environment Variables

The frontend application needs to know the URL of the AI proxy. This is configured in the `.env.production` file, which is created by the `cloudflare-pages-setup.cjs` script during the build process.

The environment variable is:
```
VITE_API_URL=https://bitebase-ai-proxy.bitebase.workers.dev/api/v1
```

### 3. Deploy the Frontend Application

After deploying the AI proxy, deploy your frontend application:

```bash
npm run deploy:pages
```

## How It Works

1. Your frontend application makes requests to the AI proxy URL
2. The proxy adds CORS headers to allow requests from your application domain
3. The proxy forwards the request to the Cloudflare AI API with the proper authentication
4. The proxy receives the response from the Cloudflare AI API
5. The proxy adds CORS headers to the response and returns it to your application

## Troubleshooting

### CORS Errors Still Occurring

If you're still seeing CORS errors:

1. Check that the frontend is using the correct proxy URL
2. Verify that the AI proxy worker is deployed correctly
3. Check the Cloudflare Workers logs for any errors

### API Authentication Issues

If the AI API is returning authentication errors:

1. Check that the API token in the AI proxy worker is correct
2. Verify that the token has the necessary permissions

### Worker Deployment Issues

If you're having trouble deploying the worker:

1. Make sure you're logged in to Cloudflare: `wrangler login`
2. Check for any errors in the wrangler.toml configuration
3. Try deploying with verbose logging: `wrangler deploy --verbose`
