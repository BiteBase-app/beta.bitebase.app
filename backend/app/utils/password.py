import secrets
from typing import Optional

from jose import jwt
from datetime import datetime, timedelta

from app.core.config import settings


def generate_password_reset_token(email: str) -> str:
    """
    Generate a password reset token.
    
    Args:
        email: User email
        
    Returns:
        JWT token
    """
    delta = timedelta(hours=settings.ACCESS_TOKEN_EXPIRE_MINUTES / 60)
    now = datetime.utcnow()
    expires = now + delta
    exp = expires.timestamp()
    encoded_jwt = jwt.encode(
        {"exp": exp, "nbf": now, "sub": email}, settings.SECRET_KEY, algorithm="HS256",
    )
    return encoded_jwt


def verify_password_reset_token(token: str) -> Optional[str]:
    """
    Verify a password reset token.
    
    Args:
        token: JWT token
        
    Returns:
        User email if token is valid, None otherwise
    """
    try:
        decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        return decoded_token["sub"]
    except jwt.JWTError:
        return None
