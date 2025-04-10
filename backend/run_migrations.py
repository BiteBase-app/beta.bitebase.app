import os
import sys
import logging
import subprocess
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def run_migrations():
    """
    Run database migrations using Alembic.
    """
    try:
        # Run Alembic migrations
        logger.info("Running database migrations...")
        result = subprocess.run(
            ["alembic", "upgrade", "head"],
            check=True,
            capture_output=True,
            text=True
        )
        logger.info(result.stdout)
        
        return True
    except subprocess.CalledProcessError as e:
        logger.error(f"Error running migrations: {e.stderr}")
        return False
    except Exception as e:
        logger.error(f"Error running migrations: {str(e)}")
        return False

if __name__ == "__main__":
    logger.info("Starting database migrations...")
    if run_migrations():
        logger.info("Database migrations completed successfully")
    else:
        logger.error("Database migrations failed")
        sys.exit(1)
