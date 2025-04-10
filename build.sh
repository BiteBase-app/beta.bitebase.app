#!/bin/bash

# Run the Cloudflare Pages setup script
node cloudflare-pages-setup.cjs

# Build the application
npm run build

echo "Build completed successfully!"
