from sqlalchemy import Column, String, ForeignKey, DateTime, JSON, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum

from app.db.base_class import Base


class IntegrationType(str, enum.Enum):
    YELP = "yelp"
    GOOGLE_PLACES = "google_places"
    CENSUS = "census"
    CUSTOM = "custom"


class IntegrationStatus(str, enum.Enum):
    CONNECTED = "connected"
    DISCONNECTED = "disconnected"
    ERROR = "error"


class Integration(Base):
    id = Column(String, primary_key=True, index=True)
    owner_id = Column(String, ForeignKey("user.id"), nullable=False)
    
    name = Column(String, nullable=False)
    type = Column(Enum(IntegrationType), nullable=False)
    status = Column(Enum(IntegrationStatus), default=IntegrationStatus.DISCONNECTED)
    
    # Configuration
    config = Column(JSON, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    last_sync_at = Column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    owner = relationship("User", back_populates="integrations")
