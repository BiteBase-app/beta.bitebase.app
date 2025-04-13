#!/usr/bin/env python3
"""
Database Initialization Script for BiteBase

This script initializes the PostgreSQL database for the BiteBase application.
It creates all necessary tables and populates them with initial data.

Usage:
    python initialize_database.py

Requirements:
    - PostgreSQL server running
    - Environment variables set or .env file with database credentials
"""

import os
import sys
import uuid
import logging
import datetime
from typing import Dict, List, Any, Optional
import json

# Try to import required packages, install if missing
try:
    import psycopg2
    from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
    from dotenv import load_dotenv
    from sqlalchemy import create_engine, text
    from sqlalchemy_utils import database_exists, create_database
    from passlib.context import CryptContext
except ImportError:
    print("Installing required packages...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", 
                          "psycopg2-binary", "python-dotenv", "sqlalchemy", 
                          "sqlalchemy-utils", "passlib"])
    import psycopg2
    from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
    from dotenv import load_dotenv
    from sqlalchemy import create_engine, text
    from sqlalchemy_utils import database_exists, create_database
    from passlib.context import CryptContext

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler()]
)
logger = logging.getLogger("db_init")

# Load environment variables
load_dotenv()

# Database configuration
DB_USER = os.getenv("POSTGRES_USER", "postgres")
DB_PASSWORD = os.getenv("POSTGRES_PASSWORD", "postgres")
DB_SERVER = os.getenv("POSTGRES_SERVER", "localhost")
DB_NAME = os.getenv("POSTGRES_DB", "bitebase")

# Admin user configuration
ADMIN_EMAIL = os.getenv("FIRST_SUPERUSER_EMAIL", "admin@example.com")
ADMIN_PASSWORD = os.getenv("FIRST_SUPERUSER_PASSWORD", "admin")

# Test user configuration
TEST_EMAIL = os.getenv("EMAIL_TEST_USER", "test@example.com")
TEST_PASSWORD = "testpassword"

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    """Hash a password for storing."""
    return pwd_context.hash(password)

def create_db_if_not_exists():
    """Create the database if it doesn't exist."""
    try:
        # Connect to PostgreSQL server
        conn = psycopg2.connect(
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_SERVER,
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cursor = conn.cursor()
        
        # Check if database exists
        cursor.execute(f"SELECT 1 FROM pg_catalog.pg_database WHERE datname = '{DB_NAME}'")
        exists = cursor.fetchone()
        
        if not exists:
            cursor.execute(f'CREATE DATABASE "{DB_NAME}"')
            logger.info(f"Database '{DB_NAME}' created successfully")
        else:
            logger.info(f"Database '{DB_NAME}' already exists")
            
        cursor.close()
        conn.close()
        
        return True
    except Exception as e:
        logger.error(f"Error creating database: {str(e)}")
        return False

def get_db_connection():
    """Get a connection to the database."""
    try:
        conn = psycopg2.connect(
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_SERVER,
            database=DB_NAME
        )
        conn.autocommit = False
        return conn
    except Exception as e:
        logger.error(f"Error connecting to database: {str(e)}")
        sys.exit(1)

def create_tables(conn):
    """Create all necessary tables."""
    try:
        cursor = conn.cursor()
        
        # Create user table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS "user" (
            id VARCHAR(255) PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            full_name VARCHAR(255),
            hashed_password VARCHAR(255) NOT NULL,
            avatar_url VARCHAR(255),
            subscription_tier VARCHAR(50) DEFAULT 'free',
            is_active BOOLEAN DEFAULT TRUE,
            is_superuser BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE
        )
        """)
        
        # Create restaurant_profile table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS restaurantprofile (
            id VARCHAR(255) PRIMARY KEY,
            owner_id VARCHAR(255) NOT NULL REFERENCES "user"(id),
            restaurant_name VARCHAR(255) NOT NULL,
            concept_description TEXT,
            cuisine_type VARCHAR(100),
            target_audience VARCHAR(255),
            price_range VARCHAR(50),
            business_type VARCHAR(50) NOT NULL,
            is_local_brand BOOLEAN DEFAULT TRUE,
            street_address VARCHAR(255),
            city VARCHAR(100),
            state VARCHAR(100),
            zip_code VARCHAR(20),
            district VARCHAR(100),
            building_name VARCHAR(255),
            floor VARCHAR(50),
            nearest_bts VARCHAR(100),
            nearest_mrt VARCHAR(100),
            latitude FLOAT,
            longitude FLOAT,
            research_goals JSONB,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE
        )
        """)
        
        # Create research_project table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS researchproject (
            id VARCHAR(255) PRIMARY KEY,
            owner_id VARCHAR(255) NOT NULL REFERENCES "user"(id),
            restaurant_profile_id VARCHAR(255) NOT NULL REFERENCES restaurantprofile(id),
            name VARCHAR(255) NOT NULL,
            description TEXT,
            status VARCHAR(50) DEFAULT 'pending',
            progress INTEGER DEFAULT 0,
            competitive_analysis BOOLEAN DEFAULT FALSE,
            market_sizing BOOLEAN DEFAULT FALSE,
            demographic_analysis BOOLEAN DEFAULT FALSE,
            location_intelligence BOOLEAN DEFAULT FALSE,
            tourist_analysis BOOLEAN DEFAULT FALSE,
            local_competition BOOLEAN DEFAULT FALSE,
            pricing_strategy BOOLEAN DEFAULT FALSE,
            food_delivery_analysis BOOLEAN DEFAULT FALSE,
            results JSONB,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE,
            completed_at TIMESTAMP WITH TIME ZONE
        )
        """)
        
        # Create report table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS report (
            id VARCHAR(255) PRIMARY KEY,
            owner_id VARCHAR(255) NOT NULL REFERENCES "user"(id),
            research_project_id VARCHAR(255) NOT NULL REFERENCES researchproject(id),
            name VARCHAR(255) NOT NULL,
            type VARCHAR(50) NOT NULL,
            format VARCHAR(50) NOT NULL,
            data JSONB,
            file_path VARCHAR(255),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE
        )
        """)
        
        # Create integration table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS integration (
            id VARCHAR(255) PRIMARY KEY,
            owner_id VARCHAR(255) NOT NULL REFERENCES "user"(id),
            name VARCHAR(255) NOT NULL,
            type VARCHAR(50) NOT NULL,
            status VARCHAR(50) DEFAULT 'disconnected',
            config JSONB,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE,
            last_sync_at TIMESTAMP WITH TIME ZONE
        )
        """)
        
        conn.commit()
        logger.info("Tables created successfully")
        return True
    except Exception as e:
        conn.rollback()
        logger.error(f"Error creating tables: {str(e)}")
        return False

def insert_initial_users(conn):
    """Insert initial users (admin and test user)."""
    try:
        cursor = conn.cursor()
        
        # Check if admin user exists
        cursor.execute("SELECT 1 FROM \"user\" WHERE email = %s", (ADMIN_EMAIL,))
        admin_exists = cursor.fetchone()
        
        if not admin_exists:
            admin_id = str(uuid.uuid4())
            admin_password_hash = get_password_hash(ADMIN_PASSWORD)
            
            cursor.execute(
                """
                INSERT INTO "user" (id, email, full_name, hashed_password, is_superuser, subscription_tier)
                VALUES (%s, %s, %s, %s, %s, %s)
                """,
                (admin_id, ADMIN_EMAIL, "Admin User", admin_password_hash, True, "enterprise")
            )
            logger.info(f"Admin user '{ADMIN_EMAIL}' created successfully")
        else:
            logger.info(f"Admin user '{ADMIN_EMAIL}' already exists")
        
        # Check if test user exists
        cursor.execute("SELECT 1 FROM \"user\" WHERE email = %s", (TEST_EMAIL,))
        test_exists = cursor.fetchone()
        
        if not test_exists:
            test_id = str(uuid.uuid4())
            test_password_hash = get_password_hash(TEST_PASSWORD)
            
            cursor.execute(
                """
                INSERT INTO "user" (id, email, full_name, hashed_password, is_superuser, subscription_tier)
                VALUES (%s, %s, %s, %s, %s, %s)
                """,
                (test_id, TEST_EMAIL, "Test User", test_password_hash, False, "free")
            )
            logger.info(f"Test user '{TEST_EMAIL}' created successfully")
        else:
            logger.info(f"Test user '{TEST_EMAIL}' already exists")
        
        conn.commit()
        return True
    except Exception as e:
        conn.rollback()
        logger.error(f"Error inserting initial users: {str(e)}")
        return False

def insert_sample_data(conn):
    """Insert sample data for testing."""
    try:
        cursor = conn.cursor()
        
        # Get test user ID
        cursor.execute("SELECT id FROM \"user\" WHERE email = %s", (TEST_EMAIL,))
        test_user = cursor.fetchone()
        
        if not test_user:
            logger.error("Test user not found")
            return False
        
        test_user_id = test_user[0]
        
        # Sample restaurant profiles
        restaurant_profiles = [
            {
                "id": str(uuid.uuid4()),
                "owner_id": test_user_id,
                "restaurant_name": "Thai Delight",
                "concept_description": "Authentic Thai cuisine in a modern setting",
                "cuisine_type": "Thai",
                "target_audience": "Young professionals",
                "price_range": "$$",
                "business_type": "existing",
                "is_local_brand": True,
                "street_address": "123 Main St",
                "city": "Bangkok",
                "state": "",
                "zip_code": "10110",
                "district": "Sukhumvit",
                "latitude": 13.7563,
                "longitude": 100.5018,
                "research_goals": json.dumps(["market_analysis", "competitor_analysis"])
            },
            {
                "id": str(uuid.uuid4()),
                "owner_id": test_user_id,
                "restaurant_name": "Sushi Express",
                "concept_description": "Fast and fresh Japanese cuisine",
                "cuisine_type": "Japanese",
                "target_audience": "Business professionals",
                "price_range": "$$$",
                "business_type": "new",
                "is_local_brand": False,
                "street_address": "456 Market St",
                "city": "Bangkok",
                "state": "",
                "zip_code": "10330",
                "district": "Pathum Wan",
                "latitude": 13.7469,
                "longitude": 100.5349,
                "research_goals": json.dumps(["location_intelligence", "demographic_analysis"])
            }
        ]
        
        # Insert restaurant profiles
        for profile in restaurant_profiles:
            # Check if profile exists
            cursor.execute("SELECT 1 FROM restaurantprofile WHERE restaurant_name = %s AND owner_id = %s", 
                          (profile["restaurant_name"], profile["owner_id"]))
            exists = cursor.fetchone()
            
            if not exists:
                cursor.execute(
                    """
                    INSERT INTO restaurantprofile (
                        id, owner_id, restaurant_name, concept_description, cuisine_type, 
                        target_audience, price_range, business_type, is_local_brand,
                        street_address, city, state, zip_code, district, 
                        latitude, longitude, research_goals
                    )
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    """,
                    (
                        profile["id"], profile["owner_id"], profile["restaurant_name"], 
                        profile["concept_description"], profile["cuisine_type"],
                        profile["target_audience"], profile["price_range"], profile["business_type"], 
                        profile["is_local_brand"], profile["street_address"], profile["city"], 
                        profile["state"], profile["zip_code"], profile["district"],
                        profile["latitude"], profile["longitude"], profile["research_goals"]
                    )
                )
                logger.info(f"Restaurant profile '{profile['restaurant_name']}' created successfully")
            else:
                logger.info(f"Restaurant profile '{profile['restaurant_name']}' already exists")
        
        # Get restaurant profile IDs
        cursor.execute("SELECT id, restaurant_name FROM restaurantprofile WHERE owner_id = %s", (test_user_id,))
        profiles = cursor.fetchall()
        
        if not profiles:
            logger.warning("No restaurant profiles found for test user")
            conn.commit()
            return True
        
        profile_map = {profile[1]: profile[0] for profile in profiles}
        
        # Sample research projects
        if "Thai Delight" in profile_map:
            thai_profile_id = profile_map["Thai Delight"]
            
            # Check if project exists
            cursor.execute("SELECT 1 FROM researchproject WHERE name = %s AND owner_id = %s", 
                          ("Market Analysis for Thai Delight", test_user_id))
            exists = cursor.fetchone()
            
            if not exists:
                project_id = str(uuid.uuid4())
                cursor.execute(
                    """
                    INSERT INTO researchproject (
                        id, owner_id, restaurant_profile_id, name, description,
                        status, progress, competitive_analysis, market_sizing,
                        demographic_analysis, location_intelligence, completed_at
                    )
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    """,
                    (
                        project_id, test_user_id, thai_profile_id,
                        "Market Analysis for Thai Delight",
                        "Comprehensive market analysis for Thai restaurant expansion",
                        "completed", 100, True, True, True, True,
                        datetime.datetime.now() - datetime.timedelta(days=10)
                    )
                )
                
                # Add a report for this project
                report_id = str(uuid.uuid4())
                report_data = json.dumps({
                    "summary": "The market analysis shows strong potential for expansion in the Sukhumvit area.",
                    "market_size": "$5.2M annually",
                    "growth_rate": "8.5% year over year",
                    "key_competitors": ["Thai Spice", "Bangkok Kitchen", "Royal Thai"],
                    "recommendations": [
                        "Focus on lunch specials for office workers",
                        "Expand delivery options",
                        "Consider a second location in Silom district"
                    ]
                })
                
                cursor.execute(
                    """
                    INSERT INTO report (
                        id, owner_id, research_project_id, name, type, format, data
                    )
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                    """,
                    (
                        report_id, test_user_id, project_id,
                        "Thai Delight Market Analysis Report",
                        "market_analysis", "json", report_data
                    )
                )
                
                logger.info(f"Research project 'Market Analysis for Thai Delight' created successfully")
            else:
                logger.info(f"Research project 'Market Analysis for Thai Delight' already exists")
        
        if "Sushi Express" in profile_map:
            sushi_profile_id = profile_map["Sushi Express"]
            
            # Check if project exists
            cursor.execute("SELECT 1 FROM researchproject WHERE name = %s AND owner_id = %s", 
                          ("Location Analysis for Sushi Express", test_user_id))
            exists = cursor.fetchone()
            
            if not exists:
                project_id = str(uuid.uuid4())
                cursor.execute(
                    """
                    INSERT INTO researchproject (
                        id, owner_id, restaurant_profile_id, name, description,
                        status, progress, competitive_analysis, demographic_analysis, location_intelligence
                    )
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    """,
                    (
                        project_id, test_user_id, sushi_profile_id,
                        "Location Analysis for Sushi Express",
                        "Finding the best location for a new Sushi restaurant",
                        "in_progress", 65, True, True, True
                    )
                )
                
                # Add a report for this project
                report_id = str(uuid.uuid4())
                report_data = json.dumps({
                    "status": "in_progress",
                    "locations_analyzed": [
                        {"name": "Siam Square", "score": 8.5},
                        {"name": "Thonglor", "score": 7.9},
                        {"name": "Asok", "score": 9.2}
                    ],
                    "preliminary_recommendation": "Asok area shows the highest potential due to high foot traffic and proximity to office buildings."
                })
                
                cursor.execute(
                    """
                    INSERT INTO report (
                        id, owner_id, research_project_id, name, type, format, data
                    )
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                    """,
                    (
                        report_id, test_user_id, project_id,
                        "Sushi Express Location Analysis",
                        "location_intelligence", "json", report_data
                    )
                )
                
                logger.info(f"Research project 'Location Analysis for Sushi Express' created successfully")
            else:
                logger.info(f"Research project 'Location Analysis for Sushi Express' already exists")
        
        # Sample integrations
        integrations = [
            {
                "id": str(uuid.uuid4()),
                "owner_id": test_user_id,
                "name": "Google Places API",
                "type": "location_data",
                "status": "connected",
                "config": json.dumps({"api_key": "sample_key_123", "enabled": True})
            },
            {
                "id": str(uuid.uuid4()),
                "owner_id": test_user_id,
                "name": "Yelp API",
                "type": "review_data",
                "status": "disconnected",
                "config": json.dumps({"api_key": "", "enabled": False})
            }
        ]
        
        # Insert integrations
        for integration in integrations:
            # Check if integration exists
            cursor.execute("SELECT 1 FROM integration WHERE name = %s AND owner_id = %s", 
                          (integration["name"], integration["owner_id"]))
            exists = cursor.fetchone()
            
            if not exists:
                cursor.execute(
                    """
                    INSERT INTO integration (
                        id, owner_id, name, type, status, config
                    )
                    VALUES (%s, %s, %s, %s, %s, %s)
                    """,
                    (
                        integration["id"], integration["owner_id"], integration["name"],
                        integration["type"], integration["status"], integration["config"]
                    )
                )
                logger.info(f"Integration '{integration['name']}' created successfully")
            else:
                logger.info(f"Integration '{integration['name']}' already exists")
        
        conn.commit()
        return True
    except Exception as e:
        conn.rollback()
        logger.error(f"Error inserting sample data: {str(e)}")
        return False

def main():
    """Main function to initialize the database."""
    logger.info("Starting database initialization")
    
    # Create database if it doesn't exist
    if not create_db_if_not_exists():
        logger.error("Failed to create database. Exiting.")
        sys.exit(1)
    
    # Get database connection
    conn = get_db_connection()
    
    # Create tables
    if not create_tables(conn):
        logger.error("Failed to create tables. Exiting.")
        conn.close()
        sys.exit(1)
    
    # Insert initial users
    if not insert_initial_users(conn):
        logger.error("Failed to insert initial users. Exiting.")
        conn.close()
        sys.exit(1)
    
    # Insert sample data
    if not insert_sample_data(conn):
        logger.error("Failed to insert sample data. Exiting.")
        conn.close()
        sys.exit(1)
    
    conn.close()
    logger.info("Database initialization completed successfully")

if __name__ == "__main__":
    main()
