#!/bin/bash

# Deployment script for the Astro project
# This script will build and deploy the Astro project to Cloudflare Pages

# Set up colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== BiteBase Astro Deployment ===${NC}"
echo "This script will build and deploy the Astro project to Cloudflare Pages."

# Check if the target directory exists
if [ ! -d "bitebase-intelligence-astro" ]; then
    echo -e "${RED}Target directory 'bitebase-intelligence-astro' not found. Please make sure it exists.${NC}"
    exit 1
fi

# Build the Astro project
echo -e "${YELLOW}Building the Astro project...${NC}"
cd bitebase-intelligence-astro
npm run build

# Deploy to Cloudflare Pages
echo -e "${YELLOW}Deploying to Cloudflare Pages...${NC}"
npm run deploy

cd ..

echo -e "${GREEN}Deployment completed successfully!${NC}"
echo -e "${YELLOW}Please check the Cloudflare dashboard for the deployment status.${NC}"
