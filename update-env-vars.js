// Script to update environment variables for the beta-bitebase-app project
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create .env.production file for beta-bitebase-app
const envContent = `VITE_APP_ENV=production
VITE_API_URL=https://bitebase-direct-backend.bitebase.workers.dev
`;

// Write the file
fs.writeFileSync(path.join(__dirname, '.env.production'), envContent);
console.log('Created .env.production file with the following content:');
console.log(envContent);

// Create _redirects file for client-side routing
const redirectsContent = `/*    /index.html   200
`;

// Write the file
fs.writeFileSync(path.join(__dirname, 'dist', '_redirects'), redirectsContent);
console.log('Created _redirects file for client-side routing');

console.log('Environment variables updated successfully!');
