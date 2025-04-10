// This script sets up the build environment for Cloudflare Pages
const fs = require('fs');
const path = require('path');

// Create .env.production file
const envContent = `VITE_APP_ENV=production
VITE_API_URL=https://bitebase-ai-proxy.bitebase.workers.dev/api/v1
`;

fs.writeFileSync(path.join(__dirname, '.env.production'), envContent);

console.log('Created .env.production file');

// Update package.json to ensure axios is included
try {
  const packageJsonPath = path.join(__dirname, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // Make sure axios is included
  if (!packageJson.dependencies.axios) {
    packageJson.dependencies.axios = '^1.8.4';
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('Added axios to package.json');
  }
} catch (error) {
  console.error('Error updating package.json:', error);
}

// Create _redirects file for client-side routing
const redirectsContent = `/*    /index.html   200`;
fs.writeFileSync(path.join(__dirname, 'public', '_redirects'), redirectsContent);
console.log('Created _redirects file');

console.log('Cloudflare Pages build setup complete');
