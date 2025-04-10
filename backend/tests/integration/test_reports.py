import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.config import settings
from app.tests.utils.user import authentication_token_from_email
from app.tests.utils.utils import random_lower_string
from tests.integration.test_research_projects import test_create_research_project


@pytest.fixture(scope="module")
def user_token_headers(client: TestClient, db: Session) -> dict:
    return authentication_token_from_email(
        client=client, email=settings.EMAIL_TEST_USER, db=db
    )


def test_create_report(
    client: TestClient, user_token_headers: dict, db: Session
) -> None:
    # First create a research project
    project = test_create_research_project(client, user_token_headers, db)
    
    data = {
        "name": f"Test Report {random_lower_string()}",
        "type": "market_analysis",
        "format": "json",
        "research_project_id": project["id"],
    }
    response = client.post(
        f"{settings.API_V1_STR}/reports/",
        headers=user_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["name"] == data["name"]
    assert content["type"] == data["type"]
    assert content["format"] == data["format"]
    assert content["research_project_id"] == project["id"]
    assert "id" in content
    return content


def test_read_report(
    client: TestClient, user_token_headers: dict, db: Session
) -> None:
    # First create a report
    report = test_create_report(client, user_token_headers, db)
    
    response = client.get(
        f"{settings.API_V1_STR}/reports/{report['id']}",
        headers=user_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["name"] == report["name"]
    assert content["id"] == report["id"]


def test_get_reports_by_project(
    client: TestClient, user_token_headers: dict, db: Session
) -> None:
    # First create a research project and a report
    project = test_create_research_project(client, user_token_headers, db)
    report = test_create_report(client, user_token_headers, db)
    
    response = client.get(
        f"{settings.API_V1_STR}/reports/by-project/{project['id']}",
        headers=user_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert isinstance(content, list)
    assert len(content) > 0
    
    # Check if our report is in the list
    report_ids = [r["id"] for r in content]
    assert report["id"] in report_ids


def test_get_reports_by_type(
    client: TestClient, user_token_headers: dict, db: Session
) -> None:
    # First create a report
    report = test_create_report(client, user_token_headers, db)
    
    response = client.get(
        f"{settings.API_V1_STR}/reports/by-type/{report['type']}",
        headers=user_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert isinstance(content, list)
    assert len(content) > 0
    
    # Check if our report is in the list
    report_ids = [r["id"] for r in content]
    assert report["id"] in report_ids
