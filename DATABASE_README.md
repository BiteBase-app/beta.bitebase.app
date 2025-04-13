# BiteBase Database Setup

This repository contains scripts and tools to set up and initialize the BiteBase database.

## Overview

BiteBase uses a PostgreSQL database to store information about users, restaurant profiles, research projects, reports, and integrations. This repository provides tools to:

1. Create the database
2. Create all necessary tables
3. Initialize the database with sample data

## Prerequisites

- PostgreSQL 12+ (for direct installation)
- Python 3.6+ (for direct installation)
- Docker and Docker Compose (for containerized installation)

## Installation Options

### Option 1: Direct Installation

If you have PostgreSQL and Python installed locally, you can use the provided scripts to set up the database directly.

1. Clone this repository:
   ```bash
   git clone https://github.com/BiteBase-app/bitebase-db-setup.git
   cd bitebase-db-setup
   ```

2. Run the setup script:
   ```bash
   ./setup_database.sh
   ```

   This script will:
   - Check if PostgreSQL and Python are installed
   - Create a default `.env` file if one doesn't exist
   - Run the database initialization script

### Option 2: Docker Installation

If you prefer to use Docker, you can use the provided Docker Compose file to set up the database in a container.

1. Clone this repository:
   ```bash
   git clone https://github.com/BiteBase-app/bitebase-db-setup.git
   cd bitebase-db-setup
   ```

2. Run Docker Compose:
   ```bash
   docker-compose -f docker-compose.db.yml up
   ```

   This will:
   - Start a PostgreSQL container
   - Run the database initialization script in a separate container

## Configuration

You can configure the database setup by editing the `.env` file or by setting environment variables.

### Environment Variables

| Variable | Description | Default Value |
|----------|-------------|---------------|
| POSTGRES_USER | PostgreSQL username | postgres |
| POSTGRES_PASSWORD | PostgreSQL password | postgres |
| POSTGRES_SERVER | PostgreSQL server address | localhost |
| POSTGRES_DB | PostgreSQL database name | bitebase |
| FIRST_SUPERUSER_EMAIL | Admin user email | admin@example.com |
| FIRST_SUPERUSER_PASSWORD | Admin user password | admin |
| EMAIL_TEST_USER | Test user email | test@example.com |

## Database Schema

For detailed information about the database schema, see [DATABASE_INITIALIZATION.md](DATABASE_INITIALIZATION.md).

## Sample Data

The initialization script creates the following sample data:

### Users
- Admin user: admin@example.com (password: admin)
- Test user: test@example.com (password: testpassword)

### Restaurant Profiles
- Thai Delight: Thai cuisine restaurant in Bangkok
- Sushi Express: Japanese cuisine restaurant in Bangkok

### Research Projects
- Market Analysis for Thai Delight (completed)
- Location Analysis for Sushi Express (in progress)

## Troubleshooting

### Connection Issues
- Ensure PostgreSQL is running
- Check that the database credentials are correct
- Verify that the PostgreSQL server is accessible from your machine

### Docker Issues
- Ensure Docker and Docker Compose are installed
- Check that the Docker daemon is running
- Verify that the ports are not already in use

## License

This project is licensed under the MIT License - see the LICENSE file for details.
