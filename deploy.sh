#!/bin/bash

# Exit on error
set -e

# Load environment variables
if [ -f ".env.deploy" ]; then
    echo "Loading deployment environment variables..."
    source .env.deploy
else
    echo "Error: .env.deploy file not found!"
    echo "Please create a .env.deploy file with the required environment variables."
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Error: Docker is not installed!"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "Error: Docker Compose is not installed!"
    exit 1
fi

# Build and start the containers
echo "Building and starting containers..."
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d

# Wait for the database to be ready
echo "Waiting for the database to be ready..."
sleep 10

# Run database migrations
echo "Running database migrations..."
docker-compose -f docker-compose.prod.yml exec backend alembic upgrade head

# Initialize the database with initial data
echo "Initializing the database..."
docker-compose -f docker-compose.prod.yml exec backend python -m app.initial_data

echo "Deployment completed successfully!"
echo "The application is now running at https://bitebase.example.com"
