import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.config import settings
from app.tests.utils.user import authentication_token_from_email
from tests.integration.test_restaurant_profiles import test_create_restaurant_profile


@pytest.fixture(scope="module")
def user_token_headers(client: TestClient, db: Session) -> dict:
    return authentication_token_from_email(
        client=client, email=settings.EMAIL_TEST_USER, db=db
    )


def test_get_market_trends(
    client: TestClient, user_token_headers: dict, db: Session
) -> None:
    params = {
        "cuisine_type": "Thai",
        "location": "Bangkok",
    }
    response = client.get(
        f"{settings.API_V1_STR}/analytics/market-trends",
        headers=user_token_headers,
        params=params,
    )
    assert response.status_code == 200
    content = response.json()
    assert "industry_growth_rate" in content
    assert "cuisine_trends" in content
    assert "location_trends" in content
    assert "consumer_preferences" in content


def test_get_competitor_analysis(
    client: TestClient, user_token_headers: dict, db: Session
) -> None:
    # First create a restaurant profile
    profile = test_create_restaurant_profile(client, user_token_headers, db)
    
    response = client.get(
        f"{settings.API_V1_STR}/analytics/competitor-analysis/{profile['id']}",
        headers=user_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert "total_competitors" in content
    assert "competitors" in content
    assert "market_saturation" in content
    assert "competitive_positioning" in content


def test_get_performance_forecast(
    client: TestClient, user_token_headers: dict, db: Session
) -> None:
    # First create a restaurant profile
    profile = test_create_restaurant_profile(client, user_token_headers, db)
    
    params = {
        "months": 12,
    }
    response = client.get(
        f"{settings.API_V1_STR}/analytics/performance-forecast/{profile['id']}",
        headers=user_token_headers,
        params=params,
    )
    assert response.status_code == 200
    content = response.json()
    assert "revenue_forecast" in content
    assert "customer_forecast" in content
    assert "profit_forecast" in content
    assert len(content["revenue_forecast"]) == 12


def test_get_customer_demographics(
    client: TestClient, user_token_headers: dict, db: Session
) -> None:
    # First create a restaurant profile
    profile = test_create_restaurant_profile(client, user_token_headers, db)
    
    response = client.get(
        f"{settings.API_V1_STR}/analytics/customer-demographics/{profile['id']}",
        headers=user_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert "age_distribution" in content
    assert "gender_distribution" in content
    assert "income_levels" in content
    assert "dining_preferences" in content
