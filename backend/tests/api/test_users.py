from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import crud
from app.core.config import settings
from app.tests.utils.user import create_random_user
from app.tests.utils.utils import random_email, random_lower_string


def test_get_users_superuser_me(
    client: TestClient, superuser_token_headers: dict
) -> None:
    r = client.get(f"{settings.API_V1_STR}/users/me", headers=superuser_token_headers)
    current_user = r.json()
    assert current_user
    assert current_user["is_active"] is True
    assert current_user["is_superuser"]
    assert current_user["email"] == settings.FIRST_SUPERUSER_EMAIL


def test_get_users_normal_user_me(
    client: TestClient, normal_user_token_headers: dict
) -> None:
    r = client.get(f"{settings.API_V1_STR}/users/me", headers=normal_user_token_headers)
    current_user = r.json()
    assert current_user
    assert current_user["is_active"] is True
    assert current_user["is_superuser"] is False
    assert current_user["email"] == settings.EMAIL_TEST_USER


def test_update_user_me(
    client: TestClient, normal_user_token_headers: dict
) -> None:
    full_name = random_lower_string()
    data = {"full_name": full_name}
    r = client.put(
        f"{settings.API_V1_STR}/users/me", headers=normal_user_token_headers, json=data
    )
    current_user = r.json()
    assert current_user
    assert current_user["full_name"] == full_name


def test_get_user_by_id(
    client: TestClient, superuser_token_headers: dict, db: Session
) -> None:
    user = create_random_user(db)
    r = client.get(
        f"{settings.API_V1_STR}/users/{user.id}", headers=superuser_token_headers,
    )
    assert r.status_code == 200
    api_user = r.json()
    assert api_user
    assert api_user["email"] == user.email


def test_update_user_subscription(
    client: TestClient, superuser_token_headers: dict, db: Session
) -> None:
    user = create_random_user(db)
    subscription_tier = "pro"
    data = {"subscription_tier": subscription_tier}
    r = client.put(
        f"{settings.API_V1_STR}/users/{user.id}/subscription",
        headers=superuser_token_headers,
        json=data,
    )
    assert r.status_code == 200
    api_user = r.json()
    assert api_user
    assert api_user["subscription_tier"] == subscription_tier
