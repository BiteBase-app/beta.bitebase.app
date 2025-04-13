# BiteBase Database SQL Script

This document provides information about the `database.sql` script, which initializes the BiteBase database with all necessary tables, constraints, indexes, and sample data.

## Overview

The `database.sql` script is a comprehensive SQL script that:

1. Creates all necessary tables for the BiteBase application
2. Creates indexes for better query performance
3. Inserts initial data (admin user, test user, sample restaurant profiles, etc.)
4. Creates views for common queries
5. Creates functions and triggers for automatic timestamp updates

## Tables

The script creates the following tables:

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

## Indexes

The script creates indexes on frequently queried columns to improve performance:

- User: email, is_active
- Restaurant Profile: owner_id, restaurant_name, cuisine_type, city, district
- Research Project: owner_id, restaurant_profile_id, status
- Report: owner_id, research_project_id, type
- Integration: owner_id, type, status

## Views

The script creates the following views:

### Active Restaurant Profiles

```sql
CREATE OR REPLACE VIEW active_restaurant_profiles AS
SELECT 
    rp.*,
    u.email as owner_email,
    u.full_name as owner_name
FROM 
    restaurantprofile rp
JOIN 
    "user" u ON rp.owner_id = u.id
WHERE 
    u.is_active = TRUE;
```

### Research Project Summary

```sql
CREATE OR REPLACE VIEW research_project_summary AS
SELECT 
    rp.id,
    rp.name,
    rp.status,
    rp.progress,
    rp.created_at,
    rp.completed_at,
    u.email as owner_email,
    u.full_name as owner_name,
    rest.restaurant_name,
    rest.cuisine_type,
    (SELECT COUNT(*) FROM report r WHERE r.research_project_id = rp.id) as report_count
FROM 
    researchproject rp
JOIN 
    "user" u ON rp.owner_id = u.id
JOIN 
    restaurantprofile rest ON rp.restaurant_profile_id = rest.id;
```

## Functions and Triggers

The script creates a function to automatically update timestamps and triggers to apply this function to all tables:

```sql
-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for each table
CREATE TRIGGER update_user_timestamp
BEFORE UPDATE ON "user"
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- (similar triggers for other tables)
```

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

## Usage

### Running the Script Directly

You can run the script directly using the `psql` command:

```bash
psql -h localhost -U postgres -d bitebase -f database.sql
```

### Using the Helper Script

Alternatively, you can use the provided `run_database_sql.sh` script:

```bash
./run_database_sql.sh
```

This script will:
- Check if PostgreSQL is installed
- Prompt for database connection details
- Check if the database exists and create it if necessary
- Run the SQL script
- Display the results

## Customization

You can customize the script by:

- Uncommenting the database creation/dropping commands at the beginning
- Adjusting the sample data to match your needs
- Modifying the table schemas to add or remove columns
- Adding additional indexes for better performance
- Creating additional views for common queries

## Troubleshooting

### Permission Issues

If you encounter permission issues, make sure the PostgreSQL user has the necessary privileges:

```sql
GRANT ALL PRIVILEGES ON DATABASE bitebase TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO postgres;
```

### Existing Tables

If you run the script on a database with existing tables, it will not drop or recreate them (the script uses `CREATE TABLE IF NOT EXISTS`). To start fresh, you can either:

1. Drop the database and recreate it:
   ```sql
   DROP DATABASE IF EXISTS bitebase;
   CREATE DATABASE bitebase;
   ```

2. Drop individual tables:
   ```sql
   DROP TABLE IF EXISTS integration;
   DROP TABLE IF EXISTS report;
   DROP TABLE IF EXISTS researchproject;
   DROP TABLE IF EXISTS restaurantprofile;
   DROP TABLE IF EXISTS "user";
   ```

### UUID Extension

The script uses the UUID extension. If you encounter an error about the extension not being available, make sure it's installed:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```
