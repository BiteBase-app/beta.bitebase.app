import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.config import settings
from app.tests.utils.user import authentication_token_from_email


@pytest.fixture(scope="module")
def user_token_headers(client: TestClient, db: Session) -> dict:
    return authentication_token_from_email(
        client=client, email=settings.EMAIL_TEST_USER, db=db
    )


def test_analyze_location(
    client: TestClient, user_token_headers: dict, db: Session
) -> None:
    # Test coordinates for Bangkok
    params = {
        "latitude": 13.7563,
        "longitude": 100.5018,
        "radius": 1.0,
    }
    response = client.get(
        f"{settings.API_V1_STR}/location/analyze",
        headers=user_token_headers,
        params=params,
    )
    assert response.status_code == 200
    content = response.json()
    assert "location_score" in content
    assert "nearby_places" in content
    assert "accessibility" in content


def test_get_competitors(
    client: TestClient, user_token_headers: dict, db: Session
) -> None:
    # Test coordinates for Bangkok
    params = {
        "latitude": 13.7563,
        "longitude": 100.5018,
        "radius": 1.0,
        "cuisine_type": "Thai",
    }
    response = client.get(
        f"{settings.API_V1_STR}/location/competitors",
        headers=user_token_headers,
        params=params,
    )
    assert response.status_code == 200
    content = response.json()
    assert "total_competitors" in content
    assert "competitors" in content
    assert "average_rating" in content


def test_get_demographics(
    client: TestClient, user_token_headers: dict, db: Session
) -> None:
    # Test coordinates for Bangkok
    params = {
        "latitude": 13.7563,
        "longitude": 100.5018,
        "radius": 1.0,
    }
    response = client.get(
        f"{settings.API_V1_STR}/location/demographics",
        headers=user_token_headers,
        params=params,
    )
    assert response.status_code == 200
    content = response.json()
    assert "population" in content
    assert "age_distribution" in content
    assert "income_levels" in content
