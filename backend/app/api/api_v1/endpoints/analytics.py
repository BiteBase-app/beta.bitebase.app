from typing import Any, Dict, List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.services.analytics import (
    get_market_trends,
    get_competitor_analysis,
    get_performance_forecast,
    get_customer_demographics
)

router = APIRouter()


@router.get("/market-trends", response_model=Dict[str, Any])
def read_market_trends(
    cuisine_type: str = Query(None, description="Type of cuisine to filter trends"),
    location: str = Query(None, description="Location to filter trends"),
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get market trends for restaurants.
    """
    try:
        trends = get_market_trends(cuisine_type, location)
        return trends
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting market trends: {str(e)}")


@router.get("/competitor-analysis/{restaurant_profile_id}", response_model=Dict[str, Any])
def read_competitor_analysis(
    restaurant_profile_id: str,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get competitor analysis for a restaurant profile.
    """
    # Check if the restaurant profile exists and belongs to the user
    restaurant_profile = crud.restaurant_profile.get(db=db, id=restaurant_profile_id)
    if not restaurant_profile:
        raise HTTPException(status_code=404, detail="Restaurant profile not found")
    if restaurant_profile.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    try:
        analysis = get_competitor_analysis(restaurant_profile)
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting competitor analysis: {str(e)}")


@router.get("/performance-forecast/{restaurant_profile_id}", response_model=Dict[str, Any])
def read_performance_forecast(
    restaurant_profile_id: str,
    months: int = Query(12, description="Number of months to forecast"),
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get performance forecast for a restaurant profile.
    """
    # Check subscription tier for this premium feature
    if current_user.subscription_tier == "free" and months > 6:
        raise HTTPException(
            status_code=403,
            detail="Free tier is limited to 6-month forecasts. Upgrade to Pro for 12+ months."
        )
    
    # Check if the restaurant profile exists and belongs to the user
    restaurant_profile = crud.restaurant_profile.get(db=db, id=restaurant_profile_id)
    if not restaurant_profile:
        raise HTTPException(status_code=404, detail="Restaurant profile not found")
    if restaurant_profile.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    try:
        forecast = get_performance_forecast(restaurant_profile, months)
        return forecast
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting performance forecast: {str(e)}")


@router.get("/customer-demographics/{restaurant_profile_id}", response_model=Dict[str, Any])
def read_customer_demographics(
    restaurant_profile_id: str,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get customer demographics for a restaurant profile.
    """
    # Check if the restaurant profile exists and belongs to the user
    restaurant_profile = crud.restaurant_profile.get(db=db, id=restaurant_profile_id)
    if not restaurant_profile:
        raise HTTPException(status_code=404, detail="Restaurant profile not found")
    if restaurant_profile.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    try:
        demographics = get_customer_demographics(restaurant_profile)
        return demographics
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting customer demographics: {str(e)}")
