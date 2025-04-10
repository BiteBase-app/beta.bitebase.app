# Deploying BiteBase to Render

This guide provides step-by-step instructions for deploying the BiteBase application to Render.

## Prerequisites

- A Render account
- Your GitHub repository connected to Render

## Deployment Steps

### 1. Deploy the Frontend to Render

1. Log in to your Render dashboard
2. Click "New" and select "Static Site"
3. Connect your GitHub repository
4. Configure the deployment:
   - Name: bitebase-app (or your preferred name)
   - Build Command: `yarn install && yarn build`
   - Publish Directory: `dist`
   - Environment Variables:
     - `VITE_APP_ENV`: `production`
5. Click "Create Static Site"

### 2. Configure Custom Domain (Optional)

If you want to use a custom domain (like bitebase.app):

1. Go to your static site in the Render dashboard
2. Click on "Settings" and then "Custom Domain"
3. Click "Add Custom Domain"
4. Enter your domain (e.g., bitebase.app)
5. Follow the instructions to verify domain ownership and configure DNS

### 3. Deploy the Backend (Optional)

If you need to deploy the backend services:

1. Click "New" and select "Web Service"
2. Connect your GitHub repository
3. Configure the deployment:
   - Name: bitebase-api (or your preferred name)
   - Root Directory: `backend` (if your backend is in a subdirectory)
   - Runtime: Python
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Environment Variables:
     - Add all the variables from your `.env.deploy` file
4. Click "Create Web Service"

### 4. Set Up a Database (Optional)

If your application requires a database:

1. Click "New" and select "PostgreSQL"
2. Configure the database:
   - Name: bitebase-db (or your preferred name)
   - PostgreSQL Version: 13
3. Click "Create Database"
4. Update your backend environment variables with the database connection details

## Fixing Build Issues

If you encounter build issues related to dependencies like axios, run the provided fix script:

```bash
./fix-build-deploy.sh
```

This script will:
1. Install all dependencies including axios
2. Update package.json if needed
3. Build the project

After running this script, you can deploy to Render using the manual configuration described above.

## Troubleshooting

### Build Failures

If the build fails:

1. Check the build logs in the Render dashboard
2. Make sure the build command and publish directory are correct
3. Verify that all dependencies are properly installed

### Runtime Errors

If the application runs but doesn't work correctly:

1. Check the runtime logs in the Render dashboard
2. Verify that all environment variables are set correctly
3. Make sure the API endpoints are configured correctly

## Updating the Deployment

Render automatically deploys new changes when you push to your repository. You can also manually trigger a deployment from the Render dashboard.

## Additional Resources

- [Render Documentation](https://render.com/docs)
- [Render Static Sites](https://render.com/docs/static-sites)
- [Render Web Services](https://render.com/docs/web-services)
- [Render Databases](https://render.com/docs/databases)
