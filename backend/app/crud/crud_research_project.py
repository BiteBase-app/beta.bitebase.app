from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.research_project import ResearchProject, ProjectStatus
from app.schemas.research_project import ResearchProjectCreate, ResearchProjectUpdate


class CRUDResearchProject(CRUDBase[ResearchProject, ResearchProjectCreate, ResearchProjectUpdate]):
    def create_with_owner(
        self, db: Session, *, obj_in: ResearchProjectCreate, owner_id: str
    ) -> ResearchProject:
        project_id = str(uuid.uuid4())
        db_obj = ResearchProject(
            id=project_id,
            owner_id=owner_id,
            status=ProjectStatus.PENDING,
            progress=0,
            **obj_in.dict(),
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_multi_by_owner(
        self, db: Session, *, owner_id: str, skip: int = 0, limit: int = 100
    ) -> List[ResearchProject]:
        return (
            db.query(self.model)
            .filter(ResearchProject.owner_id == owner_id)
            .offset(skip)
            .limit(limit)
            .all()
        )
    
    def get_by_restaurant_profile(
        self, db: Session, *, restaurant_profile_id: str, skip: int = 0, limit: int = 100
    ) -> List[ResearchProject]:
        return (
            db.query(self.model)
            .filter(ResearchProject.restaurant_profile_id == restaurant_profile_id)
            .offset(skip)
            .limit(limit)
            .all()
        )
    
    def update_status(
        self, db: Session, *, db_obj: ResearchProject, status: ProjectStatus, progress: int = None
    ) -> ResearchProject:
        update_data = {"status": status}
        if progress is not None:
            update_data["progress"] = progress
        
        if status == ProjectStatus.COMPLETED:
            update_data["completed_at"] = datetime.utcnow()
            update_data["progress"] = 100
        
        return super().update(db, db_obj=db_obj, obj_in=update_data)
    
    def update_results(
        self, db: Session, *, db_obj: ResearchProject, results: Dict[str, Any]
    ) -> ResearchProject:
        return super().update(db, db_obj=db_obj, obj_in={"results": results})


research_project = CRUDResearchProject(ResearchProject)
