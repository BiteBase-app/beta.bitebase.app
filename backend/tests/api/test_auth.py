from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.config import settings
from app.tests.utils.utils import random_email, random_lower_string


def test_get_access_token(client: TestClient, db: Session) -> None:
    login_data = {
        "username": settings.FIRST_SUPERUSER_EMAIL,
        "password": settings.FIRST_SUPERUSER_PASSWORD,
    }
    r = client.post(f"{settings.API_V1_STR}/auth/login/access-token", data=login_data)
    tokens = r.json()
    assert r.status_code == 200
    assert "access_token" in tokens
    assert tokens["access_token"]


def test_use_access_token(
    client: TestClient, superuser_token_headers: dict
) -> None:
    r = client.post(
        f"{settings.API_V1_STR}/auth/login/test-token", headers=superuser_token_headers
    )
    result = r.json()
    assert r.status_code == 200
    assert "email" in result


def test_register_user(client: TestClient, db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    data = {"email": email, "password": password}
    r = client.post(f"{settings.API_V1_STR}/auth/register", json=data)
    assert r.status_code == 200
    created_user = r.json()
    assert created_user["email"] == email
    assert "id" in created_user
