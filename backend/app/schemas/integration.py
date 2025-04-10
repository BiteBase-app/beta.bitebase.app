from typing import Optional, Dict, Any
from datetime import datetime
from pydantic import BaseModel

from app.models.integration import IntegrationType, IntegrationStatus


# Shared properties
class IntegrationBase(BaseModel):
    name: Optional[str] = None
    type: Optional[IntegrationType] = None
    config: Optional[Dict[str, Any]] = None


# Properties to receive via API on creation
class IntegrationCreate(IntegrationBase):
    name: str
    type: IntegrationType
    config: Dict[str, Any]


# Properties to receive via API on update
class IntegrationUpdate(IntegrationBase):
    pass


class IntegrationInDBBase(IntegrationBase):
    id: str
    owner_id: str
    status: IntegrationStatus
    created_at: datetime
    updated_at: Optional[datetime] = None
    last_sync_at: Optional[datetime] = None

    class Config:
        orm_mode = True


# Additional properties to return via API
class Integration(IntegrationInDBBase):
    pass


# Additional properties stored in DB
class IntegrationInDB(IntegrationInDBBase):
    pass
