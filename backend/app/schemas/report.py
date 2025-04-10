from typing import Optional, Dict, Any
from datetime import datetime
from pydantic import BaseModel

from app.models.report import ReportType, ReportFormat


# Shared properties
class ReportBase(BaseModel):
    name: Optional[str] = None
    type: Optional[ReportType] = None
    format: Optional[ReportFormat] = None
    research_project_id: Optional[str] = None


# Properties to receive via API on creation
class ReportCreate(ReportBase):
    name: str
    type: ReportType
    format: ReportFormat
    research_project_id: str


# Properties to receive via API on update
class ReportUpdate(ReportBase):
    pass


class ReportInDBBase(ReportBase):
    id: str
    owner_id: str
    data: Optional[Dict[str, Any]] = None
    file_path: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True


# Additional properties to return via API
class Report(ReportInDBBase):
    pass


# Additional properties stored in DB
class ReportInDB(ReportInDBBase):
    pass
