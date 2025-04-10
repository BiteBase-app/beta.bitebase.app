import os
import sys
import logging
from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database
from dotenv import load_dotenv

# Add the parent directory to the path so we can import the app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def setup_database():
    """
    Create the database if it doesn't exist.
    """
    # Get database connection details from environment variables
    db_user = os.getenv("POSTGRES_USER", "postgres")
    db_password = os.getenv("POSTGRES_PASSWORD", "postgres")
    db_server = os.getenv("POSTGRES_SERVER", "localhost")
    db_name = os.getenv("POSTGRES_DB", "bitebase")
    
    # Create database URL
    db_url = f"postgresql://{db_user}:{db_password}@{db_server}/{db_name}"
    
    try:
        # Check if the database exists
        engine = create_engine(db_url)
        if not database_exists(engine.url):
            # Create the database
            create_database(engine.url)
            logger.info(f"Database '{db_name}' created successfully")
        else:
            logger.info(f"Database '{db_name}' already exists")
        
        # Test the connection
        conn = engine.connect()
        conn.close()
        logger.info("Database connection successful")
        
        return True
    except Exception as e:
        logger.error(f"Error setting up database: {str(e)}")
        return False

if __name__ == "__main__":
    logger.info("Setting up database...")
    if setup_database():
        logger.info("Database setup completed successfully")
    else:
        logger.error("Database setup failed")
        sys.exit(1)
