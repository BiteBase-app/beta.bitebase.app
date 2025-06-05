from fastapi import APIRouter

from app.api.api_v1.endpoints import (
    auth,
    users,
    restaurant_profiles,
    research_projects,
    integrations,
    reports,
    location,
    analytics,
    chatbot,
    mock_data,
    restaurant_intelligence,
    subscriptions,
)

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(
    restaurant_profiles.router, prefix="/restaurant-profiles", tags=["restaurant profiles"]
)
api_router.include_router(
    research_projects.router, prefix="/research-projects", tags=["research projects"]
)
api_router.include_router(
    integrations.router, prefix="/integrations", tags=["integrations"]
)
api_router.include_router(reports.router, prefix="/reports", tags=["reports"])
api_router.include_router(location.router, prefix="/location", tags=["location"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
api_router.include_router(chatbot.router, prefix="/chatbot", tags=["chatbot"])
api_router.include_router(mock_data.router, prefix="/mock", tags=["mock"])
api_router.include_router(
    restaurant_intelligence.router, prefix="/intelligence", tags=["restaurant intelligence"]
)
api_router.include_router(
    subscriptions.router, prefix="/subscriptions", tags=["subscriptions"]
)
