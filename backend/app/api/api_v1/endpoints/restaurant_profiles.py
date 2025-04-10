from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException, Body, Header, Request
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.services.geocoding import geocode_address
from app.api.api_v1.endpoints.mock_data import MOCK_RESTAURANT_PROFILES

router = APIRouter()


@router.get("/", response_model=List[schemas.RestaurantProfile])
def read_restaurant_profiles(
    request: Request,
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_user_or_mock),
    x_mock_data: str = Header(None)
) -> Any:
    """
    Retrieve restaurant profiles.
    """
    # Use mock data if header is present or if we're using a mock user
    if x_mock_data == "true" or current_user.id == "mock-user-id":
        return MOCK_RESTAURANT_PROFILES

    # Otherwise use real data
    restaurant_profiles = crud.restaurant_profile.get_multi_by_owner(
        db=db, owner_id=current_user.id, skip=skip, limit=limit
    )
    return restaurant_profiles


@router.post("/", response_model=schemas.RestaurantProfile)
def create_restaurant_profile(
    *,
    db: Session = Depends(deps.get_db),
    restaurant_profile_in: schemas.RestaurantProfileCreate,
    current_user: models.User = Depends(deps.get_current_active_user_or_mock),
    x_mock_data: str = Header(None)
) -> Any:
    """
    Create new restaurant profile.
    """
    # Use mock data if header is present or if we're using a mock user
    if x_mock_data == "true" or current_user.id == "mock-user-id":
        # Create a new mock profile
        import uuid
        from datetime import datetime

        new_profile = {
            "id": str(uuid.uuid4()),
            "restaurant_name": restaurant_profile_in.restaurant_name,
            "concept_description": restaurant_profile_in.concept_description,
            "cuisine_type": restaurant_profile_in.cuisine_type,
            "business_type": restaurant_profile_in.business_type,
            "owner_id": current_user.id,
            "created_at": datetime.now().isoformat(),
            "is_local_brand": restaurant_profile_in.is_local_brand,
            "target_audience": restaurant_profile_in.target_audience,
            "price_range": restaurant_profile_in.price_range,
            "street_address": restaurant_profile_in.street_address,
            "city": restaurant_profile_in.city,
            "state": restaurant_profile_in.state,
            "zip_code": restaurant_profile_in.zip_code,
            "district": restaurant_profile_in.district
        }

        # Add to mock profiles
        MOCK_RESTAURANT_PROFILES.append(new_profile)
        return new_profile

    # Otherwise use real data
    # Check if a profile with the same name already exists
    existing_profile = crud.restaurant_profile.get_by_name_and_owner(
        db=db, name=restaurant_profile_in.restaurant_name, owner_id=current_user.id
    )
    if existing_profile:
        raise HTTPException(
            status_code=400,
            detail="A restaurant profile with this name already exists",
        )

    # If address is provided, try to geocode it
    if restaurant_profile_in.street_address and restaurant_profile_in.city:
        try:
            lat, lng = geocode_address(
                street=restaurant_profile_in.street_address,
                city=restaurant_profile_in.city,
                state=restaurant_profile_in.state,
                zip_code=restaurant_profile_in.zip_code,
            )
            restaurant_profile_in.latitude = lat
            restaurant_profile_in.longitude = lng
        except Exception as e:
            # Log the error but continue without geocoding
            print(f"Geocoding error: {str(e)}")

    restaurant_profile = crud.restaurant_profile.create_with_owner(
        db=db, obj_in=restaurant_profile_in, owner_id=current_user.id
    )
    return restaurant_profile


@router.get("/{id}", response_model=schemas.RestaurantProfile)
def read_restaurant_profile(
    *,
    db: Session = Depends(deps.get_db),
    id: str,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get restaurant profile by ID.
    """
    restaurant_profile = crud.restaurant_profile.get(db=db, id=id)
    if not restaurant_profile:
        raise HTTPException(status_code=404, detail="Restaurant profile not found")
    if restaurant_profile.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return restaurant_profile


@router.put("/{id}", response_model=schemas.RestaurantProfile)
def update_restaurant_profile(
    *,
    db: Session = Depends(deps.get_db),
    id: str,
    restaurant_profile_in: schemas.RestaurantProfileUpdate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update a restaurant profile.
    """
    restaurant_profile = crud.restaurant_profile.get(db=db, id=id)
    if not restaurant_profile:
        raise HTTPException(status_code=404, detail="Restaurant profile not found")
    if restaurant_profile.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    # If address is updated, try to geocode it
    if (restaurant_profile_in.street_address and restaurant_profile_in.city and
        (restaurant_profile_in.street_address != restaurant_profile.street_address or
         restaurant_profile_in.city != restaurant_profile.city)):
        try:
            lat, lng = geocode_address(
                street=restaurant_profile_in.street_address,
                city=restaurant_profile_in.city,
                state=restaurant_profile_in.state,
                zip_code=restaurant_profile_in.zip_code,
            )
            restaurant_profile_in.latitude = lat
            restaurant_profile_in.longitude = lng
        except Exception as e:
            # Log the error but continue without geocoding
            print(f"Geocoding error: {str(e)}")

    restaurant_profile = crud.restaurant_profile.update(
        db=db, db_obj=restaurant_profile, obj_in=restaurant_profile_in
    )
    return restaurant_profile


@router.delete("/{id}", response_model=schemas.RestaurantProfile)
def delete_restaurant_profile(
    *,
    db: Session = Depends(deps.get_db),
    id: str,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Delete a restaurant profile.
    """
    restaurant_profile = crud.restaurant_profile.get(db=db, id=id)
    if not restaurant_profile:
        raise HTTPException(status_code=404, detail="Restaurant profile not found")
    if restaurant_profile.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    restaurant_profile = crud.restaurant_profile.remove(db=db, id=id)
    return restaurant_profile
