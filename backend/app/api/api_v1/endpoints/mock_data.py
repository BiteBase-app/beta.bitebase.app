from fastapi import APIRouter, Depends, HTTPException
from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta
import uuid
import random

router = APIRouter()

# Mock restaurant profiles
MOCK_RESTAURANT_PROFILES = [
    {
        "id": "mock-restaurant-1",
        "restaurant_name": "Thai Delight",
        "concept_description": "Authentic Thai cuisine in a modern setting",
        "cuisine_type": "Thai",
        "business_type": "existing",
        "owner_id": "mock-user-id",
        "created_at": (datetime.now() - timedelta(days=120)).isoformat(),
        "is_local_brand": True,
        "target_audience": "Young professionals",
        "price_range": "$$",
        "street_address": "123 Main St",
        "city": "Bangkok",
        "state": "",
        "zip_code": "10110",
        "district": "Sukhumvit"
    },
    {
        "id": "mock-restaurant-2",
        "restaurant_name": "Sushi Express",
        "concept_description": "Fast and fresh Japanese cuisine",
        "cuisine_type": "Japanese",
        "business_type": "new",
        "owner_id": "mock-user-id",
        "created_at": (datetime.now() - timedelta(days=45)).isoformat(),
        "is_local_brand": False,
        "target_audience": "Business professionals",
        "price_range": "$$$",
        "street_address": "456 Market St",
        "city": "Tokyo",
        "state": "",
        "zip_code": "100-0001",
        "district": "Chiyoda"
    },
    {
        "id": "mock-restaurant-3",
        "restaurant_name": "Pasta Paradise",
        "concept_description": "Authentic Italian pasta dishes",
        "cuisine_type": "Italian",
        "business_type": "existing",
        "owner_id": "mock-user-id",
        "created_at": (datetime.now() - timedelta(days=200)).isoformat(),
        "is_local_brand": True,
        "target_audience": "Families",
        "price_range": "$$",
        "street_address": "789 Olive St",
        "city": "Rome",
        "state": "",
        "zip_code": "00184",
        "district": "Centro Storico"
    }
]

# Mock research projects
MOCK_RESEARCH_PROJECTS = [
    {
        "id": "mock-project-1",
        "name": "Market Analysis for Thai Delight",
        "description": "Comprehensive market analysis for Thai restaurant expansion",
        "restaurant_profile_id": "mock-restaurant-1",
        "owner_id": "mock-user-id",
        "status": "completed",
        "progress": 100,
        "created_at": (datetime.now() - timedelta(days=90)).isoformat(),
        "competitive_analysis": True,
        "market_sizing": True,
        "demographic_analysis": True,
        "location_intelligence": True
    },
    {
        "id": "mock-project-2",
        "name": "Location Analysis for Sushi Express",
        "description": "Finding the best location for a new Sushi restaurant",
        "restaurant_profile_id": "mock-restaurant-2",
        "owner_id": "mock-user-id",
        "status": "in_progress",
        "progress": 65,
        "created_at": (datetime.now() - timedelta(days=30)).isoformat(),
        "competitive_analysis": True,
        "market_sizing": False,
        "demographic_analysis": True,
        "location_intelligence": True
    }
]

# Mock reports
MOCK_REPORTS = [
    {
        "id": "mock-report-1",
        "name": "Thai Delight Market Analysis Report",
        "type": "market_analysis",
        "format": "pdf",
        "research_project_id": "mock-project-1",
        "owner_id": "mock-user-id",
        "status": "completed",
        "created_at": (datetime.now() - timedelta(days=85)).isoformat(),
        "download_url": "https://example.com/reports/mock-report-1.pdf"
    },
    {
        "id": "mock-report-2",
        "name": "Sushi Express Location Analysis",
        "type": "location_analysis",
        "format": "pdf",
        "research_project_id": "mock-project-2",
        "owner_id": "mock-user-id",
        "status": "in_progress",
        "created_at": (datetime.now() - timedelta(days=25)).isoformat(),
        "download_url": None
    }
]

@router.get("/restaurant-profiles")
async def get_mock_restaurant_profiles():
    """
    Get mock restaurant profiles for testing
    """
    return MOCK_RESTAURANT_PROFILES

@router.get("/research-projects")
async def get_mock_research_projects():
    """
    Get mock research projects for testing
    """
    return MOCK_RESEARCH_PROJECTS

@router.get("/reports")
async def get_mock_reports():
    """
    Get mock reports for testing
    """
    return MOCK_REPORTS
