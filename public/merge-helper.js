
/**
 * Helper script to assist with merging repositories
 * 
 * Usage: 
 * 1. Place this file in your project root
 * 2. Run with Node.js: node merge-helper.js
 * 
 * This script requires the 'fs-extra' package:
 * npm install fs-extra
 */

const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Configuration - update these paths
const sourceRepoPath = './pre-lunch-bitebase'; // Path to cloned repository
const targetRepoPath = './'; // Path to current project

// Directories to copy from source to target
const directoriesToCopy = [
  { source: 'src/components', target: 'src/components' },
  { source: 'src/hooks', target: 'src/hooks' },
  { source: 'src/pages', target: 'src/pages' },
  { source: 'src/utils', target: 'src/utils' },
  { source: 'public', target: 'public' },
  // Add more directories as needed
];

// Files to copy (relative to repo root)
const filesToCopy = [
  // Add specific files to copy
];

// Function to copy directories with confirmation
async function copyDirectoryWithConfirmation(source, target) {
  return new Promise((resolve) => {
    rl.question(`Copy ${source} to ${target}? (y/n): `, async (answer) => {
      if (answer.toLowerCase() === 'y') {
        try {
          const sourceFullPath = path.join(sourceRepoPath, source);
          const targetFullPath = path.join(targetRepoPath, target);
          
          if (fs.existsSync(sourceFullPath)) {
            console.log(`Copying ${source} to ${target}...`);
            await fs.copy(sourceFullPath, targetFullPath, {
              overwrite: false,
              errorOnExist: false
            });
            console.log(`Successfully copied ${source} to ${target}`);
          } else {
            console.log(`Source directory ${source} does not exist`);
          }
        } catch (err) {
          console.error(`Error copying ${source} to ${target}:`, err);
        }
      } else {
        console.log(`Skipping ${source}`);
      }
      resolve();
    });
  });
}

// Main function
async function mergeRepositories() {
  console.log('Starting repository merge process...');
  
  // Create directories if they don't exist
  for (const dir of directoriesToCopy) {
    const targetDir = path.join(targetRepoPath, dir.target);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
  }
  
  // Copy directories
  for (const dir of directoriesToCopy) {
    await copyDirectoryWithConfirmation(dir.source, dir.target);
  }
  
  // Copy individual files
  for (const file of filesToCopy) {
    const sourceFile = path.join(sourceRepoPath, file);
    const targetFile = path.join(targetRepoPath, file);
    
    if (fs.existsSync(sourceFile)) {
      await new Promise((resolve) => {
        rl.question(`Copy file ${file}? (y/n): `, async (answer) => {
          if (answer.toLowerCase() === 'y') {
            try {
              await fs.copy(sourceFile, targetFile, { overwrite: false });
              console.log(`Successfully copied ${file}`);
            } catch (err) {
              console.error(`Error copying ${file}:`, err);
            }
          } else {
            console.log(`Skipping ${file}`);
          }
          resolve();
        });
      });
    } else {
      console.log(`Source file ${file} does not exist`);
    }
  }
  
  console.log('Repository merge process completed.');
  rl.close();
}

// Run the merge process
mergeRepositories();
