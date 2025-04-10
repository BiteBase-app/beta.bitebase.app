from typing import List, Optional
import uuid

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.restaurant_profile import RestaurantProfile
from app.schemas.restaurant_profile import RestaurantProfileCreate, RestaurantProfileUpdate


class CRUDRestaurantProfile(CRUDBase[RestaurantProfile, RestaurantProfileCreate, RestaurantProfileUpdate]):
    def create_with_owner(
        self, db: Session, *, obj_in: RestaurantProfileCreate, owner_id: str
    ) -> RestaurantProfile:
        profile_id = str(uuid.uuid4())
        db_obj = RestaurantProfile(
            id=profile_id,
            owner_id=owner_id,
            **obj_in.dict(),
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_multi_by_owner(
        self, db: Session, *, owner_id: str, skip: int = 0, limit: int = 100
    ) -> List[RestaurantProfile]:
        return (
            db.query(self.model)
            .filter(RestaurantProfile.owner_id == owner_id)
            .offset(skip)
            .limit(limit)
            .all()
        )
    
    def get_by_name_and_owner(
        self, db: Session, *, name: str, owner_id: str
    ) -> Optional[RestaurantProfile]:
        return (
            db.query(self.model)
            .filter(RestaurantProfile.restaurant_name == name, RestaurantProfile.owner_id == owner_id)
            .first()
        )


restaurant_profile = CRUDRestaurantProfile(RestaurantProfile)
