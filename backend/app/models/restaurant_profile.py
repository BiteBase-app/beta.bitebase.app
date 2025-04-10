from sqlalchemy import Boolean, Column, String, Float, ForeignKey, DateTime, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.base_class import Base


class RestaurantProfile(Base):
    id = Column(String, primary_key=True, index=True)
    owner_id = Column(String, ForeignKey("user.id"), nullable=False)
    
    # Basic Info
    restaurant_name = Column(String, index=True, nullable=False)
    concept_description = Column(String, nullable=True)
    cuisine_type = Column(String, nullable=True)
    target_audience = Column(String, nullable=True)
    price_range = Column(String, nullable=True)
    business_type = Column(String, nullable=False)  # new, existing
    is_local_brand = Column(Boolean, default=True)
    
    # Location
    street_address = Column(String, nullable=True)
    city = Column(String, nullable=True)
    state = Column(String, nullable=True)
    zip_code = Column(String, nullable=True)
    district = Column(String, nullable=True)
    building_name = Column(String, nullable=True)
    floor = Column(String, nullable=True)
    nearest_bts = Column(String, nullable=True)
    nearest_mrt = Column(String, nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    
    # Additional Data
    research_goals = Column(JSON, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    owner = relationship("User", back_populates="restaurant_profiles")
    research_projects = relationship("ResearchProject", back_populates="restaurant_profile", cascade="all, delete-orphan")
