from sqlalchemy import Boolean, Column, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.base_class import Base


class User(Base):
    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, index=True)
    hashed_password = Column(String, nullable=False)
    avatar_url = Column(String, nullable=True)
    subscription_tier = Column(String, default="free")  # free, pro, enterprise
    is_active = Column(Boolean(), default=True)
    is_superuser = Column(Boolean(), default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    restaurant_profiles = relationship("RestaurantProfile", back_populates="owner", cascade="all, delete-orphan")
    research_projects = relationship("ResearchProject", back_populates="owner", cascade="all, delete-orphan")
    integrations = relationship("Integration", back_populates="owner", cascade="all, delete-orphan")
    reports = relationship("Report", back_populates="owner", cascade="all, delete-orphan")
