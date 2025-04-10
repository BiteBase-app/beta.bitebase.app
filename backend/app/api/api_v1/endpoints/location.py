from typing import Any, Dict, List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.services.location_intelligence import (
    get_location_data,
    get_nearby_competitors,
    get_foot_traffic,
    get_demographic_data
)

router = APIRouter()


@router.get("/analyze", response_model=Dict[str, Any])
def analyze_location(
    latitude: float = Query(..., description="Latitude of the location"),
    longitude: float = Query(..., description="Longitude of the location"),
    radius: float = Query(1.0, description="Radius in kilometers"),
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Analyze a location based on coordinates.
    """
    try:
        location_data = get_location_data(latitude, longitude, radius)
        return location_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing location: {str(e)}")


@router.get("/competitors", response_model=Dict[str, Any])
def get_competitors(
    latitude: float = Query(..., description="Latitude of the location"),
    longitude: float = Query(..., description="Longitude of the location"),
    radius: float = Query(1.0, description="Radius in kilometers"),
    cuisine_type: str = Query(None, description="Type of cuisine to filter competitors"),
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get nearby competitors for a location.
    """
    try:
        competitors = get_nearby_competitors(latitude, longitude, radius, cuisine_type)
        return competitors
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting competitors: {str(e)}")


@router.get("/foot-traffic", response_model=Dict[str, Any])
def analyze_foot_traffic(
    latitude: float = Query(..., description="Latitude of the location"),
    longitude: float = Query(..., description="Longitude of the location"),
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Analyze foot traffic for a location.
    """
    # Check subscription tier for this premium feature
    if current_user.subscription_tier == "free":
        raise HTTPException(
            status_code=403,
            detail="Foot traffic analysis requires a Pro or Enterprise subscription"
        )
    
    try:
        traffic_data = get_foot_traffic(latitude, longitude)
        return traffic_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing foot traffic: {str(e)}")


@router.get("/demographics", response_model=Dict[str, Any])
def get_demographics(
    latitude: float = Query(..., description="Latitude of the location"),
    longitude: float = Query(..., description="Longitude of the location"),
    radius: float = Query(1.0, description="Radius in kilometers"),
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get demographic data for a location.
    """
    try:
        demographic_data = get_demographic_data(latitude, longitude, radius)
        return demographic_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting demographic data: {str(e)}")
