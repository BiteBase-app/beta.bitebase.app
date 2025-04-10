from typing import Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field

from app.models.research_project import ProjectStatus


# Shared properties
class ResearchProjectBase(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    restaurant_profile_id: Optional[str] = None
    
    # Research Goals
    competitive_analysis: Optional[bool] = False
    market_sizing: Optional[bool] = False
    demographic_analysis: Optional[bool] = False
    location_intelligence: Optional[bool] = False
    tourist_analysis: Optional[bool] = False
    local_competition: Optional[bool] = False
    pricing_strategy: Optional[bool] = False
    food_delivery_analysis: Optional[bool] = False


# Properties to receive via API on creation
class ResearchProjectCreate(ResearchProjectBase):
    name: str
    restaurant_profile_id: str


# Properties to receive via API on update
class ResearchProjectUpdate(ResearchProjectBase):
    pass


class ResearchProjectInDBBase(ResearchProjectBase):
    id: str
    owner_id: str
    status: ProjectStatus
    progress: int
    results: Optional[Dict[str, Any]] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None

    class Config:
        orm_mode = True


# Additional properties to return via API
class ResearchProject(ResearchProjectInDBBase):
    pass


# Additional properties stored in DB
class ResearchProjectInDB(ResearchProjectInDBBase):
    pass
