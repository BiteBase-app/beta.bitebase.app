#!/bin/bash

# Update dependencies for the Astro project
# This script will update the package.json file to add missing dependencies

# Set up colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== BiteBase Astro Dependencies Update ===${NC}"
echo "This script will update the package.json file to add missing dependencies."

# Check if the target directory exists
if [ ! -d "bitebase-intelligence-astro" ]; then
    echo -e "${RED}Target directory 'bitebase-intelligence-astro' not found. Please make sure it exists.${NC}"
    exit 1
fi

# Update React version to be compatible with dependencies
echo -e "${YELLOW}Updating React version...${NC}"
cd bitebase-intelligence-astro
npm uninstall react react-dom
npm install --save --legacy-peer-deps react@18.2.0 react-dom@18.2.0

# Add missing dependencies
echo -e "${YELLOW}Adding missing dependencies...${NC}"
npm install --save --legacy-peer-deps \
  @radix-ui/react-alert-dialog \
  @radix-ui/react-aspect-ratio \
  @radix-ui/react-avatar \
  @radix-ui/react-checkbox \
  @radix-ui/react-collapsible \
  @radix-ui/react-context-menu \
  @radix-ui/react-dropdown-menu \
  @radix-ui/react-hover-card \
  @radix-ui/react-menubar \
  @radix-ui/react-popover \
  @radix-ui/react-progress \
  @radix-ui/react-radio-group \
  @radix-ui/react-scroll-area \
  @radix-ui/react-select \
  @radix-ui/react-separator \
  @radix-ui/react-slider \
  @radix-ui/react-switch \
  @radix-ui/react-tabs \
  @radix-ui/react-toast \
  @radix-ui/react-toggle \
  @radix-ui/react-toggle-group \
  @radix-ui/react-tooltip \
  axios \
  date-fns \
  embla-carousel-react \
  framer-motion \
  input-otp \
  mapbox-gl \
  react-day-picker \
  react-helmet \
  react-helmet-async \
  react-map-gl \
  react-resizable-panels \
  recharts \
  sonner \
  vaul

# Add dev dependencies
echo -e "${YELLOW}Adding dev dependencies...${NC}"
npm install --save-dev --legacy-peer-deps \
  @tailwindcss/typography

cd ..

echo -e "${GREEN}Dependencies update completed successfully!${NC}"
echo -e "${YELLOW}Please review the package.json file and make any necessary adjustments.${NC}"
