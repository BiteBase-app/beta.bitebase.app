#!/bin/bash

# Exit on error
set -e

# Check if Wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "Error: Wrangler CLI is not installed!"
    echo "Please install it with: npm install -g wrangler"
    exit 1
fi

# Login to Cloudflare (if not already logged in)
echo "Logging in to Cloudflare (if not already logged in)..."
wrangler whoami || wrangler login

# Deploy the Cloudflare Worker
echo "Deploying Cloudflare Worker..."
cd cloudflare
wrangler deploy

# Set secrets
echo "Setting up Cloudflare Worker secrets..."
echo "Please enter your Cloudflare AI Gateway Token:"
read -s AI_GATEWAY_TOKEN
wrangler secret put AI_GATEWAY_TOKEN <<< "$AI_GATEWAY_TOKEN"

# Build the frontend for production
echo "Building frontend for production..."
cd ..
npm install
npm run build

# Deploy to Cloudflare Pages (if configured)
echo "To deploy the frontend to Cloudflare Pages:"
echo "1. Go to the Cloudflare Dashboard"
echo "2. Navigate to Workers & Pages"
echo "3. Click 'Create application'"
echo "4. Select 'Pages' and follow the instructions to connect your repository"
echo "5. Configure the build settings:"
echo "   - Build command: npm run build"
echo "   - Build output directory: dist"
echo "   - Root directory: /"
echo "6. Add environment variables if needed"
echo "7. Deploy!"

echo "Cloudflare deployment completed successfully!"
echo "Your Cloudflare Worker is now available at: https://bitebase-chatbot.your-subdomain.workers.dev"
echo "Configure your DNS to point api.bitebase.app to your Cloudflare Worker"
echo "Configure Cloudflare Pages to host your frontend at bitebase.app"
