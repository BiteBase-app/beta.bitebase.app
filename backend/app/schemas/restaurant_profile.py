from typing import Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field


# Shared properties
class RestaurantProfileBase(BaseModel):
    restaurant_name: Optional[str] = None
    concept_description: Optional[str] = None
    cuisine_type: Optional[str] = None
    target_audience: Optional[str] = None
    price_range: Optional[str] = None
    business_type: Optional[str] = None
    is_local_brand: Optional[bool] = True
    
    # Location
    street_address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None
    district: Optional[str] = None
    building_name: Optional[str] = None
    floor: Optional[str] = None
    nearest_bts: Optional[str] = None
    nearest_mrt: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    
    # Research goals
    research_goals: Optional[List[str]] = None


# Properties to receive via API on creation
class RestaurantProfileCreate(RestaurantProfileBase):
    restaurant_name: str
    business_type: str


# Properties to receive via API on update
class RestaurantProfileUpdate(RestaurantProfileBase):
    pass


class RestaurantProfileInDBBase(RestaurantProfileBase):
    id: str
    owner_id: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True


# Additional properties to return via API
class RestaurantProfile(RestaurantProfileInDBBase):
    pass


# Additional properties stored in DB
class RestaurantProfileInDB(RestaurantProfileInDBBase):
    pass
