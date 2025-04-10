import logging
from sqlalchemy.orm import Session

from app import crud, schemas
from app.core.config import settings
from app.db import base  # noqa: F401


logger = logging.getLogger(__name__)


def init_db(db: Session) -> None:
    """
    Initialize the database with initial data.
    """
    # Create a superuser if it doesn't exist
    user = crud.user.get_by_email(db, email=settings.FIRST_SUPERUSER_EMAIL)
    if not user:
        user_in = schemas.UserCreate(
            email=settings.FIRST_SUPERUSER_EMAIL,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            full_name="Initial Super User",
            is_superuser=True,
        )
        user = crud.user.create(db, obj_in=user_in)
        logger.info("Superuser created")
    else:
        logger.info("Superuser already exists")
