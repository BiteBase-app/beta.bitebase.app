#!/bin/bash

# Setup Database Script for BiteBase
# This script sets up the PostgreSQL database for the BiteBase application

# Set up colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== BiteBase Database Setup ===${NC}"
echo "This script will set up the PostgreSQL database for BiteBase."

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo -e "${RED}PostgreSQL is not installed. Please install PostgreSQL first.${NC}"
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}Python 3 is not installed. Please install Python 3 first.${NC}"
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}No .env file found. Creating a default one...${NC}"
    cat > .env << EOF
# Database Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_SERVER=localhost
POSTGRES_DB=bitebase

# Admin User
FIRST_SUPERUSER_EMAIL=admin@example.com
FIRST_SUPERUSER_PASSWORD=admin

# Test User
EMAIL_TEST_USER=test@example.com
EOF
    echo -e "${GREEN}.env file created. Please edit it with your database credentials.${NC}"
    echo -e "${YELLOW}Press Enter to continue or Ctrl+C to abort...${NC}"
    read
fi

# Run the Python initialization script
echo -e "${GREEN}Running database initialization script...${NC}"
python3 initialize_database.py

# Check if the script was successful
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Database setup completed successfully!${NC}"
    echo -e "${GREEN}You can now start the BiteBase application.${NC}"
else
    echo -e "${RED}Database setup failed. Please check the error messages above.${NC}"
    exit 1
fi
