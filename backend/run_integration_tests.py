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

def run_integration_tests():
    """
    Run integration tests.
    """
    try:
        # Run pytest for integration tests
        logger.info("Running integration tests...")
        result = subprocess.run(
            ["pytest", "tests/integration", "-v"],
            check=True,
            capture_output=True,
            text=True
        )
        logger.info(result.stdout)
        
        return True
    except subprocess.CalledProcessError as e:
        logger.error(f"Error running integration tests: {e.stderr}")
        return False
    except Exception as e:
        logger.error(f"Error running integration tests: {str(e)}")
        return False

if __name__ == "__main__":
    logger.info("Starting integration tests...")
    if run_integration_tests():
        logger.info("Integration tests completed successfully")
    else:
        logger.error("Integration tests failed")
        sys.exit(1)
