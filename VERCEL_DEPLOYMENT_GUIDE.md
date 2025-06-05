# Vercel Deployment Guide for BiteBase App

This guide will help you deploy the BiteBase application to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. Node.js and npm installed locally
3. Git repository access

## Deployment Methods

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Connect Repository to Vercel:**
   - Go to https://vercel.com/dashboard
   - Click "New Project"
   - Import your Git repository (GitHub/GitLab/Bitbucket)
   - Select the `beta.bitebase.app` repository

2. **Configure Build Settings:**
   - Framework Preset: `Vite`
   - Build Command: `npm run build:vercel`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Set Environment Variables:**
   Add these environment variables in the Vercel dashboard:
   ```
   VITE_APP_ENV=production
   VITE_API_URL=https://bitebase-direct-backend.bitebase.workers.dev
   ```

   Optional (if using Supabase):
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically build and deploy your application

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   cd /path/to/beta.bitebase.app
   vercel --prod
   ```

4. **Follow the prompts:**
   - Set up and deploy? `Y`
   - Which scope? Select your account/team
   - Link to existing project? `N` (for first deployment)
   - What's your project's name? `bitebase-app` (or your preferred name)
   - In which directory is your code located? `./`

## Configuration Files

The following files have been configured for optimal Vercel deployment:

### vercel.json
```json
{
  "buildCommand": "npm run build:vercel",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### .vercelignore
Excludes unnecessary files from deployment to optimize build time and deployment size.

## Environment Configuration

The app uses different configurations based on the `VITE_APP_ENV` environment variable:

- **development**: Uses localhost backend
- **staging**: Uses staging backend
- **production**: Uses production backend

Make sure to set `VITE_APP_ENV=production` in your Vercel environment variables.

## Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Navigate to "Settings" > "Domains"
3. Add your custom domain
4. Configure DNS records as instructed by Vercel

## Troubleshooting

### Build Failures

1. **Check build logs** in Vercel dashboard
2. **Verify environment variables** are set correctly
3. **Test build locally**:
   ```bash
   npm install
   npm run build:vercel
   ```

### Runtime Issues

1. **Check browser console** for JavaScript errors
2. **Verify API endpoints** are accessible
3. **Check environment variables** in production

### Large Bundle Size Warning

The build shows a warning about large chunks. To optimize:

1. **Implement code splitting**:
   ```typescript
   const LazyComponent = lazy(() => import('./Component'));
   ```

2. **Configure manual chunks** in vite.config.ts:
   ```typescript
   build: {
     rollupOptions: {
       output: {
         manualChunks: {
           vendor: ['react', 'react-dom'],
           ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
         }
       }
     }
   }
   ```

## Deployment Status

✅ Build configuration ready
✅ Environment variables configured
✅ Routing configured for SPA
✅ Static asset caching optimized
✅ Build tested successfully

## Next Steps

1. Deploy using one of the methods above
2. Test the deployed application
3. Configure custom domain if needed
4. Set up monitoring and analytics
5. Configure CI/CD for automatic deployments

## Support

For issues with deployment:
- Check Vercel documentation: https://vercel.com/docs
- Review build logs in Vercel dashboard
- Test build locally before deploying