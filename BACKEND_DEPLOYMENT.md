# Deploying the BiteBase Backend to Cloudflare Workers

This guide explains how to deploy the BiteBase backend API to Cloudflare Workers using Git integration.

## Overview

The BiteBase backend is implemented as a Cloudflare Worker that provides API endpoints for:
- Health checks
- Cloudflare AI chat integration
- Test endpoints

The backend is written in JavaScript and deployed to Cloudflare Workers, which provides:
- Global distribution with low latency
- Automatic scaling
- No server management
- Integration with Cloudflare's security features

## Deployment Methods

There are three ways to deploy the backend:

1. **GitHub Actions (Recommended)**: Automatic deployment when changes are pushed to the main branch
2. **Manual Deployment via CLI**: Using the Wrangler CLI to deploy from your local machine
3. **Cloudflare Dashboard**: Direct deployment through the Cloudflare dashboard

## Method 1: GitHub Actions (Recommended)

### Prerequisites

- GitHub repository connected to Cloudflare
- Cloudflare API token stored as a GitHub secret

### Setup

1. The GitHub Actions workflow is already set up in `.github/workflows/deploy-backend.yml`
2. Add your Cloudflare API token as a GitHub secret:
   - Go to your GitHub repository
   - Navigate to Settings > Secrets and variables > Actions
   - Click "New repository secret"
   - Name: `CLOUDFLARE_API_TOKEN`
   - Value: Your Cloudflare API token with Workers permissions

### Deployment

Simply push changes to the main branch, and the workflow will automatically deploy the backend worker if any of these files change:
- `cloudflare/backend-worker.js`
- `cloudflare/backend-wrangler.toml`
- `.github/workflows/deploy-backend.yml`

## Method 2: Manual Deployment via CLI

### Prerequisites

- Wrangler CLI installed: `npm install -g wrangler`
- Logged in to Cloudflare: `wrangler login`

### Deployment

Run the deployment script:

```bash
# Make the script executable
chmod +x deploy-backend.sh

# Run the script
./deploy-backend.sh
```

Alternatively, use the npm script:

```bash
npm run deploy:backend
```

## Method 3: Cloudflare Dashboard

### Prerequisites

- Cloudflare account
- Access to the Workers section in the Cloudflare dashboard

### Deployment

1. Log in to your Cloudflare dashboard
2. Navigate to "Workers & Pages"
3. Click "Create application"
4. Select "Worker"
5. Copy the contents of `cloudflare/backend-worker.js` into the editor
6. Click "Deploy"
7. Configure routes to point to your worker:
   - Go to your worker's settings
   - Add a route: `api.bitebase.app/api/v1/*`

## API Endpoints

The backend worker provides the following endpoints:

- `GET /api/v1/health`: Health check endpoint
- `GET /api/v1/test`: Test endpoint that calls the Cloudflare AI API
- `POST /api/v1/cloudflare-ai/chat`: Chat endpoint for interacting with the Cloudflare AI API

## Environment Variables

The backend worker uses the following environment variables:

- `ENVIRONMENT`: The environment (production, development)

These are configured in the `backend-wrangler.toml` file.

## Monitoring and Logs

You can monitor your worker and view logs in the Cloudflare dashboard:

1. Go to Workers & Pages in your Cloudflare dashboard
2. Select your worker (bitebase-backend)
3. Click on "Logs" to view recent logs

## Troubleshooting

### Deployment Failures

If deployment fails:

1. Check that your Cloudflare API token has the correct permissions
2. Verify that the wrangler.toml configuration is correct
3. Check for any JavaScript errors in the worker code

### API Errors

If the API returns errors:

1. Check the Cloudflare Workers logs for error messages
2. Verify that the Cloudflare AI API token is correct
3. Test the endpoints using curl or Postman

## Updating the Backend

To update the backend:

1. Modify the `cloudflare/backend-worker.js` file
2. Deploy using one of the methods above

Changes will take effect immediately after deployment.
