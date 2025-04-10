import os
import sys
import logging
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def main():
    """
    Run all database setup steps.
    """
    # Step 1: Create the database
    logger.info("Step 1: Creating database...")
    from setup_db import setup_database
    if not setup_database():
        logger.error("Failed to create database. Exiting.")
        sys.exit(1)
    
    # Step 2: Run migrations
    logger.info("Step 2: Running migrations...")
    from run_migrations import run_migrations
    if not run_migrations():
        logger.error("Failed to run migrations. Exiting.")
        sys.exit(1)
    
    # Step 3: Initialize data
    logger.info("Step 3: Initializing data...")
    from init_data import init_data
    if not init_data():
        logger.error("Failed to initialize data. Exiting.")
        sys.exit(1)
    
    logger.info("Database setup completed successfully!")

if __name__ == "__main__":
    main()
