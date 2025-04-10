# Deploying to Cloudflare Pages (Direct Method)

This guide provides instructions for deploying the BiteBase application directly to Cloudflare Pages using the Cloudflare dashboard.

## Prerequisites

- A Cloudflare account
- Domain name (bitebase.app) added to your Cloudflare account
- GitHub repository connected to Cloudflare Pages

## Deployment Steps

### 1. Connect Your Repository

1. Log in to your Cloudflare dashboard
2. Navigate to "Workers & Pages"
3. Click on "Create application"
4. Select "Pages" and "Connect to Git"
5. Select your GitHub account and repository (beta.bitebase.app)
6. Click "Begin setup"

### 2. Configure Build Settings

Use the following build settings:

- **Project name**: `bitebase-app` (or your preferred name)
- **Production branch**: `main` (or your main branch)
- **Build command**: `node cloudflare-pages-setup.cjs && npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (leave as default)

### 3. Add Environment Variables

Add the following environment variables:

- `VITE_APP_ENV`: `production`
- `VITE_API_URL`: `https://bitebase-chatbot.bitebase.workers.dev/api/v1`
- `VITE_CLOUDFLARE_AI_TOKEN`: `dIPwmSfU475UYmZaKivaQ-fhvt_jh6W8QaKxJ4d5`

### 4. Deploy

Click "Save and Deploy" to start the deployment process.

### 5. Set Up Custom Domain

After the initial deployment is complete:

1. Go to the "Custom domains" tab in your Pages project
2. Click "Set up a custom domain"
3. Enter your domain: `bitebase.app`
4. Follow the prompts to verify domain ownership and activate the domain

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

### Authentication Issues

If you're experiencing authentication issues:

1. Check that the `VITE_CLOUDFLARE_AI_TOKEN` is correct
2. Verify that the API endpoints are accessible
3. Check for CORS issues in the browser console

## Updating Your Deployment

Any new commits to your main branch will automatically trigger a new deployment. You can also manually trigger deployments from the Cloudflare dashboard.

## Monitoring

Monitor your application's performance and errors using Cloudflare's analytics tools:

1. Go to your Pages project in the Cloudflare dashboard
2. Click on "Analytics" to view traffic and performance metrics
3. Check "Logs" for any errors or issues
