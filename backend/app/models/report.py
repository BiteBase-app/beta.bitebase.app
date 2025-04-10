from sqlalchemy import Column, String, ForeignKey, DateTime, JSON, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum

from app.db.base_class import Base


class ReportType(str, enum.Enum):
    MARKET_ANALYSIS = "market_analysis"
    COMPETITIVE_ANALYSIS = "competitive_analysis"
    LOCATION_INTELLIGENCE = "location_intelligence"
    DEMOGRAPHIC_ANALYSIS = "demographic_analysis"
    CUSTOM = "custom"


class ReportFormat(str, enum.Enum):
    PDF = "pdf"
    EXCEL = "excel"
    CSV = "csv"
    JSON = "json"


class Report(Base):
    id = Column(String, primary_key=True, index=True)
    owner_id = Column(String, ForeignKey("user.id"), nullable=False)
    research_project_id = Column(String, ForeignKey("researchproject.id"), nullable=False)
    
    name = Column(String, nullable=False)
    type = Column(Enum(ReportType), nullable=False)
    format = Column(Enum(ReportFormat), nullable=False)
    
    # Report data
    data = Column(JSON, nullable=True)
    file_path = Column(String, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    owner = relationship("User", back_populates="reports")
    research_project = relationship("ResearchProject", back_populates="reports")
