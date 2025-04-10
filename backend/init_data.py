import os
import sys
import logging
import uuid
from dotenv import load_dotenv

# Add the parent directory to the path so we can import the app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.session import SessionLocal
from app.core.config import settings
from app.core.security import get_password_hash
from app.models.user import User

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def init_data():
    """
    Initialize the database with initial data.
    """
    try:
        db = SessionLocal()
        
        # Check if superuser exists
        superuser = db.query(User).filter(User.email == settings.FIRST_SUPERUSER_EMAIL).first()
        if not superuser:
            # Create superuser
            superuser_id = str(uuid.uuid4())
            superuser = User(
                id=superuser_id,
                email=settings.FIRST_SUPERUSER_EMAIL,
                hashed_password=get_password_hash(settings.FIRST_SUPERUSER_PASSWORD),
                full_name="Admin User",
                is_superuser=True,
                is_active=True,
                subscription_tier="enterprise"
            )
            db.add(superuser)
            db.commit()
            logger.info(f"Superuser '{settings.FIRST_SUPERUSER_EMAIL}' created successfully")
        else:
            logger.info(f"Superuser '{settings.FIRST_SUPERUSER_EMAIL}' already exists")
        
        # Check if test user exists
        test_user = db.query(User).filter(User.email == settings.EMAIL_TEST_USER).first()
        if not test_user:
            # Create test user
            test_user_id = str(uuid.uuid4())
            test_user = User(
                id=test_user_id,
                email=settings.EMAIL_TEST_USER,
                hashed_password=get_password_hash("testpassword"),
                full_name="Test User",
                is_superuser=False,
                is_active=True,
                subscription_tier="free"
            )
            db.add(test_user)
            db.commit()
            logger.info(f"Test user '{settings.EMAIL_TEST_USER}' created successfully")
        else:
            logger.info(f"Test user '{settings.EMAIL_TEST_USER}' already exists")
        
        db.close()
        return True
    except Exception as e:
        logger.error(f"Error initializing data: {str(e)}")
        return False

if __name__ == "__main__":
    logger.info("Initializing database data...")
    if init_data():
        logger.info("Database initialization completed successfully")
    else:
        logger.error("Database initialization failed")
        sys.exit(1)
