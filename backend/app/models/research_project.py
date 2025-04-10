from sqlalchemy import Column, String, Integer, Float, ForeignKey, DateTime, JSON, Enum, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum

from app.db.base_class import Base


class ProjectStatus(str, enum.Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"


class ResearchProject(Base):
    id = Column(String, primary_key=True, index=True)
    owner_id = Column(String, ForeignKey("user.id"), nullable=False)
    restaurant_profile_id = Column(String, ForeignKey("restaurantprofile.id"), nullable=False)

    name = Column(String, index=True, nullable=False)
    description = Column(String, nullable=True)
    status = Column(Enum(ProjectStatus), default=ProjectStatus.PENDING)
    progress = Column(Integer, default=0)

    # Research Goals
    competitive_analysis = Column(Boolean, default=False)
    market_sizing = Column(Boolean, default=False)
    demographic_analysis = Column(Boolean, default=False)
    location_intelligence = Column(Boolean, default=False)
    tourist_analysis = Column(Boolean, default=False)
    local_competition = Column(Boolean, default=False)
    pricing_strategy = Column(Boolean, default=False)
    food_delivery_analysis = Column(Boolean, default=False)

    # Results
    results = Column(JSON, nullable=True)

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    completed_at = Column(DateTime(timezone=True), nullable=True)

    # Relationships
    owner = relationship("User", back_populates="research_projects")
    restaurant_profile = relationship("RestaurantProfile", back_populates="research_projects")
    reports = relationship("Report", back_populates="research_project", cascade="all, delete-orphan")
