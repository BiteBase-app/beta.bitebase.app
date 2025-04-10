# BiteBase Chatbot Cloudflare Worker

This directory contains the Cloudflare Worker code for the BiteBase AI chatbot. The worker uses Cloudflare AI to power the chatbot functionality.

## Prerequisites

- Cloudflare account
- Wrangler CLI installed (`npm install -g wrangler`)
- Cloudflare Workers AI enabled in your account

## Deployment Steps

1. Log in to your Cloudflare account using Wrangler:
   ```
   wrangler login
   ```

2. Deploy the worker:
   ```
   wrangler deploy
   ```

3. Test the deployment:
   ```
   curl -X POST https://bitebase-chatbot.your-subdomain.workers.dev/api/v1/chatbot/chat \
     -H "Content-Type: application/json" \
     -d '{"messages": [{"role": "user", "content": "Hello"}]}'
   ```

## Custom Domain Setup

To use a custom domain (like api.bitebase.ai):

1. Add your domain to Cloudflare (if not already added)
2. Create a DNS record:
   - Type: CNAME
   - Name: api
   - Target: bitebase-chatbot.your-subdomain.workers.dev
   - Proxy status: Proxied

3. Update the routes in wrangler.toml with your domain

## Environment Variables

You can add environment variables in the Cloudflare dashboard or in the wrangler.toml file:

```toml
[vars]
ENVIRONMENT = "production"
```

## Updating the Worker

To update the worker after making changes:

```
wrangler deploy
```

## Monitoring and Logs

You can view logs and monitor your worker in the Cloudflare dashboard:

1. Go to Workers & Pages in your Cloudflare dashboard
2. Select your worker (bitebase-chatbot)
3. Click on "Logs" to view recent logs
