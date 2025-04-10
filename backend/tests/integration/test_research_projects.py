import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.config import settings
from app.tests.utils.user import authentication_token_from_email
from app.tests.utils.utils import random_lower_string
from tests.integration.test_restaurant_profiles import test_create_restaurant_profile


@pytest.fixture(scope="module")
def user_token_headers(client: TestClient, db: Session) -> dict:
    return authentication_token_from_email(
        client=client, email=settings.EMAIL_TEST_USER, db=db
    )


def test_create_research_project(
    client: TestClient, user_token_headers: dict, db: Session
) -> None:
    # First create a restaurant profile
    profile = test_create_restaurant_profile(client, user_token_headers, db)
    
    data = {
        "name": f"Test Research Project {random_lower_string()}",
        "description": "A test research project for integration testing",
        "restaurant_profile_id": profile["id"],
        "competitive_analysis": True,
        "market_sizing": True,
        "demographic_analysis": True,
        "location_intelligence": True,
    }
    response = client.post(
        f"{settings.API_V1_STR}/research-projects/",
        headers=user_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["name"] == data["name"]
    assert content["restaurant_profile_id"] == profile["id"]
    assert "id" in content
    return content


def test_read_research_project(
    client: TestClient, user_token_headers: dict, db: Session
) -> None:
    # First create a research project
    project = test_create_research_project(client, user_token_headers, db)
    
    response = client.get(
        f"{settings.API_V1_STR}/research-projects/{project['id']}",
        headers=user_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["name"] == project["name"]
    assert content["id"] == project["id"]


def test_update_research_project(
    client: TestClient, user_token_headers: dict, db: Session
) -> None:
    # First create a research project
    project = test_create_research_project(client, user_token_headers, db)
    
    data = {
        "name": f"Updated Research Project {random_lower_string()}",
        "tourist_analysis": True,
    }
    response = client.put(
        f"{settings.API_V1_STR}/research-projects/{project['id']}",
        headers=user_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["name"] == data["name"]
    assert content["tourist_analysis"] == data["tourist_analysis"]
    assert content["id"] == project["id"]


def test_analyze_research_project(
    client: TestClient, user_token_headers: dict, db: Session
) -> None:
    # First create a research project
    project = test_create_research_project(client, user_token_headers, db)
    
    response = client.post(
        f"{settings.API_V1_STR}/research-projects/{project['id']}/analyze",
        headers=user_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["id"] == project["id"]
    assert content["status"] == "in_progress"
    assert content["progress"] > 0
