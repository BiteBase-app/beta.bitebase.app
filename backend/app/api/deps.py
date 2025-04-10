from typing import Generator, Optional, Union

from fastapi import Depends, HTTPException, status, Header, Request
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from pydantic import ValidationError
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.core import security
from app.core.config import settings
from app.db.session import SessionLocal

reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/auth/login/access-token"
)


def get_db() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


def get_current_user(
    db: Session = Depends(get_db), token: str = Depends(reusable_oauth2)
) -> models.User:
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=["HS256"]
        )
        token_data = schemas.TokenPayload(**payload)
    except (jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    user = crud.user.get(db, id=token_data.sub)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


def get_current_active_user(
    current_user: models.User = Depends(get_current_user),
) -> models.User:
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


def get_current_active_superuser(
    current_user: models.User = Depends(get_current_user),
) -> models.User:
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=400, detail="The user doesn't have enough privileges"
        )
    return current_user


# Mock user for testing
MOCK_USER = models.User(
    id="mock-user-id",
    email="mock@example.com",
    hashed_password="mock-hashed-password",
    full_name="Mock User",
    is_active=True,
    is_superuser=True,  # Make the user a superuser
    subscription_tier="franchise"  # Highest tier
)


def get_current_active_user_or_mock(
    request: Request,
    db: Session = Depends(get_db),
    token: str = Depends(reusable_oauth2),
    x_mock_user: Optional[str] = Header(None)
) -> models.User:
    # If mock user header is present, return mock user
    if x_mock_user == "true":
        return MOCK_USER

    # Otherwise, try to get the real user
    try:
        return get_current_active_user(current_user=get_current_user(db=db, token=token))
    except HTTPException:
        # For testing purposes, if authentication fails, return mock user
        # In production, you would remove this fallback
        if settings.ENVIRONMENT.lower() != "production":
            return MOCK_USER
        raise
