from typing import List, Optional
import uuid
from datetime import datetime

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.integration import Integration, IntegrationStatus, IntegrationType
from app.schemas.integration import IntegrationCreate, IntegrationUpdate


class CRUDIntegration(CRUDBase[Integration, IntegrationCreate, IntegrationUpdate]):
    def create_with_owner(
        self, db: Session, *, obj_in: IntegrationCreate, owner_id: str
    ) -> Integration:
        integration_id = str(uuid.uuid4())
        db_obj = Integration(
            id=integration_id,
            owner_id=owner_id,
            status=IntegrationStatus.DISCONNECTED,
            **obj_in.dict(),
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_multi_by_owner(
        self, db: Session, *, owner_id: str, skip: int = 0, limit: int = 100
    ) -> List[Integration]:
        return (
            db.query(self.model)
            .filter(Integration.owner_id == owner_id)
            .offset(skip)
            .limit(limit)
            .all()
        )
    
    def get_by_type_and_owner(
        self, db: Session, *, type: IntegrationType, owner_id: str
    ) -> List[Integration]:
        return (
            db.query(self.model)
            .filter(Integration.type == type, Integration.owner_id == owner_id)
            .all()
        )
    
    def update_status(
        self, db: Session, *, db_obj: Integration, status: IntegrationStatus
    ) -> Integration:
        update_data = {"status": status}
        
        if status == IntegrationStatus.CONNECTED:
            update_data["last_sync_at"] = datetime.utcnow()
        
        return super().update(db, db_obj=db_obj, obj_in=update_data)


integration = CRUDIntegration(Integration)
