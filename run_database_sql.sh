#!/bin/bash

# Run Database SQL Script for BiteBase
# This script runs the database.sql file to initialize the BiteBase database

# Set up colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== BiteBase Database SQL Setup ===${NC}"
echo "This script will run the database.sql file to initialize the BiteBase database."

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo -e "${RED}PostgreSQL is not installed. Please install PostgreSQL first.${NC}"
    exit 1
fi

# Check if database.sql exists
if [ ! -f database.sql ]; then
    echo -e "${RED}database.sql file not found. Please make sure it exists in the current directory.${NC}"
    exit 1
fi

# Prompt for database connection details
read -p "PostgreSQL host [localhost]: " DB_HOST
DB_HOST=${DB_HOST:-localhost}

read -p "PostgreSQL port [5432]: " DB_PORT
DB_PORT=${DB_PORT:-5432}

read -p "PostgreSQL username [postgres]: " DB_USER
DB_USER=${DB_USER:-postgres}

read -p "PostgreSQL password: " DB_PASSWORD

read -p "Database name [bitebase]: " DB_NAME
DB_NAME=${DB_NAME:-bitebase}

# Check if database exists
echo -e "${YELLOW}Checking if database exists...${NC}"
if ! PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -lqt | cut -d \| -f 1 | grep -qw "$DB_NAME"; then
    echo -e "${YELLOW}Database $DB_NAME does not exist. Creating it...${NC}"
    PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -c "CREATE DATABASE $DB_NAME;"
    if [ $? -ne 0 ]; then
        echo -e "${RED}Failed to create database. Please check your credentials and try again.${NC}"
        exit 1
    fi
    echo -e "${GREEN}Database $DB_NAME created successfully.${NC}"
else
    echo -e "${YELLOW}Database $DB_NAME already exists.${NC}"
    read -p "Do you want to continue and potentially overwrite existing data? (y/n): " CONTINUE
    if [ "$CONTINUE" != "y" ]; then
        echo -e "${YELLOW}Aborted.${NC}"
        exit 0
    fi
fi

# Run the SQL file
echo -e "${YELLOW}Running database.sql...${NC}"
PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f database.sql

# Check if the script was successful
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Database setup completed successfully!${NC}"
    echo -e "${GREEN}You can now connect to the database with the following credentials:${NC}"
    echo -e "${GREEN}Host: $DB_HOST${NC}"
    echo -e "${GREEN}Port: $DB_PORT${NC}"
    echo -e "${GREEN}Database: $DB_NAME${NC}"
    echo -e "${GREEN}Username: $DB_USER${NC}"
else
    echo -e "${RED}Database setup failed. Please check the error messages above.${NC}"
    exit 1
fi
