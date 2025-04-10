#!/bin/bash

# Exit on error
set -e

echo "Fixing build issues and deploying to Render..."

# Make sure all dependencies are installed
echo "Installing dependencies..."
npm install
npm install axios --save

# Update package.json to ensure axios is included
if ! grep -q '"axios":' package.json; then
  echo "Adding axios to package.json..."
  sed -i 's/"dependencies": {/"dependencies": {\n    "axios": "^1.8.4",/g' package.json
fi

# Build the project
echo "Building the project..."
npm run build

echo "Build completed successfully!"
echo "The build output is in the 'dist' directory."
echo ""
echo "To deploy to Render:"
echo "1. Make sure your repository is connected to Render"
echo "2. Configure your static site with:"
echo "   - Build Command: npm install && npm run build"
echo "   - Publish Directory: dist"
echo "3. Add the environment variable VITE_APP_ENV=production"
echo "4. Deploy!"
