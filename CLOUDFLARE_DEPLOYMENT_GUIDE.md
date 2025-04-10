# BiteBase Deployment Guide for Cloudflare Pages

This guide provides comprehensive instructions for deploying the BiteBase application to Cloudflare Pages.

## Overview

There are two methods to deploy to Cloudflare Pages:

1. **Direct Deployment**: Using the Cloudflare dashboard to connect your GitHub repository
2. **CLI Deployment**: Using the Wrangler CLI to deploy from your local machine

## Prerequisites

- A Cloudflare account
- Domain name (bitebase.app) added to your Cloudflare account
- Node.js and npm installed

## Method 1: Direct Deployment (Recommended)

### Step 1: Connect Your Repository

1. Log in to your Cloudflare dashboard
2. Navigate to "Workers & Pages"
3. Click on "Create application"
4. Select "Pages" and "Connect to Git"
5. Select your GitHub account and repository (beta.bitebase.app)
6. Click "Begin setup"

### Step 2: Configure Build Settings

Use the following build settings:

- **Project name**: `bitebase-app` (or your preferred name)
- **Production branch**: `main` (or your main branch)
- **Build command**: `node cloudflare-pages-setup.cjs && npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (leave as default)

### Step 3: Add Environment Variables

Add the following environment variables:

- `VITE_APP_ENV`: `production`
- `VITE_API_URL`: `https://bitebase-chatbot.bitebase.workers.dev/api/v1`
- `VITE_CLOUDFLARE_AI_TOKEN`: `dIPwmSfU475UYmZaKivaQ-fhvt_jh6W8QaKxJ4d5`

### Step 4: Deploy

Click "Save and Deploy" to start the deployment process.

## Method 2: CLI Deployment (Local Development)

### Step 1: Install Wrangler CLI

```bash
npm install -g wrangler
```

### Step 2: Login to Cloudflare

```bash
wrangler login
```

### Step 3: Build and Deploy

```bash
# Build the application
npm run build:pages

# Deploy to Cloudflare Pages
wrangler pages deploy dist
```

## Setting Up Custom Domain

After deployment is complete:

1. Go to the "Custom domains" tab in your Pages project
2. Click "Set up a custom domain"
3. Enter your domain: `bitebase.app`
4. Follow the prompts to verify domain ownership and activate the domain

## Authentication Disabled Mode

As requested, the application is configured with authentication disabled. This is controlled by the environment variables set during the build process.

## Troubleshooting

### Build Failures

If the build fails:

1. Check the build logs for specific errors
2. Verify that the build command is correct
3. Make sure all required environment variables are set
4. Check that the repository has the necessary files:
   - `cloudflare-pages-setup.cjs`
   - `wrangler.toml` (with `pages_build_output_dir = "dist"`)
   - `public/_redirects`

### Wrangler CLI Issues

If you encounter issues with the Wrangler CLI:

1. Make sure Wrangler is installed globally: `npm install -g wrangler`
2. Check that you're logged in: `wrangler login`
3. Try running with verbose logging: `wrangler pages deploy dist --verbose`

### Custom Domain Issues

If your custom domain isn't working:

1. Verify DNS settings in Cloudflare
2. Check that the domain is properly activated in Pages
3. Wait for DNS propagation (can take up to 24 hours)

## Updating Your Deployment

### Automatic Updates (Direct Deployment)

Any new commits to your main branch will automatically trigger a new deployment.

### Manual Updates (CLI Deployment)

```bash
# Pull latest changes
git pull

# Build and deploy
npm run build:pages
wrangler pages deploy dist
```

## Monitoring

Monitor your application's performance and errors using Cloudflare's analytics tools:

1. Go to your Pages project in the Cloudflare dashboard
2. Click on "Analytics" to view traffic and performance metrics
3. Check "Logs" for any errors or issues
