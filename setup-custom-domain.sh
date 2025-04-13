#!/bin/bash

# Set up custom domain for Cloudflare Pages
# This script sets up the custom domain for the BiteBase application

# Set up colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== BiteBase Custom Domain Setup ===${NC}"
echo "This script will help you set up the custom domain for the BiteBase application."

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo -e "${RED}Wrangler is not installed. Please install it first:${NC}"
    echo "npm install -g wrangler"
    exit 1
fi

# Check if logged in to Cloudflare
echo -e "${YELLOW}Checking if you're logged in to Cloudflare...${NC}"
wrangler whoami &> /dev/null
if [ $? -ne 0 ]; then
    echo -e "${RED}You're not logged in to Cloudflare. Please log in first:${NC}"
    echo "wrangler login"
    exit 1
fi

# Set up custom domain
echo -e "${YELLOW}Setting up custom domain for the BiteBase application...${NC}"
echo -e "${YELLOW}This will add beta.bitebase.app as a custom domain for your Pages project.${NC}"
echo -e "${YELLOW}Make sure you have the domain added to your Cloudflare account.${NC}"

# Prompt for confirmation
read -p "Do you want to continue? (y/n): " CONTINUE
if [ "$CONTINUE" != "y" ]; then
    echo -e "${YELLOW}Aborted.${NC}"
    exit 0
fi

# Set up custom domain
echo -e "${YELLOW}Adding beta.bitebase.app as a custom domain...${NC}"
wrangler pages domain set bitebase-app beta.bitebase.app

# Check if the command was successful
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Custom domain setup completed successfully!${NC}"
    echo -e "${GREEN}The application is now available at https://beta.bitebase.app${NC}"
else
    echo -e "${RED}Custom domain setup failed. Please check the error messages above.${NC}"
    exit 1
fi
