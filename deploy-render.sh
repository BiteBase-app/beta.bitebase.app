#!/bin/bash

# Exit on error
set -e

# Build the frontend
echo "Building frontend for production..."
yarn install
yarn build

echo "Frontend build completed successfully!"
echo "The build output is in the 'dist' directory."
echo ""
echo "To deploy to Render:"
echo "1. Make sure your repository is connected to Render"
echo "2. Configure your static site with:"
echo "   - Build Command: yarn install && yarn build"
echo "   - Publish Directory: dist"
echo "3. Add the environment variable VITE_APP_ENV=production"
echo "4. Deploy!"
echo ""
echo "Or use the render.yaml file for automatic configuration."
