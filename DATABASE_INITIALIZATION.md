# BiteBase Database Initialization

This document provides instructions for initializing the BiteBase database with all necessary tables and sample data.

## Overview

The database initialization script (`initialize_database.py`) performs the following tasks:

1. Creates the PostgreSQL database if it doesn't exist
2. Creates all necessary tables:
   - User
   - Restaurant Profile
   - Research Project
   - Report
   - Integration
3. Inserts initial users (admin and test user)
4. Inserts sample data for testing:
   - Restaurant profiles
   - Research projects
   - Reports
   - Integrations

## Prerequisites

- PostgreSQL server installed and running
- Python 3.6 or higher

## Required Python Packages

The script will automatically install these if they're missing:

- psycopg2-binary
- python-dotenv
- sqlalchemy
- sqlalchemy-utils
- passlib

## Configuration

The script uses the following environment variables:

| Variable | Description | Default Value |
|----------|-------------|---------------|
| POSTGRES_USER | PostgreSQL username | postgres |
| POSTGRES_PASSWORD | PostgreSQL password | postgres |
| POSTGRES_SERVER | PostgreSQL server address | localhost |
| POSTGRES_DB | PostgreSQL database name | bitebase |
| FIRST_SUPERUSER_EMAIL | Admin user email | admin@example.com |
| FIRST_SUPERUSER_PASSWORD | Admin user password | admin |
| EMAIL_TEST_USER | Test user email | test@example.com |

You can set these environment variables directly or create a `.env` file in the same directory as the script.

## Usage

### Running the Script

1. Make the script executable:
   ```bash
   chmod +x initialize_database.py
   ```

2. Run the script:
   ```bash
   ./initialize_database.py
   ```

### Expected Output

The script will output detailed logs of each step:

```
2023-07-01 12:00:00,000 - db_init - INFO - Starting database initialization
2023-07-01 12:00:00,100 - db_init - INFO - Database 'bitebase' created successfully
2023-07-01 12:00:00,200 - db_init - INFO - Tables created successfully
2023-07-01 12:00:00,300 - db_init - INFO - Admin user 'admin@example.com' created successfully
2023-07-01 12:00:00,400 - db_init - INFO - Test user 'test@example.com' created successfully
2023-07-01 12:00:00,500 - db_init - INFO - Restaurant profile 'Thai Delight' created successfully
...
2023-07-01 12:00:01,000 - db_init - INFO - Database initialization completed successfully
```

## Database Schema

### User Table

Stores user information including authentication details.

| Column | Type | Description |
|--------|------|-------------|
| id | VARCHAR(255) | Primary key |
| email | VARCHAR(255) | Unique email address |
| full_name | VARCHAR(255) | User's full name |
| hashed_password | VARCHAR(255) | Hashed password |
| avatar_url | VARCHAR(255) | URL to user's avatar |
| subscription_tier | VARCHAR(50) | Subscription tier (free, pro, enterprise) |
| is_active | BOOLEAN | Whether the user is active |
| is_superuser | BOOLEAN | Whether the user is a superuser |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### Restaurant Profile Table

Stores information about restaurants.

| Column | Type | Description |
|--------|------|-------------|
| id | VARCHAR(255) | Primary key |
| owner_id | VARCHAR(255) | Foreign key to user |
| restaurant_name | VARCHAR(255) | Name of the restaurant |
| concept_description | TEXT | Description of the restaurant concept |
| cuisine_type | VARCHAR(100) | Type of cuisine |
| target_audience | VARCHAR(255) | Target audience |
| price_range | VARCHAR(50) | Price range (e.g., $, $$, $$$) |
| business_type | VARCHAR(50) | Type of business (new, existing) |
| is_local_brand | BOOLEAN | Whether it's a local brand |
| street_address | VARCHAR(255) | Street address |
| city | VARCHAR(100) | City |
| state | VARCHAR(100) | State/Province |
| zip_code | VARCHAR(20) | ZIP/Postal code |
| district | VARCHAR(100) | District |
| building_name | VARCHAR(255) | Building name |
| floor | VARCHAR(50) | Floor |
| nearest_bts | VARCHAR(100) | Nearest BTS station |
| nearest_mrt | VARCHAR(100) | Nearest MRT station |
| latitude | FLOAT | Latitude coordinate |
| longitude | FLOAT | Longitude coordinate |
| research_goals | JSONB | Research goals as JSON |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### Research Project Table

Stores information about research projects.

| Column | Type | Description |
|--------|------|-------------|
| id | VARCHAR(255) | Primary key |
| owner_id | VARCHAR(255) | Foreign key to user |
| restaurant_profile_id | VARCHAR(255) | Foreign key to restaurant profile |
| name | VARCHAR(255) | Project name |
| description | TEXT | Project description |
| status | VARCHAR(50) | Status (pending, in_progress, completed) |
| progress | INTEGER | Progress percentage (0-100) |
| competitive_analysis | BOOLEAN | Whether to include competitive analysis |
| market_sizing | BOOLEAN | Whether to include market sizing |
| demographic_analysis | BOOLEAN | Whether to include demographic analysis |
| location_intelligence | BOOLEAN | Whether to include location intelligence |
| tourist_analysis | BOOLEAN | Whether to include tourist analysis |
| local_competition | BOOLEAN | Whether to include local competition analysis |
| pricing_strategy | BOOLEAN | Whether to include pricing strategy |
| food_delivery_analysis | BOOLEAN | Whether to include food delivery analysis |
| results | JSONB | Results as JSON |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |
| completed_at | TIMESTAMP | Completion timestamp |

### Report Table

Stores reports generated from research projects.

| Column | Type | Description |
|--------|------|-------------|
| id | VARCHAR(255) | Primary key |
| owner_id | VARCHAR(255) | Foreign key to user |
| research_project_id | VARCHAR(255) | Foreign key to research project |
| name | VARCHAR(255) | Report name |
| type | VARCHAR(50) | Report type |
| format | VARCHAR(50) | Report format (pdf, excel, csv, json) |
| data | JSONB | Report data as JSON |
| file_path | VARCHAR(255) | Path to report file |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### Integration Table

Stores information about external integrations.

| Column | Type | Description |
|--------|------|-------------|
| id | VARCHAR(255) | Primary key |
| owner_id | VARCHAR(255) | Foreign key to user |
| name | VARCHAR(255) | Integration name |
| type | VARCHAR(50) | Integration type |
| status | VARCHAR(50) | Status (connected, disconnected) |
| config | JSONB | Configuration as JSON |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |
| last_sync_at | TIMESTAMP | Last synchronization timestamp |

## Sample Data

The script inserts the following sample data:

### Users
- Admin user: admin@example.com (password: admin)
- Test user: test@example.com (password: testpassword)

### Restaurant Profiles
- Thai Delight: Thai cuisine restaurant in Bangkok
- Sushi Express: Japanese cuisine restaurant in Bangkok

### Research Projects
- Market Analysis for Thai Delight (completed)
- Location Analysis for Sushi Express (in progress)

### Reports
- Thai Delight Market Analysis Report
- Sushi Express Location Analysis (in progress)

### Integrations
- Google Places API (connected)
- Yelp API (disconnected)

## Troubleshooting

### Connection Issues
- Ensure PostgreSQL is running
- Check that the database credentials are correct
- Verify that the PostgreSQL server is accessible from your machine

### Permission Issues
- Ensure the PostgreSQL user has permission to create databases
- Check file permissions for the script

### Data Already Exists
- The script checks for existing data before inserting
- If you want to start fresh, drop the database and run the script again:
  ```sql
  DROP DATABASE IF EXISTS bitebase;
  ```
