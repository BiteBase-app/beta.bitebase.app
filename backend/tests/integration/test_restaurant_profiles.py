import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.config import settings
from app.tests.utils.user import authentication_token_from_email
from app.tests.utils.utils import random_lower_string


@pytest.fixture(scope="module")
def user_token_headers(client: TestClient, db: Session) -> dict:
    return authentication_token_from_email(
        client=client, email=settings.EMAIL_TEST_USER, db=db
    )


def test_create_restaurant_profile(
    client: TestClient, user_token_headers: dict, db: Session
) -> None:
    data = {
        "restaurant_name": f"Test Restaurant {random_lower_string()}",
        "concept_description": "A test restaurant for integration testing",
        "cuisine_type": "Thai",
        "target_audience": "Young professionals",
        "price_range": "$$",
        "business_type": "new",
        "is_local_brand": True,
        "street_address": "123 Test Street",
        "city": "Bangkok",
        "state": "",
        "zip_code": "10110",
        "district": "Test District",
    }
    response = client.post(
        f"{settings.API_V1_STR}/restaurant-profiles/",
        headers=user_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["restaurant_name"] == data["restaurant_name"]
    assert content["cuisine_type"] == data["cuisine_type"]
    assert "id" in content
    return content


def test_read_restaurant_profile(
    client: TestClient, user_token_headers: dict, db: Session
) -> None:
    # First create a restaurant profile
    profile = test_create_restaurant_profile(client, user_token_headers, db)
    
    response = client.get(
        f"{settings.API_V1_STR}/restaurant-profiles/{profile['id']}",
        headers=user_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["restaurant_name"] == profile["restaurant_name"]
    assert content["id"] == profile["id"]


def test_update_restaurant_profile(
    client: TestClient, user_token_headers: dict, db: Session
) -> None:
    # First create a restaurant profile
    profile = test_create_restaurant_profile(client, user_token_headers, db)
    
    data = {
        "restaurant_name": f"Updated Restaurant {random_lower_string()}",
        "price_range": "$$$",
    }
    response = client.put(
        f"{settings.API_V1_STR}/restaurant-profiles/{profile['id']}",
        headers=user_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["restaurant_name"] == data["restaurant_name"]
    assert content["price_range"] == data["price_range"]
    assert content["id"] == profile["id"]


def test_delete_restaurant_profile(
    client: TestClient, user_token_headers: dict, db: Session
) -> None:
    # First create a restaurant profile
    profile = test_create_restaurant_profile(client, user_token_headers, db)
    
    response = client.delete(
        f"{settings.API_V1_STR}/restaurant-profiles/{profile['id']}",
        headers=user_token_headers,
    )
    assert response.status_code == 200
    
    # Verify it's deleted
    response = client.get(
        f"{settings.API_V1_STR}/restaurant-profiles/{profile['id']}",
        headers=user_token_headers,
    )
    assert response.status_code == 404
